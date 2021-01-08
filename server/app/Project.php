<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'due_date', 'is_done', 'group_id', 'company_id', 'description' //group_id, company_id
    ];

    public function company() {
        return $this->belongsTo('App\Company');
    }

    public function group() {
        return $this->hasOne('App\Group');
    }

    public function tasks() {
        return $this->hasMany('App\Task');
    }

    public function delete() {
        $this->tasks()->delete();
        return parent::delete();
    }
}
