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
        {
            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email')->unique();
                $table->string('vector_id')->unique()->nullable(); // id of this user in the chromadB vector database
                $table->string('password');
                $table->boolean('email_verified')->default(false); 
                $table->boolean('registration_completed')->default(false);
                $table->text('bio')->nullable();
                $table->string('general_field')->nullable();
                $table->string('profile_picture')->nullable();
                $table->string('cv')->nullable();
                $table->string('linkedin_profile')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
