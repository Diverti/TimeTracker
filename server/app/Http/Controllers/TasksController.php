<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use App\Task;
use App\User;
use Carbon\Carbon;
use DateTime;

class TasksController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getTasks()
    {
        $tasks = Task::all();
        foreach($tasks as $task){
            $task->due_date = date_create($task->due_date);
            $task->due_date = date_format($task->due_date, 'Y-m-d\TH:i');
        }
        return $tasks;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getTasksOfProject($project_id)
    {
        $tasks = Project::find($project_id)->tasks()->get();
        foreach($tasks as $task){
            $task->due_date = date_create($task->due_date);
            $task->due_date = date_format($task->due_date, 'Y-m-d\TH:i');
        }
        return $tasks;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addTask(Request $request, $project_id)
    {
        $task = new Task;
        $task->name = $request->name;
        $task->description = $request->description;
        $task->due_date = Carbon::parse($request->due_date);
        $task->project_id = $project_id;
        $task->created_by = auth()->user()->id;
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
    public function getTask($id)
    {
        try{
            $task = Task::where('id',$id)->firstOrFail();
            $task->due_date = date_create($task->due_date);
            $task->due_date = date_format($task->due_date, 'Y-m-d\TH:i');
            return $task;
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateTask(Request $request, $id) // kéne valaki aki létrehozta a projectet és csak az tudja updatelni
    {
        try{
            $task = Task::where('id',$id)->firstOrFail();
            $task->name = $request->name;
            $task->due_date = Carbon::parse($request->due_date);
            $task->description = $request->description;
            
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
    public function deleteTask($id)
    {
        try{
            Task::where('id',$id)->firstOrFail()->delete();
            return response('Task deleted.', 200);
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response('No task with such id.',404);
        }
    }
}
