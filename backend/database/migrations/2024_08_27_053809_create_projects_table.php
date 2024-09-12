<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('project_session_id')->nullable()->constrained('project_sessions')->onDelete('cascade');
            $table->string('title');
            $table->text('project_description')->nullable();
            $table->json('project_steps')->nullable();
            $table->json('project_requirements')->nullable();
            $table->json('project_tips')->nullable();
            $table->json('project_applications')->nullable();
            $table->boolean('is_bookmarked')->default(false);
            $table->boolean('is_recommended')->default(false);
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
        Schema::dropIfExists('projects');
    }
}
