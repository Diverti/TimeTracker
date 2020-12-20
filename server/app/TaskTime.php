<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskTime extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'start', 'end', 'task_id',
    ];

    public function task() {
        return $this->belongsTo(Task::class);
    }
}
