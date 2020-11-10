<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Companies
Route::resource('companies','CompaniesController');

//Groups
Route::resource('groups','GroupsController');
Route::post('groups/join','GroupsController@join');

//Projects
Route::resource('projects','ProjectsController');
Route::post('projects/{id}/take','ProjectsController@takeProject');
Route::get('projects/group/{id}','ProjectsController@forGroup');

//Tasks
//Route::resource('tasks','TasksController');
Route::get('projects/{id}/tasks','TasksController@index');
Route::post('projects/{id}/tasks','TasksController@store');
Route::get('tasks/{id}','TasksController@show');
Route::put('tasks/{id}','TasksController@update');
Route::patch('tasks/{id}','TasksController@update');
Route::post('tasks/{id}/done','TasksController@done');
Route::delete('tasks/{id}','TasksController@destroy');