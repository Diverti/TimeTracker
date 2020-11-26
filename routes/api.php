<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

// Authentication
//Route::get('/', 'AuthController@index');
Route::get('/login',     'AuthController@index')->name('login');
Route::post('/register', 'AuthController@register')->name('register');
Route::post('/login',    'AuthController@login')->name('login');

Route::middleware('auth:api')->group(function() {
    //Companies
    Route::resource('companies', 'CompaniesController');

    //Groups
    Route::resource('groups', 'GroupsController');
    Route::post('groups/join', 'GroupsController@join');

    //Projects
    Route::resource('projects', 'ProjectsController');
    Route::post('projects/{id}/take', 'ProjectsController@takeProject');
    Route::get('projects/group/{id}', 'ProjectsController@forGroup');

    //Tasks
    //Route::resource('tasks','TasksController');
    Route::get(   'projects/{id}/tasks',    'TasksController@index');
    Route::post(  'projects/{id}/tasks',    'TasksController@store');
    Route::get(   'tasks/{id}',             'TasksController@show');
    Route::put(   'tasks/{id}',             'TasksController@update');
    Route::patch( 'tasks/{id}',             'TasksController@update');
    Route::post(  'tasks/{id}/done',        'TasksController@done');
    Route::delete('tasks/{id}',             'TasksController@destroy');
});