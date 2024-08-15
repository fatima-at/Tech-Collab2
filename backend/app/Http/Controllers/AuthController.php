<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'user_type' => 'required|in:student,mentor',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => $request->user_type,
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
    
            return response()->json(['message' => 'Email verified successfully.', 'status' => true]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Token is invalid or expired.'], 400);
        }
    }    


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        return response()->json(compact('token'));
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function me()
    {
        return response()->json(Auth::user());
    }
}
