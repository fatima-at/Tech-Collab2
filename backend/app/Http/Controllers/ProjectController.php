<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectSession;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function createProject(Request $request, $sessionId)
    {
        // Validate the incoming request data
        $request->validate([
            'title' => 'required|string|max:255',
            'is_bookmarked' => 'sometimes|boolean',
        ]);

        // Check if the session exists and belongs to the authenticated user
        $projectSession = ProjectSession::where('id', $sessionId)->where('user_id', Auth::id())->first();

        if (!$projectSession) {
            return response()->json([
                'message' => 'Project session not found or not accessible.',
                'data' => null,
                'status' => false
            ], 404);
        }

        // Create a new project linked to the session
        $project = Project::create([
            'project_session_id' => $sessionId,
            'title' => $request->input('title'),
            'is_bookmarked' => $request->input('is_bookmarked', false), 
        ]);

        return response()->json([
            'message' => 'Project created successfully.',
            'data' => $project,
            'status' => true
        ], 200);
    }
}
