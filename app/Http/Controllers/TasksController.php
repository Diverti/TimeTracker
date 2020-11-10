<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use App\Task;
use Carbon\Carbon;
use DateTime;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($project_id)
    {
        return Project::find($project_id)->tasks()->get();
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
    public function store(Request $request, $project_id)
    {
        $task = new Task;
        $task->name = $request->name;
        $task->due_date = Carbon::parse($request->due_date);
        $task->project_id = $project_id;
        $task->is_done = 0;
        $task->save();
        return response($task, 201);
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
            return Task::where('id',$id)->firstOrFail();
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No task with such id.',404);
        }
    }

    public function done($id){
        try{
            $task = Task::where('id',$id)->firstOrFail();
            $task->is_done = 1;
            $task->save();
            app(ProjectsController::class)->done($task->project_id);
            return response('Task done.', 200);
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No task with such id.',404);
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
    public function update(Request $request, $id) // kéne valaki aki létrehozta a projectet és csak az tudja updatelni
    {
        try{
            $task = Task::where('id',$id)->firstOrFail();
            if($task->name)
                $task->name = $request->name;
            if($task->project_id)
                $task->project_id = $request->project_id;
            if($task->due_date)
                $task->due_date = Carbon::parse($request->due_date);
            $task->save();
            return response($task, 200);
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No task with such id.',404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            Task::where('id',$id)->firstOrFail()->delete();
            return response('Task deleted.', 200);
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No task with such id.',404);
        }
    }
}
