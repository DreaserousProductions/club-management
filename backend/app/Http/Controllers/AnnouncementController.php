<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'author_name' => 'required|string|max:255',
            'club_id' => 'required|exists:clubs,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $announcement = Announcement::create($validatedData);

        return response()->json($announcement, 201);
    }
}
