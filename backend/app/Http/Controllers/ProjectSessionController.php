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
            'focus_area' => 'nullable|array',
            'complexity_level' => 'nullable|string',
            'tools_and_technologies' => 'nullable|array',
            'duration' => 'nullable|string',
            'team_size' => 'nullable|string',
            'expected_outcome' => 'nullable|string',
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
    
        if (!empty($request->input('focus_area'))) {
            foreach ($request->input('focus_area') as $focusArea) {
                if (!empty($focusArea)) {
                    $projectSession->focusAreas()->create(['name' => $focusArea]);
                }
            }
        }
    
        if (!empty($request->input('tools_and_technologies'))) {
            foreach ($request->input('tools_and_technologies') as $tool) {
                if (!empty($tool)) {
                    $projectSession->toolsAndTechnologies()->create(['name' => $tool]);
                }
            }
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
    public function getUserProjectSessions()
    {
        // Get the authenticated user's ID
        $userId = Auth::id();
    
        // Query to get the project sessions with the required fields
        $projectSessions = ProjectSession::where('user_id', $userId)
            ->withCount('projects') // Get the count of related projects
            ->get(['id', 'title', 'created_at']) // Get only the required fields
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'title' => $session->title,
                    'created_at' => $session->created_at,
                    'projects_count' => $session->projects_count,
                ];
            });
    
        return response()->json([
            'status' => true,
            'message' => 'Project sessions retrieved successfully.',
            'data' => $projectSessions,
        ], 200);
    }

    /**
     * Retrieve all projects for a specific session.
     */
    public function getSessionData($sessionId)
    {
        // Retrieve the session with related focus areas, tools and technologies, and projects
        $session = ProjectSession::with(['focusAreas', 'toolsAndTechnologies', 'projects'])
            ->find($sessionId);

        // Check if session exists
        if (!$session) {
            return response()->json([
                'status' => false,
                'message' => 'Session not found.',
            ], 404);
        }

        // Return the session data
        return response()->json([
            'status' => true,
            'message' => 'Session retrieved successfully.',
            'data' => $session,
        ], 200);
    }
}
