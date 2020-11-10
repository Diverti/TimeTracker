<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(['name' => 'Admin', 'email' => 'admin@titrack.hu', 'password' => Hash::make('123'), 'permission' => 10, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('users')->insert(['name' => 'Szer Elek', 'email' => 'elek@titrack.hu', 'password' => Hash::make('123'), 'permission' => 0, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('users')->insert(['name' => 'Ter Eget', 'email' => 'eget@titrack.hu', 'password' => Hash::make('123'), 'permission' => 0, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);

        DB::table('projects')->insert(['name' => 'Project1', 'due_date' => new DateTime('2021-01-01 00:00:00'), 'group_id' => 1, 'is_done' => false, 'company_id' => 1,'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('projects')->insert(['name' => 'Project2', 'due_date' => new DateTime('2021-01-01 00:00:00'), 'group_id' => 1, 'is_done' => false, 'company_id' => 2, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('projects')->insert(['name' => 'Project3', 'due_date' => new DateTime('2021-01-01 00:00:00'), 'group_id' => 2, 'is_done' => false, 'company_id' => 1, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
    
        DB::table('groups')->insert(['name' => 'Group1', 'created_by' =>1, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('groups')->insert(['name' => 'Group2', 'created_by' => 2, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('groups')->insert(['name' => 'Group3', 'created_by' => 1, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);

        DB::table('tasks')->insert(['name' => 'Task1', 'is_done' => false, 'created_by' => 1, 'project_id' => 1, 'due_date' => new DateTime('2021-01-01 00:00:00'), 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('tasks')->insert(['name' => 'Task2', 'is_done' => true, 'created_by' => 1, 'project_id' => 1, 'due_date' => new DateTime('2020-11-01 00:00:00'), 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('tasks')->insert(['name' => 'Task3', 'is_done' => false, 'created_by' => 1, 'project_id' => 2, 'due_date' => new DateTime('2021-01-01 00:00:00'), 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        
        DB::table('companies')->insert(['name' => 'RandomCeg', 'created_by' => 1, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('companies')->insert(['name' => 'RandomCeg', 'created_by' => 1, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        
        DB::table('task_times')->insert(['start' => new DateTime('2020-11-01 20:02:21'), 'end' => new DateTime('2020-11-01 22:23:45'), 'task_id' => 1, 'created_by' => 1, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('task_times')->insert(['start' => new DateTime('2020-11-01 20:02:21'), 'end' => new DateTime('2020-11-01 22:23:45'), 'task_id' => 1, 'created_by' => 1, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('task_times')->insert(['start' => new DateTime('2020-11-01 20:02:21'), 'end' => new DateTime('2020-11-01 22:23:45'), 'task_id' => 2, 'created_by' => 1, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('task_times')->insert(['start' => new DateTime('2020-11-02 20:02:21'), 'end' => new DateTime('2020-11-02 22:23:45'), 'task_id' => 3, 'created_by' => 2, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('task_times')->insert(['start' => new DateTime('2020-11-02 20:02:21'), 'end' => new DateTime('2020-11-02 22:23:45'), 'task_id' => 2, 'created_by' => 2, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);
        DB::table('task_times')->insert(['start' => new DateTime('2020-11-02 20:02:21'), 'end' => new DateTime('2020-11-02 22:23:45'), 'task_id' => 3, 'created_by' => 1, 'created_at' => new DateTime('now'), 'updated_at' => new DateTime('now')]);

    }
}
