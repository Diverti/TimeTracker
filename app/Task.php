<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'is_done', 'due_date',
    ];

    //kapcsolótábla
    //return $this->belongsToMany('App\User', 'subject_user'); 

    //1 to N
    //return $this->hasMany('App\Task');

    //N to 1
    //return $this->belongsTo(User::class);
    
}
