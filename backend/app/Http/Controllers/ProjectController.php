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
            'project_description' => 'required|string',
            'project_steps' => 'nullable|string',
            'project_requirements' => 'nullable|string',
            'project_tips' => 'nullable|string',
            'project_applications' => 'nullable|string',
            'is_bookmarked' => 'sometimes|boolean',
            'is_recommended' => 'sometimes|boolean',
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
            'user_id' => Auth::id(),
            'project_session_id' => $sessionId,
            'title' => $request->input('title'),
            'project_description' => $request->input('project_description'),
            'project_steps' => $request->input('project_steps'),
            'project_requirements' => $request->input('project_requirements'),
            'project_tips' => $request->input('project_tips'),
            'project_applications' => $request->input('project_applications'),
            'is_bookmarked' => $request->input('is_bookmarked', false),
            'is_recommended' => $request->input('is_recommended', false),
        ]);
    
        return response()->json([
            'message' => 'Project created successfully.',
            'data' => $project,
            'status' => true
        ], 200);
    }

    public function createStandaloneProject(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'title' => 'required|string|max:255',
            'project_description' => 'required|string',
            'project_steps' => 'nullable|string',
            'project_requirements' => 'nullable|string',
            'project_tips' => 'nullable|string',
            'project_applications' => 'nullable|string',
            'is_bookmarked' => 'sometimes|boolean',
            'is_recommended' => 'sometimes|boolean',
        ]);
    
        // Create a new standalone project (without a session ID)
        $project = Project::create([
            'user_id' => Auth::id(),
            'title' => $request->input('title'),
            'project_description' => $request->input('project_description'),
            'project_steps' => $request->input('project_steps'),
            'project_requirements' => $request->input('project_requirements'),
            'project_tips' => $request->input('project_tips'),
            'project_applications' => $request->input('project_applications'),
            'is_bookmarked' => $request->input('is_bookmarked', false),
            'is_recommended' => $request->input('is_recommended', true),
        ]);
    
        return response()->json([
            'message' => 'Standalone project created successfully.',
            'data' => $project,
            'status' => true
        ], 200);
    }
    

    public function toggleBookmark($projectId)
    {
        // Find the project by ID
        $project = Project::find($projectId);

        // Check if the project exists
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found.',
            ], 404);
        }

        // Toggle the bookmark status
        $project->is_bookmarked = !$project->is_bookmarked;
        $project->save();

        // Return a response
        return response()->json([
            'status' => true,
            'message' => 'Project bookmark status updated successfully.',
            'data' => $project,
        ], 200);
    }

    public function getBookmarkedProjects()
    {
        // Get the authenticated user
        $user = Auth::user();

        // Fetch bookmarked projects for the user and include the related project session
        $bookmarkedProjects = Project::with('projectSession')
            ->where('user_id', $user->id)
            ->where('is_bookmarked', true)
            ->get();

        // Return the response
        return response()->json([
            'status' => true,
            'message' => 'Bookmarked projects retrieved successfully.',
            'data' => $bookmarkedProjects,
        ], 200);
    }
    
    public function getStandaloneProjects()
    {
        // Get the authenticated user
        $user = Auth::user();

        // Fetch bookmarked projects for the user and include the related project session
        $recommendedProjects = Project::with('projectSession')
            ->where('user_id', $user->id)
            ->where('is_recommended', true)
            ->get();

        // Return the response
        return response()->json([
            'status' => true,
            'message' => 'Recommended projects retrieved successfully.',
            'data' => $recommendedProjects,
        ], 200);
    }
}
