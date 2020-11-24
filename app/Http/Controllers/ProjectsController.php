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
    public function index() {
        return response()->json(['status' => 'OK', 'projects' => Project::all()], 200);
    }

    public function forGroup($group_id){
        return response()->json(['status' => 'OK', 'project' => Project::where('group_id', $group_id)->get()], 200);
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
        $project = new Project;
        $project->name = $request->name;
        $project->due_date = Carbon::parse($request->due_date);
        $project->group_id = NULL;
        $project->is_done = 0;
        $project->company_id = $request->company_id;
        $project->save();

        return response($project, 200);
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
    public function show($id)
    {
        try{
            return Project::where('id',$id)->firstOrFail();
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No project with such id.', 404);
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
        $user = User::find($request->user_id);
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
    public function destroy(Request $request, $id)
    {
        $user = User::find($request->user_id);
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
