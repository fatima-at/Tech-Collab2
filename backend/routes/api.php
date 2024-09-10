<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('verify', [AuthController::class, 'verifyEmail']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refreshToken']);
});

Route::group([
    'middleware' => ['auth:api'],
    'prefix' => 'v1'

], function ($router) {
    Route::post('complete-registration', [AuthController::class, 'completeRegistration']);

    // Project session routes
    Route::post('project-sessions', [ProjectSessionController::class, 'createSession']); 
    Route::get('project-sessions', [ProjectSessionController::class, 'getUserProjectSessions']); 
    Route::get('project-sessions/{sessionId}', [ProjectSessionController::class, 'getSessionData']);

    // Project routes
    Route::post('project-sessions/{sessionId}/projects', [ProjectController::class, 'createProject']); 
    Route::post('projects', [ProjectController::class, 'createStandaloneProject']); 
    Route::post('projects/{projectId}/bookmark', [ProjectController::class, 'toggleBookmark']);
    Route::get('projects/bookmarked', [ProjectController::class, 'getBookmarkedProjects']);
    Route::get('projects/standalone', [ProjectController::class, 'getStandaloneProjects']);

    Route::get('user/cv-base64', [AuthController::class, 'getCvAsBase64']);

    Route::post('user/follow', [UserController::class, 'follow']);
    Route::post('user/unfollow', [UserController::class, 'unfollow']);
    Route::get('users/search', [UserController::class, 'searchUsers']);
    Route::get('user/{id}', [UserController::class, 'getUserById']);
});
