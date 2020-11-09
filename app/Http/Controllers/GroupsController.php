<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Group;

class GroupsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Group::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $group = new Group;
        $group->name = $request->name;
        $group->created_by = $request->user_id;
        $group->save();

        $group->users()->sync($request->user_id);

        return response($group,201);
    }

    public function join(Request $request){
        $group = Group::where('id',$request->group_id)->firstOrFail();
        $group->users()->sync($request->user_id);
        return response('Joined.',200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            return Group::where('id',$id)->firstOrFail();
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No group with such id.',404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{
            $group = Group::where('id',$id)->firstOrFail();
            if($request->user_id == $group->created_by){
                $group->name = $request->name;
                if($request->created_by){
                    $group->created_by = $request->created_by;
                }
                $group->save();
                return response($group,200);
            } else{
                return response('Unauthorized access.', 401);
            }
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No group with such id.', 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        try{
            $group = Group::where('id',$id)->firstOrFail();
            if($request->user_id == $group->created_by){
                $group->delete();
                return response('Group deleted.',200);
            } else{
                return response('Unauthorized access.', 401);
            }
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No group with such id.', 404);
        }
    }
}
