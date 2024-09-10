<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

use App\Models\MingleUser;

class MingleUserController extends Controller
{
    // Sending OTP method (same as before)
    public function sendOtp(Request $request)
    {
        // Validate the roll number
        $validated = $request->validate([
            'roll' => 'required|regex:/^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/'
        ]);

        $rollNumber = $validated['roll'];

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

    // Route to verify OTP
    public function verifyOtp(Request $request)
    {
        // Validate the OTP and roll number
        $validated = $request->validate([
            'roll' => 'required|regex:/^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/',
            'otp'  => 'required|string|size:6'
        ]);

        $rollNumber = $validated['roll'];
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
        Log::info('madeIt');

        // Validate the password and roll number
        $validated = $request->validate([
            'roll' => 'required|regex:/^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/',
            'password' => 'required|string|min:8|confirmed'
        ]);

        $rollNumber = $validated['roll'];
        $password = $validated['password'];

        Log::info('Data:', ['Password' => $password,  $rollNumber]);

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
}
