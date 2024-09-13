<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Club;

class ClubController extends Controller
{
    // Display a listing of the clubs
    public function index()
    {
        $clubs = Club::select('id', 'name', DB::raw("JSON_EXTRACT(description, '$.\"about us\"') as about_us"))->get();
        return response()->json($clubs);
    }

    public function getClub($id, Request $request)
    {
        // Find the club by id
        $club = Club::find($id);
        
        // Check if the club was found
        if (!$club) {
            return response()->json(['error' => 'Club not found'], 404);
        }

        $data = [
            'id' => $club->id,
            'name' => $club->name,
            'description' => $club->description,
            'president_id' => $club->president_id,
            'secretary_id' => $club->secretary_id,
            'treasurer_id' => $club->treasurer_id 
        ];

        return response()->json($club);
    }
}
