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
        $user = MUser::create($request->all());
        return response()->json($user, 201);
    }
}
