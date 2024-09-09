<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        $user = MUser::create($request->all());
        return response()->json($user, 201);
    }
}
