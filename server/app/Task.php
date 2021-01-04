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
        'name', 'is_done', 'due_date', 'description'
    ];

    //kapcsolótábla, N to N
    //return $this->belongsToMany('App\User', 'subject_user'); 

    //1 to N
    //return $this->hasMany('App\Task');

    //1 to 1
    //return $this->hasOne('App\Task');

    //1 to 1 | 1 to N (reverse)
    //return $this->belongsTo(User::class);

    public function tasktimes() {
        return $this->hasMany('App\TaskTime');
    }

    public function project() {
        return $this->belongsTo('App\Project');
    }
    
}
