<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
use App\Models\Skill;
use App\Models\UserProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function follow(Request $request)
    {
        $request->validate([
            'followee_id' => 'required|exists:users,id',
        ]);

        $followee_id = $request->input('followee_id');

        $follower_id = Auth::id();
        $existingFollow = Follow::where('follower_id', $follower_id)
            ->where('followee_id', $followee_id)
            ->first();

        if ($existingFollow) {
            return response()->json([
                'message' => 'You are already following this user.',
                'status' => false,
            ], 400);
        }

        Follow::create([
            'follower_id' => $follower_id,
            'followee_id' => $followee_id,
        ]);

        return response()->json([
            'message' => 'User followed successfully.',
            'status' => true,
        ], 200);
    }

    public function unfollow(Request $request)
    {
        $request->validate([
            'followee_id' => 'required|exists:users,id',
        ]);

        $followee_id = $request->input('followee_id');

        $follower_id = Auth::id();
        $follow = Follow::where('follower_id', $follower_id)
            ->where('followee_id', $followee_id)
            ->first();

        if (!$follow) {
            return response()->json([
                'message' => 'You are not following this user.',
                'status' => false,
            ], 400);
        }

        $follow->delete();

        return response()->json([
            'message' => 'User unfollowed successfully.',
            'status' => true,
        ], 200);
    }

    public function searchUsers(Request $request)
    {
        $search = $request->query('search');

        $authUserId = Auth::id();

        $users = User::where('name', 'like', '%' . $search . '%')
            ->where('registration_completed', true)
            ->withCount('followers') 
            ->with(['followers' => function ($query) use ($authUserId) {
                $query->where('follower_id', $authUserId);
            }])
            ->get()
            ->map(function ($user) use ($authUserId) {
                $isFollowing = $user->followers->isNotEmpty();

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'bio' => $user->bio,
                    'general_field' => $user->general_field,
                    'profile_picture' => $user->profile_picture,
                    'followers_count' => $user->followers_count,
                    'is_following' => $isFollowing,
                ];
            });

        return response()->json([
            'message' => 'Users retrieved successfully.',
            'data' => $users,
            'status' => true,
        ], 200);
    }

    function getUserById($id)
    {
        $user = User::with(['skills', 'userProjects'])->find($id);
    
        if (!$user) {
            return response()->json([
                'message' => 'User not found',
                'status' => false,
            ], 404);
        }
    
        return response()->json([
            'message' => 'User found',
            'data' => $user,
            'status' => true,
        ], 200);
    }

    public function updateSkills(Request $request)
    {
        $request->validate([
            'removedSkills' => 'array',
            'removedSkills.*' => 'integer|exists:skills,id', 
            'skills' => 'array',
            'skills.*' => 'string|max:255', 
        ]);

        $userId = Auth::id(); 
        $removedSkillsIds = $request->input('removedSkills');
        $newSkills = $request->input('skills');

        // Step 1: Remove skills by IDs
        if (!empty($removedSkillsIds)) {
            Skill::whereIn('id', $removedSkillsIds)
                ->where('user_id', $userId) 
                ->delete();
        }

        // Step 2: Add new skills
        if (!empty($newSkills)) {
            foreach ($newSkills as $skillName) {
                Skill::create([
                    'skill' => $skillName,
                    'user_id' => $userId,
                ]);
            }
        }

        return response()->json([
            'message' => 'Skills updated successfully',
            'status' => true,
        ], 200);
    }

    public function addUserProject(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|string',
            'url' => 'nullable|url',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:255', // Each technology should be a string
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        // Create a new project for the authenticated user
        $project = UserProject::create([
            'user_id' => Auth::id(), // Get the authenticated user's ID
            'title' => $validatedData['title'],
            'description' => $validatedData['description'] ?? null,
            'status' => $validatedData['status'] ?? null,
            'url' => $validatedData['url'] ?? null,
            'technologies' => implode(', ', $validatedData['technologies'] ?? []), // Convert array to string
            'start_date' => $validatedData['start_date'] ?? null,
            'end_date' => $validatedData['end_date'] ?? null,
        ]);

        // Return a success response
        return response()->json([
            'message' => 'Project added successfully.',
            'data' => $project,
            'status' => true,
        ], 201);
    }

    public function getUsersByVectorIds(Request $request)
    {
        // Validate that 'vector_ids' is present and is an array
        $request->validate([
            'vector_ids' => 'required|array',
        ]);
    
        // Get the vector IDs from the request body
        $vectorIds = $request->input('vector_ids');
    
        // Fetch users whose vector_id is in the provided array
        $users = User::whereIn('vector_id', $vectorIds)->get();
    
        if ($users->isEmpty()) {
            return response()->json([
                'message' => 'No users found',
                'data' => [],
                'status' => false,
            ], 404);
        }
    
        // Return the array of users with the custom response format
        return response()->json([
            'message' => 'Users found',
            'data' => $users,
            'status' => true,
        ], 200);
    }
}
