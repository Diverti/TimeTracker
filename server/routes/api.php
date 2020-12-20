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
    Route::get( 'profile',  'AuthController@getCurrentUser');
    Route::post('logout',   'AuthController@logout');

    //Companies
    Route::get(     'companies',        'CompaniesController@getCompanies');
    Route::post(    'companies',        'CompaniesController@addCompany');
    Route::get(     'companies/{id}',   'CompaniesController@getCompany');
    Route::delete(  'companies/{id}',   'CompaniesController@deleteCompany');
    Route::put(     'companies/{id}',   'CompaniesController@updateCompany');
    Route::patch(   'companies/{id}',   'CompaniesController@updateCompany');

    //Groups
    Route::post(    'groups',            'GroupsController@addGroup');
    Route::post(    'groups/{id}/join',  'GroupsController@joinGroup');
    Route::get(     'groups',            'GroupsController@getGroups');
    Route::patch(   'groups/{id}',       'GroupsController@updateGroup');
    Route::get(     'groups/{id}',       'GroupsController@getGroup');
    Route::put(     'groups/{id}',       'GroupsController@updateGroup');
    Route::delete(  'groups/{id}',       'GroupsController@deleteGroup');

    //Projects
    Route::post(    'projects/{id}/take',   'ProjectsController@takeProject');
    Route::get(     'projects/group/{id}',  'ProjectsController@getGroupProjects');
    Route::get(     'projects',             'ProjectsController@getProjects');
    Route::post(    'projects',             'ProjectsController@addProject');
    Route::get(     'projects/{id}',        'ProjectsController@getProject');
    Route::put(     'projects/{id}',        'ProjectsController@updateProject');
    Route::patch(   'projects/{id}',        'ProjectsController@updateProject');
    Route::delete(  'projects/{id}',        'ProjectsController@deleteProject');
    Route::post(    'projects/{id}/done',   'ProjectsController@done');

    //Tasks
    Route::get(     'projects/{id}/tasks',    'TasksController@getTasks');
    Route::post(    'projects/{id}/tasks',    'TasksController@addTask');
    Route::get(     'tasks/{id}',             'TasksController@getTask');
    Route::put(     'tasks/{id}',             'TasksController@updateTask');
    Route::patch(   'tasks/{id}',             'TasksController@updateTask');
    Route::post(    'tasks/{id}/done',        'TasksController@done');
    Route::delete(  'tasks/{id}',             'TasksController@deleteTask');
});