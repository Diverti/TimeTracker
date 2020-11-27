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
}); */

// Authentication
Route::get( '/login',     'AuthController@index')->name('login');
Route::post('/register', 'AuthController@register');
Route::post('/login',    'AuthController@login');

Route::middleware('auth:api')->group(function() {
    //User
    Route::get( 'profile',  'AuthController@get_user');
    Route::post('logout',   'AuthController@logout');

    //Companies
    Route::get(     'companies',        'CompaniesController@index');
    Route::post(    'companies',        'CompaniesController@store');
    Route::get(     'companies/{id}',   'CompaniesController@show');
    Route::delete(  'companies/{id}',   'CompaniesController@destroy');
    Route::put(     'companies/{id}',   'CompaniesController@update');
    Route::patch(   'companies/{id}',   'CompaniesController@update');

    //Groups
    Route::post(    'groups',       'GroupsController@store');
    Route::post(    'groups/{id}/join',  'GroupsController@join');
    Route::get(     'groups',       'GroupsController@index');
    Route::patch(   'groups/{id}',  'GroupsController@update');
    Route::get(     'groups/{id}',  'GroupsController@show');
    Route::put(     'groups/{id}',  'GroupsController@update');
    Route::delete(  'groups/{id}',  'GroupsController@destroy');

    //Projects
    Route::post(    'projects/{id}/take',   'ProjectsController@takeProject');
    Route::get(     'projects/group/{id}',  'ProjectsController@forGroup');
    Route::get(     'projects',             'ProjectsController@index');
    Route::post(    'projects',             'ProjectsController@store');
    Route::get(     'projects/{id}',        'ProjectsController@show');
    Route::put(     'projects/{id}',        'ProjectsController@update');
    Route::patch(   'projects/{id}',        'ProjectsController@update');
    Route::delete(  'projects/{id}',        'ProjectsController@destroy');

    //Tasks
    Route::get(     'projects/{id}/tasks',    'TasksController@index');
    Route::post(    'projects/{id}/tasks',    'TasksController@store');
    Route::get(     'tasks/{id}',             'TasksController@show');
    Route::put(     'tasks/{id}',             'TasksController@update');
    Route::patch(   'tasks/{id}',             'TasksController@update');
    Route::post(    'tasks/{id}/done',        'TasksController@done');
    Route::delete(  'tasks/{id}',             'TasksController@destroy');
});