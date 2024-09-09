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
    public function mail_otp(Request $request)
    {
        // Log request data for debugging
        Log::info('Request Data:', ['request' => $request->all()]);

        // Validate the roll number
        $validated = $request->validate([
            'roll' => 'required|regex:/^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/'
        ]);

        $rollNumber = $validated['roll'];

        // Generate a random 6-digit OTP
        $otp = Str::random(6);
        
        Log::info('Data:', ['OTP' => $otp,  $rollNumber]);

        // Store the roll number and OTP in the mingle_users table
        $user = MingleUser::updateOrCreate(
            ['rollnumber' => $rollNumber],
            ['otp' => $otp] // Update OTP if user already exists
        );

        // Send OTP via email
        $recipientEmail = $rollNumber . '@nitpy.ac.in';
        
        Mail::raw("Your OTP is: $otp", function ($message) use ($recipientEmail) {
            $message->to($recipientEmail)
                    ->subject('Your OTP');
        });

        // Respond with a success message
        return response()->json(['message' => 'OTP sent successfully'], 200);
    }
    // public function index()
    // {
    //     // return response()->string("Hello");
    // }
    // public function store(Request $request)
    // {
    //     // Log::info('Request Data:', ['request' => $request->all()]);

    //     // // Validate request data
    //     // $validator = Validator::make($request->all(), [
    //     //     'name' => 'required|string|max:255',
    //     //     'email' => 'required|email|unique:users,email',
    //     //     'username' => 'required|string|max:255|unique:users,username',
    //     //     'password' => 'required|string|min:8',
    //     //     'role' => 'required|integer',
    //     // ]);

    //     // if ($validator->fails()) {
    //     //     return response()->json($validator->errors(), 422);
    //     // }

    //     // Hash the password
    //     // $request->merge([
    //     //     'password' => Hash::make($request->input('password')),
    //     // ]);

    //     // $user = MingleUser::create($request->all());
    //     // return response()->json($user, 201);
    // }
    // public function mail_otp(Request $request)
    // {
    //     // Log::info('Request Data:', ['request' => $request->all()]);
    //     return response()->json($request, 200);
    // }
}
