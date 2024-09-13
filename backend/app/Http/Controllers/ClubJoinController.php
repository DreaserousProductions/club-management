<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClubJoinRequest;
use Illuminate\Support\Facades\Validator;

class ClubJoinController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'club_id' => 'required|integer|exists:clubs,id',
            'user_id' => 'required|exists:mingle_users,rollnumber',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Retrieve the user ID based on the rollnumber
        try {
            $user = MingleUser::where('rollnumber', $request->input('user_id'))->firstOrFail();
            $userId = $user->id;
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Create a new club join request
        $joinRequest = ClubJoinRequest::create([
            'club_id' => $request->input('club_id'),
            'user_id' => $userId,
        ]);

        return response()->json($joinRequest, 201);
    }
}
