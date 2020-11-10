<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskTimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_times', function (Blueprint $table) {
            $table->id();
            $table->dateTime('start', 0);
            $table->dateTime('end', 0);
            $table->foreignId('task_id');
            $table->foreignId('created_by'); //userid
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_times');
    }
}
