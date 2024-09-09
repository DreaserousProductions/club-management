<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MUser;

class MUserController extends Controller
{
    public function index()
    {
        $users = MUser::all();
        return response()->json($users);
    }
    public function store(Request $request)
    {
        print("I got here");
        $user = MUser::create($request->all());
        print("I got here");
        return response()->json($user, 201);
    }
}
