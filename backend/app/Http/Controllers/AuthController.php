<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\StudentData;
use App\Models\Skill;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'email_verified' => false,
            'registration_completed' => false,
        ]);

        $verificationToken = JWTAuth::fromUser($user);

        Mail::send('emails.verify', ['user' => $user, 'token' => $verificationToken], function ($message) use ($user) {
            $message->to($user->email);
            $message->subject('Verify your email address');
        });

        return response()->json([
            'message' => 'User registered successfully. Please check your email for verification.',
            'status' => true
        ], 201);
    }

    public function verifyEmail(Request $request)
    {
        try {
            // Retrieve the token from the request body
            $token = $request->input('token');
    
            if (!$token) {
                return response()->json(['message' => 'Token not provided.'], 400);
            }
    
            // Authenticate the user using the token
            $user = JWTAuth::setToken($token)->authenticate();
    
            if (!$user) {
                return response()->json(['message' => 'Invalid token or user not found.'], 400);
            }
    
            // Mark the user's email as verified
            $user->email_verified = true;
            $user->save();
    
            // Generate a new token for the user
            $newToken = JWTAuth::fromUser($user);
    
            // Return the new token, user object, and status
            return response()->json([
                'message' => 'Email verified successfully.',
                'status' => true,
                'token' => $newToken,
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Token is invalid or expired.'], 400);
        }
    }      

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = JWTAuth::user();

        if (!$user->email_verified) {
            Mail::send('emails.verify', ['user' => $user, 'token' => $verificationToken], function ($message) use ($user) {
                $message->to($user->email);
                $message->subject('Verify your email address');
            });
            return response()->json(['message' => 'Your email is not verified yet. Kindly check your inbox'], 403);
        }

        return response()->json([
            'status' => true,
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out', 'status' => true]);
    }

    public function me()
    {
        return response()->json(Auth::user());
    }

    public function refreshToken(Request $request)
    {
        try {
            // Retrieve the token from the Authorization header
            $currentToken = JWTAuth::getToken();
    
            if (!$currentToken) {
                return response()->json(['message' => 'Token not provided.'], 400);
            }
    
            // Refresh the token
            $newToken = JWTAuth::refresh($currentToken);
    
            // Retrieve the authenticated user with the related data
            $user = JWTAuth::setToken($newToken)->authenticate();
    
            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }
    
            // Eager load the relationships: skills, following, followers, and userProjects
            $user->load('skills', 'following', 'followers', 'userProjects');
    
            // Return the new token and user object with the loaded relations
            return response()->json([
                'message' => 'Token refreshed successfully.',
                'status' => true,
                'token' => $newToken,
                'user' => $user,
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['message' => 'Token is invalid.'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['message' => 'Could not refresh token.'], 500);
        }
    }
    

    public function completeRegistration(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'bio' => 'nullable|string',
            'general_field' => 'nullable|string',
            'skills' => 'nullable|array',
            'skills.*' => 'string',
            'cv' => 'nullable|file|mimes:pdf|max:5120',
            'vector_id' => 'required|string|unique:users',
        ]);
    
        // Get the authenticated user
        $user = Auth::user();
    
        // Update the user's information directly in the users table
        $user->update([
            'bio' => $request->input('bio'),
            'general_field' => $request->input('general_field'),
            'vector_id' => $request->input('vector_id'),
            'profile_picture' => $user->profile_picture, 
        ]);
    
        // Handle the CV file upload
        if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('cvs', 'public');
            $user->cv = $cvPath;
            $user->save();
        }
    
        // Handle the skills
        if ($request->has('skills')) {
            // Remove existing skills
            Skill::where('user_id', $user->id)->delete();
            
            // Add new skills
            foreach ($request->input('skills') as $skillName) {
                $user->skills()->create(['skill' => $skillName]);
            }
        }
    
        // Mark the user's registration as completed
        $user->registration_completed = true;
        $user->save();
    
        return response()->json([
            'message' => 'User information completed successfully.',
            'status' => true,
            'user' => $user,
        ]);
    }   
    
    public function getCvAsBase64()
    {
        // Get the authenticated user
        $user = Auth::user();
    
        // Ensure the user has a CV
        if (!$user->cv) {
            return response()->json([
                'message' => 'No CV found for this user.',
                'status' => false
            ], 404);
        }
    
        // Get the file path from the user's cv column
        $filePath = $user->cv;
    
        // Check if the file exists in storage
        if (!Storage::disk('public')->exists($filePath)) {
            return response()->json([
                'message' => 'CV file not found.',
                'status' => false
            ], 404);
        }
    
        // Get the contents of the file
        $fileContent = Storage::disk('public')->get($filePath);
    
        // Convert the file contents to base64
        $base64Cv = base64_encode($fileContent);
    
        return response()->json([
            'data' => $base64Cv,
            'status' => true
        ], 200);
    }
}
