<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects_collection', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vector_id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('category');
            $table->text('required_skills')->nullable(); 
            $table->text('proposed_algorithms')->nullable();
            $table->string('URL')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects_collection');
    }
};
