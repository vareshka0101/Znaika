<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ReviewController extends Controller
{
    // Публичный метод для получения одобренных отзывов
    public function index()
    {
        try {
            $reviews = Review::where('is_active', true)
                ->where('is_approved', true)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($reviews);
        } catch (\Exception $e) {
            Log::error('Reviews index error: ' . $e->getMessage());
            return response()->json(['error' => 'Ошибка загрузки отзывов'], 500);
        }
    }

    // Админский метод для получения всех отзывов
    public function adminIndex(Request $request)
    {
        try {
            // Проверка прав администратора
            if ($request->user()->role !== 'admin') {
                return response()->json(['error' => 'Доступ запрещен'], 403);
            }

            $reviews = Review::orderBy('created_at', 'desc')->get();
            return response()->json($reviews);
        } catch (\Exception $e) {
            Log::error('Admin reviews index error: ' . $e->getMessage());
            return response()->json(['error' => 'Ошибка загрузки отзывов'], 500);
        }
    }

    // Публичный метод для создания отзыва
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

        try {
            $review = Review::create([
                'author' => $validated['author'],
                'child_name' => $validated['child_name'] ?? null,
                'text' => $validated['text'],
                'rating' => $validated['rating'],
                'date' => $validated['date'] ?? now(),
                'is_approved' => false, // По умолчанию на модерации
                'is_active' => true
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Спасибо за отзыв! После модерации он появится на сайте.',
                'data' => $review
            ], 201);
        } catch (\Exception $e) {
            Log::error('Review store error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при сохранении отзыва'
            ], 500);
        }
    }

    // Админский метод для обновления отзыва
    public function adminUpdate(Request $request, $id)
    {
        try {
            if ($request->user()->role !== 'admin') {
                return response()->json(['error' => 'Доступ запрещен'], 403);
            }

            $review = Review::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'author' => 'sometimes|string|max:255',
                'child_name' => 'nullable|string|max:255',
                'text' => 'sometimes|string',
                'rating' => 'sometimes|integer|min:1|max:5',
                'is_approved' => 'sometimes|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $review->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Отзыв успешно обновлен',
                'data' => $review
            ]);
        } catch (\Exception $e) {
            Log::error('Review update error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при обновлении отзыва'
            ], 500);
        }
    }

    // Админский метод для удаления отзыва
    public function adminDestroy(Request $request, $id)
    {
        try {
            if ($request->user()->role !== 'admin') {
                return response()->json(['error' => 'Доступ запрещен'], 403);
            }

            $review = Review::findOrFail($id);
            $review->delete();

            return response()->json([
                'success' => true,
                'message' => 'Отзыв успешно удален'
            ]);
        } catch (\Exception $e) {
            Log::error('Review delete error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при удалении отзыва'
            ], 500);
        }
    }

    // Админский метод для переключения статуса одобрения
    public function toggleApproval(Request $request, $id)
    {
        try {
            if ($request->user()->role !== 'admin') {
                return response()->json(['error' => 'Доступ запрещен'], 403);
            }

            $review = Review::findOrFail($id);
            $review->is_approved = !$review->is_approved;
            $review->save();

            return response()->json([
                'success' => true,
                'message' => $review->is_approved ? 'Отзыв опубликован' : 'Отзыв снят с публикации',
                'data' => $review
            ]);
        } catch (\Exception $e) {
            Log::error('Review toggle approval error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при изменении статуса'
            ], 500);
        }
    }

    // Админский метод для получения одного отзыва
    public function adminShow(Request $request, $id)
    {
        try {
            if ($request->user()->role !== 'admin') {
                return response()->json(['error' => 'Доступ запрещен'], 403);
            }

            $review = Review::findOrFail($id);
            return response()->json($review);
        } catch (\Exception $e) {
            Log::error('Review show error: ' . $e->getMessage());
            return response()->json(['error' => 'Отзыв не найден'], 404);
        }
    }
}
