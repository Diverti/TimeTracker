<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Lcobucci\JWT\Parser;

const token = 'SecretToken';

class AuthController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(['status' => 'OK', 'message' => 'You need to be logged in.'], 200);
    }

    /**
     * User registration
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'permission' => '1',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'error' => $validator->errors()], 422);
        }

        $user = $request->all();
        $user['password'] = Hash::make($user['password']);
        $user = User::create($user);

        $token = $user->createToken(token)->accessToken;
        return response()->json(['status' => 'OK', 'token' => $token], 201);
    }


    /**
     * User login
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            $token = Auth::user()->createToken(token)->accessToken;
            return response()->json(['status' => 'OK', 'token' => $token, 'user' => auth()->user()], 200);
        } else {
            return response()->json(['status' => 'error', 'error' => 'Unauthorised'], 401);
        }
    }


    /**
     * Logout
     */
    public function logout(Request $request)
    {
        $tokenRepository = app('Laravel\Passport\TokenRepository');
        $tokenId = (new Parser())->parse($request->bearerToken())->getClaims()['jti']->getValue();
        $tokenRepository->revokeAccessToken($tokenId);
        return response()->json(['status' => 'OK']);
    }


    /**
     * Get authenticated user
     */
    public function getCurrentUser()
    {
        return response()->json(['status' => 'OK', 'user' => Auth::user()], 200);
    }
}
