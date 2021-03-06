<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'created_by', //created_by egy id
    ];

    public function users() {
        return $this->belongsToMany('App\User', 'user_group'); 
    }

    public function projects() {
        return $this->hasMany('App\Project');
    }
}
