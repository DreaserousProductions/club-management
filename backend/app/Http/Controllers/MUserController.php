<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

use App\Models\MUser;

class MUserController extends Controller
{
    public function index()
    {
        $users = MUser::all();
        Log::info('Request Data:', ['User' => $users]);
        return response()->json($users);
    }
    public function store(Request $request)
    {
        Log::info('Request Data:', ['request' => $request->all()]);

        // // Validate request data
        // $validator = Validator::make($request->all(), [
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|email|unique:users,email',
        //     'username' => 'required|string|max:255|unique:users,username',
        //     'password' => 'required|string|min:8',
        //     'role' => 'required|integer',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json($validator->errors(), 422);
        // }

        // Hash the password
        $request->merge([
            'password' => Hash::make($request->input('password')),
        ]);

        $user = MUser::create($request->all());
        return response()->json($user, 201);
    }
}
