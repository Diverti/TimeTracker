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
    public function getGroups()
    {
        return Group::with('projects','projects.tasks','projects.company')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addGroup(Request $request)
    {
        $group = new Group;
        $group->name = $request->name;
        $group->created_by = auth()->user()->id;
        $group->save();

        $group->users()->sync(auth()->user()->id);

        return response($group,201);
    }

    public function joinGroup(Request $request, $id){
        $group = Group::where('id',$id)->firstOrFail();
        $group->users()->sync(auth()->user()->id);
        return response('Joined.',200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getGroup($id)
    {
        try{
            return Group::where('id',$id)->firstOrFail();
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No group with such id.',404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateGroup(Request $request, $id)
    {
        try{
            $group = Group::where('id',$id)->firstOrFail();
            if(auth()->user()->id == $group->created_by){
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
    public function deleteGroup(Request $request, $id)
    {
        try{
            $group = Group::where('id',$id)->firstOrFail();
            if(auth()->user()->id == $group->created_by){
                $group->delete();
                return response('',200);
            } else{
                return response('Unauthorized access.', 401);
            }
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No group with such id.', 404);
        }
    }
}
