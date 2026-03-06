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
        $messages = [
            'author.required' => 'Имя обязательно для заполнения',
            'author.string' => 'Имя должно быть строкой',
            'author.max' => 'Имя не может быть длиннее 255 символов',

            'child_name.string' => 'Имя ребенка должно быть строкой',
            'child_name.max' => 'Имя ребенка не может быть длиннее 255 символов',

            'text.required' => 'Текст отзыва обязателен',
            'text.string' => 'Текст отзыва должен быть строкой',

            'rating.required' => 'Оценка обязательна',
            'rating.integer' => 'Оценка должна быть числом',
            'rating.min' => 'Оценка должна быть от 1 до 5',
            'rating.max' => 'Оценка должна быть от 1 до 5',
        ];


        $validated = $request->validate([
            'author' => 'required|string|max:255',
            'child_name' => 'nullable|string|max:255',
            'text' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'date' => 'nullable|date'
        ], $messages);

        $review = Review::create([
            'author' => $validated['author'],
            'child_name' => $validated['child_name'] ?? null,
            'text' => $validated['text'],
            'rating' => $validated['rating'],
            'date' => $validated['date'] ?? now(),
            'is_approved' => false,
            'is_active' => true
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Спасибо за отзыв! После модерации он появится на сайте.',
            'data' => $review
        ], 201);
    }
}
