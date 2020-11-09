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

Route::resource('companies','CompaniesController');
Route::resource('groups','GroupsController');
Route::resource('projects','ProjectsController');

Route::post('projects/take/{id}','ProjectsController@takeProject');
Route::get('projects/group/{id}','ProjectsController@forGroup');

Route::post('groups/join','GroupsController@join');


Route::post('tasks/{id}','TasksController@store');
Route::get('tasks/create/{id}','TasksController@create');
Route::get('tasks/{id}','TasksController@index');