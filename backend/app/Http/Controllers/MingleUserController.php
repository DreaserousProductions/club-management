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
            $user->registered = 1;
            $user->save();

            // Respond with success
            return response()->json(['message' => 'OTP verified successfully', 'success' => true], 200);
        } else {
            // Invalid OTP
            return response()->json(['message' => 'Invalid OTP'], 400);
        }
    }

    // Sending OTP method (same as before)
    public function sendOtp(Request $request)
    {
        // Log request data
        Log::info('Request Data:', ['request' => $request->all()]);

        // Validate the roll number
        $validated = $request->validate([
            'roll' => 'required|regex:/^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/'
        ]);

        $rollNumber = $validated['roll'];

        $userIfExists = MingleUser::where('rollnumber', $rollNumber)->first();
        if(!$userIfExists) {
            // Generate a random 6-digit OTP
            $otp = Str::random(6);
            
            Log::info('Data:', ['OTP' => $otp,  $rollNumber]);

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

    // public function mail_otp(Request $request)
    // {
    //     // Log request data for debugging
    //     Log::info('Request Data:', ['request' => $request->all()]);

    //     // Validate the roll number
    //     $validated = $request->validate([
    //         'roll' => 'required|regex:/^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/'
    //     ]);

    //     $rollNumber = $validated['roll'];

    //     // Generate a random 6-digit OTP
    //     $otp = Str::random(6);
        
    //     Log::info('Data:', ['OTP' => $otp,  $rollNumber]);

    //     // Store the roll number and OTP in the mingle_users table
    //     $user = MingleUser::updateOrCreate(
    //         ['rollnumber' => $rollNumber],  // Condition for finding the record
    //         ['otp' => $otp] // Fields to be updated or created
    //     );

    //     // Check if the user exists by roll number
    //     // $user = MingleUser::where('rollnumber', $rollNumber)->first();

    //     // if ($user) {
    //     //     // User exists, update the OTP
    //     //     $user->otp = $otp;
    //     //     $user->updated_at = now();  // Update the timestamp
    //     //     $user->save();
    //     // } else {
    //     //     // User doesn't exist, create a new record
    //     //     $user = MingleUser::create([
    //     //         'rollnumber' => $rollNumber,
    //     //         'otp' => $otp,
    //     //         'created_at' => now(),
    //     //         'updated_at' => now(),
    //     //     ]);
    //     // }

    //     // Send OTP via email
    //     $recipientEmail = $rollNumber . '@nitpy.ac.in';
        
    //     Mail::raw("Your OTP is: $otp", function ($message) use ($recipientEmail) {
    //         $message->to($recipientEmail)
    //                 ->subject('Your OTP');
    //     });

    //     // Respond with a success message
    //     return response()->json(['message' => 'OTP sent successfully'], 200);
    // }
    // // public function index()
    // // {
    // //     // return response()->string("Hello");
    // // }
    // // public function store(Request $request)
    // // {
    // //     // Log::info('Request Data:', ['request' => $request->all()]);

    // //     // // Validate request data
    // //     // $validator = Validator::make($request->all(), [
    // //     //     'name' => 'required|string|max:255',
    // //     //     'email' => 'required|email|unique:users,email',
    // //     //     'username' => 'required|string|max:255|unique:users,username',
    // //     //     'password' => 'required|string|min:8',
    // //     //     'role' => 'required|integer',
    // //     // ]);

    // //     // if ($validator->fails()) {
    // //     //     return response()->json($validator->errors(), 422);
    // //     // }

    // //     // Hash the password
    // //     // $request->merge([
    // //     //     'password' => Hash::make($request->input('password')),
    // //     // ]);

    // //     // $user = MingleUser::create($request->all());
    // //     // return response()->json($user, 201);
    // // }
    // // public function mail_otp(Request $request)
    // // {
    // //     // Log::info('Request Data:', ['request' => $request->all()]);
    // //     return response()->json($request, 200);
    // // }
}
