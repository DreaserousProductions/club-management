<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
                ['otp' => $otp]
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

    // Login API function
    public function login(Request $request)
    {
        // Validate the input
        $validated = $request->validate([
            'roll' => 'required|regex:/^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/',
            'password' => 'required|string|min:8'
        ]);

        $rollNumber = strtolower($validated['roll']);
        Log::info("smtg", ["smtg" => $rollNumber]);
        $password = $validated['password'];

        // Check if user exists with the given roll number
        $user = MingleUser::where('rollnumber', $rollNumber)->first();

        if ($user && Hash::check($password, $user->password)) {
            // Successful login
            return response()->json(['message' => 'Login successful', 'success' => true], 200);
        } else {
            // Invalid credentials
            return response()->json(['message' => 'Invalid roll number or password', 'success' => false], 400);
        }
    }
}
