<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Company;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCompanies()
    {
        return Company::with('user')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addCompany(Request $request)
    {
        $company = new Company;
        $company->name = $request->name;
        $company->created_by = auth()->user()->id;
        $company->save();
        return response($company,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getCompany($id)
    {
        try{
            return Company::with('user'/*, 'user.groups'*/)->where('id',$id)->firstOrFail();
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No company with such id.',404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateCompany(Request $request, $id)
    {
        try{
            $company = Company::where('id',$id)->firstOrFail();
            $company->name = $request->name;
            $company->save();
            return response($company,200);
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No company with such id.',404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function deleteCompany($id)
    {
        try{
            $company = Company::where('id',$id)->firstOrFail();
            $company->delete();
            return response('Company deleted.', 200);
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No company with such id.', 404);
        }
    }
}
