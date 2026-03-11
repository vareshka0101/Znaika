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
    public function index(Request $request)
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
    public function store(Request $request)
    {
        try {
            Log::info('Creating new topic', [
                'user_id' => $request->user()?->id,
                'title' => $request->title
            ]);

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
                    'message' => 'Ошибка валидации',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Проверка доступа к родительскому клубу
            $hasAccess = ParentClubAccess::where('user_id', $request->user()->id)
                ->where('has_access', true)
                ->exists();

            // Администраторы имеют доступ без кода
            if ($request->user()->role !== 'admin' && !$hasAccess) {
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

            // Загружаем пользователя для ответа
            $topic->load('user');

            Log::info('Topic created successfully', ['topic_id' => $topic->id]);

            return response()->json([
                'success' => true,
                'data' => $topic,
                'message' => 'Тема успешно создана'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating topic: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Ошибка при создании темы: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get single topic with posts
     */
    public function show(Request $request, $id)
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
    public function destroy(Request $request, $id)
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

    /**
     * Delete a post (admin or author)
     */
    public function deletePost(Request $request, $topicId, $postId)
    {
        try {
            Log::info('Deleting post', [
                'topic_id' => $topicId,
                'post_id' => $postId,
                'user_id' => $request->user()?->id
            ]);

            if (!$request->user()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Не авторизован'
                ], 401);
            }

            $post = ForumPost::where('id', $postId)
                ->where('forum_topic_id', $topicId)
                ->firstOrFail();

            if ($request->user()->role !== 'admin' && $request->user()->id !== $post->user_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Нет прав для удаления этого сообщения'
                ], 403);
            }

            $post->delete();

            Log::info('Post deleted successfully', ['post_id' => $postId]);

            return response()->json([
                'success' => true,
                'message' => 'Сообщение удалено'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting post: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при удалении сообщения'
            ], 500);
        }
    }

    /**
     * Update a post (admin or author)
     */
    public function updatePost(Request $request, $topicId, $postId)
    {
        try {
            Log::info('Updating post', [
                'topic_id' => $topicId,
                'post_id' => $postId,
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

            $post = ForumPost::where('id', $postId)
                ->where('forum_topic_id', $topicId)
                ->firstOrFail();

            // Проверка прав: администратор или автор поста
            if ($request->user()->role !== 'admin' && $request->user()->id !== $post->user_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Нет прав для редактирования этого сообщения'
                ], 403);
            }

            $post->content = $request->content;
            $post->save();

            // Загружаем пользователя для ответа
            $post->load('user');

            Log::info('Post updated successfully', ['post_id' => $postId]);

            return response()->json([
                'success' => true,
                'data' => $post,
                'message' => 'Сообщение обновлено'
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating post: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при обновлении сообщения'
            ], 500);
        }
    }

    /**
     * Toggle topic lock status (admin only)
     */
    public function toggleLock(Request $request, $id)
    {
        try {
            Log::info('Toggling topic lock', [
                'topic_id' => $id,
                'user_id' => $request->user()?->id
            ]);

            if (!$request->user() || $request->user()->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'Доступ запрещен'
                ], 403);
            }

            $topic = ForumTopic::findOrFail($id);
            $topic->is_locked = !$topic->is_locked;
            $topic->save();

            Log::info('Topic lock toggled successfully', [
                'topic_id' => $id,
                'is_locked' => $topic->is_locked
            ]);

            return response()->json([
                'success' => true,
                'data' => $topic,
                'message' => $topic->is_locked ? 'Тема заблокирована' : 'Тема разблокирована'
            ]);
        } catch (\Exception $e) {
            Log::error('Error toggling lock: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при изменении статуса блокировки'
            ], 500);
        }
    }

    /**
     * Toggle topic pin status (admin only)
     */
    public function togglePin(Request $request, $id)
    {
        try {
            Log::info('Toggling topic pin', [
                'topic_id' => $id,
                'user_id' => $request->user()?->id
            ]);

            if (!$request->user() || $request->user()->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'Доступ запрещен'
                ], 403);
            }

            $topic = ForumTopic::findOrFail($id);
            $topic->is_pinned = !$topic->is_pinned;
            $topic->save();

            Log::info('Topic pin toggled successfully', [
                'topic_id' => $id,
                'is_pinned' => $topic->is_pinned
            ]);

            return response()->json([
                'success' => true,
                'data' => $topic,
                'message' => $topic->is_pinned ? 'Тема закреплена' : 'Тема откреплена'
            ]);
        } catch (\Exception $e) {
            Log::error('Error toggling pin: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при изменении статуса закрепления'
            ], 500);
        }
    }


    public function updateTopic(Request $request, $id)
    {
        try {
            Log::info('Updating topic', [
                'topic_id' => $id,
                'user_id' => $request->user()?->id
            ]);

            if (!$request->user()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Не авторизован'
                ], 401);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|string|max:255',
                'content' => 'sometimes|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }

            $topic = ForumTopic::findOrFail($id);

            // Проверка прав: администратор или автор темы
            if ($request->user()->role !== 'admin' && $request->user()->id !== $topic->user_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Нет прав для редактирования этой темы'
                ], 403);
            }

            // Обновляем только переданные поля
            if ($request->has('title')) {
                $topic->title = $request->title;
            }
            if ($request->has('content')) {
                $topic->content = $request->content;
            }

            $topic->save();

            // Загружаем пользователя для ответа
            $topic->load('user');

            Log::info('Topic updated successfully', ['topic_id' => $id]);

            return response()->json([
                'success' => true,
                'data' => $topic,
                'message' => 'Тема успешно обновлена'
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating topic: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при обновлении темы'
            ], 500);
        }
    }
}
