<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ForumTopic;
use App\Models\ForumPost;
use App\Models\ParentClubAccess;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ForumController extends Controller
{
    /**
     * Get all topics
     */
    public function getTopics(Request $request)
    {
        try {
            Log::info('Fetching forum topics');

            $topics = ForumTopic::with(['user', 'posts' => function ($query) {
                $query->latest()->take(1);
            }])
                ->withCount('posts')
                ->latest()
                ->get();

            Log::info('Topics fetched successfully', ['count' => $topics->count()]);

            return response()->json($topics);
        } catch (\Exception $e) {
            Log::error('Error fetching topics: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при загрузке тем'
            ], 500);
        }
    }

    /**
     * Create a new topic
     */
    public function createTopic(Request $request)
    {
        try {
            Log::info('Creating new topic', ['user_id' => $request->user()?->id]);

            if (!$request->user()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Не авторизован'
                ], 401);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'content' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }


            $hasAccess = ParentClubAccess::where('user_id', $request->user()->id)
                ->where('has_access', true)
                ->exists();

            if (!$hasAccess) {
                return response()->json([
                    'success' => false,
                    'message' => 'Доступ запрещен. Требуется секретный код родительского клуба.'
                ], 403);
            }

            $topic = ForumTopic::create([
                'user_id' => $request->user()->id,
                'title' => $request->title,
                'content' => $request->content,
                'views' => 0,
                'is_pinned' => false,
                'is_locked' => false,
            ]);

            Log::info('Topic created successfully', ['topic_id' => $topic->id]);

            return response()->json([
                'success' => true,
                'data' => $topic,
                'message' => 'Тема успешно создана'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating topic: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при создании темы'
            ], 500);
        }
    }

    /**
     * Get single topic with posts
     */
    public function getTopic(Request $request, $id)
    {
        try {
            Log::info('Fetching topic', ['topic_id' => $id]);

            $topic = ForumTopic::with(['user', 'posts.user'])
                ->withCount('posts')
                ->findOrFail($id);


            $topic->increment('views');
            $topic->refresh();

            Log::info('Topic fetched successfully', ['topic_id' => $id]);

            return response()->json([
                'success' => true,
                'data' => $topic
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching topic: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при загрузке темы'
            ], 500);
        }
    }

    /**
     * Add post to topic
     */
    public function addPost(Request $request, $topicId)
    {
        try {
            Log::info('Adding post to topic', [
                'topic_id' => $topicId,
                'user_id' => $request->user()?->id
            ]);

            if (!$request->user()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Не авторизован'
                ], 401);
            }

            $validator = Validator::make($request->all(), [
                'content' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }

            $topic = ForumTopic::findOrFail($topicId);

            if ($topic->is_locked) {
                return response()->json([
                    'success' => false,
                    'message' => 'Тема закрыта для обсуждения'
                ], 403);
            }

            $post = ForumPost::create([
                'forum_topic_id' => $topicId,
                'user_id' => $request->user()->id,
                'content' => $request->content,
            ]);

            Log::info('Post added successfully', ['post_id' => $post->id]);

            return response()->json([
                'success' => true,
                'data' => $post->load('user'),
                'message' => 'Ответ добавлен'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error adding post: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при добавлении ответа'
            ], 500);
        }
    }

    /**
     * Delete topic (admin only or author)
     */
    public function deleteTopic(Request $request, $id)
    {
        try {
            Log::info('Deleting topic', [
                'topic_id' => $id,
                'user_id' => $request->user()?->id
            ]);

            if (!$request->user()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Не авторизован'
                ], 401);
            }

            $topic = ForumTopic::findOrFail($id);


            if ($request->user()->role !== 'admin' && $request->user()->id !== $topic->user_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Нет прав для удаления'
                ], 403);
            }

            $topic->delete();

            Log::info('Topic deleted successfully', ['topic_id' => $id]);

            return response()->json([
                'success' => true,
                'message' => 'Тема удалена'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting topic: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при удалении темы'
            ], 500);
        }
    }
}
