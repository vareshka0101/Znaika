<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::where('is_active', true)
            ->where('is_approved', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'author' => 'required|string|max:255',
            'childName' => 'nullable|string|max:255',
            'yearsInGarden' => 'required|string|max:255',
            'text' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'date' => 'nullable|date'
        ]);

        $review = Review::create([
            'author' => $validated['author'],
            'child_name' => $validated['childName'] ?? null,
            'years_in_garden' => $validated['yearsInGarden'],
            'text' => $validated['text'],
            'rating' => $validated['rating'],
            'date' => $validated['date'] ?? now(),
            'is_approved' => false
        ]);

        return response()->json($review, 201);
    }
}
