<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class NewsController extends Controller
{
    public function index()
    {
        try {
            $news = News::where('is_active', true)
                ->orderBy('date', 'desc')
                ->get();
            return response()->json($news);
        } catch (\Exception $e) {
            Log::error('News index error: ' . $e->getMessage());
            return response()->json(['error' => 'Ошибка загрузки новостей'], 500);
        }
    }

    public function show($id)
    {
        try {
            $news = News::findOrFail($id);


            $news->increment('views');
            $news->refresh();

            Log::info('News viewed:', ['id' => $id, 'views' => $news->views]);

            return response()->json($news);
        } catch (\Exception $e) {
            Log::error('News show error: ' . $e->getMessage());
            return response()->json(['error' => 'Новость не найдена'], 404);
        }
    }


    public function incrementViews($id)
    {
        try {
            $news = News::findOrFail($id);
            $news->increment('views');
            $news->refresh();

            Log::info('News views incremented:', ['id' => $id, 'views' => $news->views]);

            return response()->json([
                'success' => true,
                'data' => $news
            ]);
        } catch (\Exception $e) {
            Log::error('News increment views error: ' . $e->getMessage());
            return response()->json(['error' => 'Ошибка увеличения просмотров'], 500);
        }
    }
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'date' => 'required|date',
                'image' => 'required|string',
                'excerpt' => 'required|string',
                'content' => 'required|string',
                'tags' => 'nullable|array',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $news = News::create([
                'title' => $request->title,
                'date' => $request->date,
                'image' => $request->image,
                'excerpt' => $request->excerpt,
                'content' => $request->content,
                'tags' => $request->tags ?? [],
                'views' => 0,
                'is_active' => true
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Новость успешно создана',
                'data' => $news
            ], 201);
        } catch (\Exception $e) {
            Log::error('News store error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при создании новости'
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $news = News::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|string|max:255',
                'date' => 'sometimes|date',
                'image' => 'sometimes|string',
                'excerpt' => 'sometimes|string',
                'content' => 'sometimes|string',
                'tags' => 'nullable|array',
                'is_active' => 'sometimes|boolean'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $news->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Новость успешно обновлена',
                'data' => $news
            ]);
        } catch (\Exception $e) {
            Log::error('News update error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при обновлении новости'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $news = News::findOrFail($id);
            $news->delete();

            return response()->json([
                'success' => true,
                'message' => 'Новость успешно удалена'
            ]);
        } catch (\Exception $e) {
            Log::error('News destroy error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при удалении новости'
            ], 500);
        }
    }
}
