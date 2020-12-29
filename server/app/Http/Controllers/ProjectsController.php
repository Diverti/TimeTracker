<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use App\Group;
use App\User;
use Carbon\Carbon;
use DateTime;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getProjects() {
        return Project::all();
    }

    public function getGroupProjects($group_id){
        return Project::where('group_id', $group_id)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addProject(Request $request)
    {
        $project = new Project;
        $project->name = $request->name;
        $project->due_date = Carbon::parse($request->due_date);
        $project->group_id = NULL;
        $project->is_done = 0;
        $project->company_id = $request->company_id;
        $project->save();

        return $project;
    }

    public function takeProject(Request $request, $project_id){
        $project = Project::find($project_id);
        $project->group_id = $request->group_id;
        $project->save();
        return response('Project taken.', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getProject($id)
    {
        try{
            return Project::where('id',$id)->firstOrFail();
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No project with such id.', 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateProject(Request $request, $id)
    {
        $user = User::find(auth()->user()->id);
        try{
            $project = Project::where('id',$id)->firstOrFail();
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No project with such id.',404);
        }
        

        foreach($user->groups()->get() as $group){
            if($group->id == $project->group_id){
                if($request->name)
                    $project->name = $request->name;
                if($request->due_date)
                    $project->due_date = Carbon::parse($request->due_date);
                if($request->group_id)
                    $project->group_id = $request->group_id;
                if($request->company_id)
                    $project->company_id = $request->company_id;
                $project->save();
                return response($project,200);
            }
        }
        return response('',401);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function deleteProject(Request $request, $id)
    {
        $user = User::find(auth()->user()->id);
        try{
            $project = Project::where('id',$id)->firstOrFail();
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No project with such id.', 404);
        }
        

        foreach($user->groups()->get() as $group){
            if($group->id == $project->group_id){
                $project->delete();
                return response('Project deleted.',200);
            }
        }
        return response('',401);

    }

    public function done($id){
        $tasks = Project::find($id)->tasks()->get();
        $is_done = 1;

        foreach($tasks as $task){
            if(!$task->is_done){
                $is_done = 0;
            }
        }
        
        $project = Project::find($id);
        $project->is_done = $is_done;
        $project->save();
    }
}
