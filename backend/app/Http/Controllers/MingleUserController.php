<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

use App\Models\MingleUser;

class MingleUserController extends Controller
{
    // Sending OTP method
    public function sendOtp(Request $request)
    {
        // Validate the roll number
        $validated = $request->validate([
            'roll' => 'required|regex:/^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/'
        ]);

        $rollNumber = strtolower($validated['roll']);

        $userIfExists = MingleUser::where('rollnumber', $rollNumber)->where('registered', 1)->first();
        if(!$userIfExists) {
            // Generate a random 6-digit OTP
            $otp = Str::random(6);
            
            // Store the roll number and OTP in the mingle_users table
            MingleUser::updateOrCreate(
                ['rollnumber' => $rollNumber],
                ['otp' => $otp, 'name' => $rollNumber]
            );
            
            // Send OTP via email
            $recipientEmail = $rollNumber . '@nitpy.ac.in';
            
            Mail::raw("Your OTP is: $otp", function ($message) use ($recipientEmail) {
                $message->to($recipientEmail)
                        ->subject('Your OTP');
            });

            return response()->json(['message' => 'OTP sent successfully', 'success' => true], 200);
        } else {
            return response()->json(['message' => 'User already registered', 'success' => false], 200);
        }
    }

    // Route to verify OTP (same as before)
    public function verifyOtp(Request $request)
    {
        // Validate the OTP and roll number
        $validated = $request->validate([
            'roll' => 'required|regex:/^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/',
            'otp'  => 'required|string|size:6'
        ]);

        $rollNumber = strtolower($validated['roll']);
        $otp = $validated['otp'];

        // Check if the roll number exists and OTP matches
        $user = MingleUser::where('rollnumber', $rollNumber)->first();

        if ($user && $user->otp === $otp) {
            // OTP is valid, delete it from the database to prevent reuse
            $user->otp = null;
            $user->save();

            // Respond with success
            return response()->json(['message' => 'OTP verified successfully', 'success' => true], 200);
        } else {
            // Invalid OTP
            return response()->json(['message' => 'Invalid OTP'], 400);
        }
    }

    // Password creation route
    public function createPassword(Request $request)
    {
        // Validate the password and roll number
        $validated = $request->validate([
            'roll' => 'required|regex:/^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/',
            'password' => 'required|string|min:8'
        ]);

        $rollNumber = strtolower($validated['roll']);
        $password = $validated['password'];

        // Find the user by roll number
        $user = MingleUser::where('rollnumber', $rollNumber)->first();

        if ($user && !$user->password) {
            // Hash and store the password
            $user->password = Hash::make($password);
            $user->registered = 1;
            $user->save();

            return response()->json(['message' => 'Password created successfully', 'success' => true], 200);
        } else {
            return response()->json(['message' => 'Password already set or user not found'], 400);
        }
    }

    public function login(Request $request)
    {
        // Validate the input
        $validated = $request->validate([
            'roll' => 'required|regex:/^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/',
            'password' => 'required|string|min:8'
        ]);
    
        // Prepare credentials for attempt
        $credentials = [
            'rollnumber' => strtolower($validated['roll']),
            'password' => $validated['password'],
        ];
    
        // Attempt to authenticate the user and generate a token
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid roll number or password', 'success' => false], 401);
        }
    
        // Successful login
        return response()->json([
            'message' => 'Login successful',
            'token' => $token,  // Return the JWT token
            'success' => true
        ], 200);
    }

    public function updateProfile(Request $request) {
        // Validate incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048', // Validate image file
        ]);

        // Get the current authenticated user
        $user = JWTAuth::parseToken()->authenticate();

        // Handle avatar file upload if present
        if ($request->hasFile('avatar')) {
            // Delete the old avatar if it exists
            if ($user->avatar && Storage::exists($user->avatar)) {
                Storage::delete($user->avatar);
            }

            // Store the new avatar
            $file = $request->file('avatar');
            $path = $file->store('avatars', 'public'); // Store the file in 'public/avatars' directory

            // Update the avatar path
            $user->avatar = $path;
        }

        // Update other user fields
        $user->name = $validated['name'];
        $user->save();

        return response()->json(['message' => 'Profile updated successfully', 'success' => true], 200);
    }
}
