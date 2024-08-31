<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectSession;
use Illuminate\Support\Facades\Auth;

class ProjectSessionController extends Controller
{
    /**
     * Create a new project session.
     */
    public function createSession(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'title' => 'required|string|max:255',
            'include_cv' => 'sometimes|boolean',
            'focus_area' => 'required|array',
            'complexity_level' => 'required|string',
            'tools_and_technologies' => 'required|array',
            'duration' => 'required|string',
            'team_size' => 'required|string',
            'expected_outcome' => 'required|string',
        ]);
    
        // Create a new project session
        $projectSession = ProjectSession::create([
            'user_id' => Auth::id(),
            'title' => $request->input('title'),
            'include_cv' => $request->input('include_cv', true),
            'complexity_level' => $request->input('complexity_level'),
            'duration' => $request->input('duration'),
            'team_size' => $request->input('team_size'),
            'expected_outcome' => $request->input('expected_outcome'),
        ]);
    
        // Attach focus areas
        foreach ($request->input('focus_area') as $focusArea) {
            $projectSession->focusAreas()->create(['name' => $focusArea]);
        }
    
        // Attach tools and technologies
        foreach ($request->input('tools_and_technologies') as $tool) {
            $projectSession->toolsAndTechnologies()->create(['name' => $tool]);
        }
    
        return response()->json([
            'status' => true,
            'message' => 'Project session created successfully.',
            'data' => $projectSession->load('focusAreas', 'toolsAndTechnologies'),
        ], 200);
    }
    

    /**
     * Retrieve all project sessions for the authenticated user.
     */
    public function getUserSessions()
    {
        $projectSessions = ProjectSession::where('user_id', Auth::id())->get();

        return response()->json([
            'status' => true,
            'project_sessions' => $projectSessions,
        ], 200);
    }

    /**
     * Retrieve all projects for a specific session.
     */
    public function getSessionProjects($sessionId)
    {
        $projectSession = ProjectSession::with('projects')->where('id', $sessionId)->where('user_id', Auth::id())->first();

        if (!$projectSession) {
            return response()->json(['message' => 'Project session not found.'], 404);
        }

        return response()->json([
            'status' => true,
            'project_session' => $projectSession,
            'projects' => $projectSession->projects,
        ], 200);
    }
}
