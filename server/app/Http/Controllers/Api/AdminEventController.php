<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AdminEventController extends Controller
{
    /**
     * Get all events (admin)
     */
    public function index(Request $request)
    {
        try {
            Log::info('Admin events index accessed by user: ' . $request->user()->id);
            Log::info('User role: ' . $request->user()->role);

            if ($request->user()->role !== 'admin') {
                return response()->json(['error' => 'Доступ запрещен'], 403);
            }

            $events = Event::orderBy('created_at', 'desc')->get();

            Log::info('Events found: ' . $events->count());

            return response()->json($events);
        } catch (\Exception $e) {
            Log::error('Admin events index error: ' . $e->getMessage());
            return response()->json(['error' => 'Ошибка загрузки мероприятий: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get upcoming events
     */
    public function getUpcoming(Request $request)
    {
        try {
            if ($request->user()->role !== 'admin') {
                return response()->json(['error' => 'Доступ запрещен'], 403);
            }

            $events = Event::where('type', 'upcoming')
                ->orderBy('event_date')
                ->orderBy('sort_order')
                ->get();

            return response()->json($events);
        } catch (\Exception $e) {
            Log::error('Admin getUpcoming error: ' . $e->getMessage());
            return response()->json(['error' => 'Ошибка загрузки мероприятий'], 500);
        }
    }

    /**
     * Get archive events
     */
    public function getArchive(Request $request)
    {
        try {
            if ($request->user()->role !== 'admin') {
                return response()->json(['error' => 'Доступ запрещен'], 403);
            }

            $events = Event::where('type', 'archive')
                ->orderBy('event_date', 'desc')
                ->orderBy('sort_order')
                ->get();

            return response()->json($events);
        } catch (\Exception $e) {
            Log::error('Admin getArchive error: ' . $e->getMessage());
            return response()->json(['error' => 'Ошибка загрузки мероприятий'], 500);
        }
    }

    /**
     * Get single event
     */
    public function show(Request $request, $id)
    {
        try {
            if ($request->user()->role !== 'admin') {
                return response()->json(['error' => 'Доступ запрещен'], 403);
            }

            $event = Event::findOrFail($id);
            return response()->json($event);
        } catch (\Exception $e) {
            Log::error('Admin show event error: ' . $e->getMessage());
            return response()->json(['error' => 'Мероприятие не найдено'], 404);
        }
    }

    /**
     * Create new event
     */
    public function store(Request $request)
    {
        try {
            if ($request->user()->role !== 'admin') {
                return response()->json(['error' => 'Доступ запрещен'], 403);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'type' => 'required|in:upcoming,archive',
                'event_date' => 'nullable|date',
                'time' => 'required|string|max:50',
                'duration' => 'nullable|string|max:50',
                'description' => 'nullable|string',
                'icon' => 'nullable|string|max:50',
                'sort_order' => 'nullable|integer',
                'is_active' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $event = Event::create([
                'title' => $request->title,
                'type' => $request->type,
                'event_date' => $request->event_date,
                'time' => $request->time,
                'duration' => $request->duration,
                'description' => $request->description,
                'icon' => $request->icon ?? 'FaCalendarCheck',
                'sort_order' => $request->sort_order ?? 0,
                'is_active' => $request->is_active ?? true,
            ]);

            Log::info('Event created successfully', ['event_id' => $event->id]);

            return response()->json([
                'success' => true,
                'data' => $event,
                'message' => 'Мероприятие успешно создано'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Admin store event error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при создании мероприятия: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 
     */
    public function update(Request $request, $id)
    {
        try {
            Log::info('Updating event', ['event_id' => $id, 'user_id' => $request->user()->id]);

            if ($request->user()->role !== 'admin') {
                return response()->json(['error' => 'Доступ запрещен'], 403);
            }

            $event = Event::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255',
                'type' => 'sometimes|required|in:upcoming,archive',
                'event_date' => 'nullable|date',
                'time' => 'sometimes|required|string|max:50',
                'duration' => 'nullable|string|max:50',
                'description' => 'nullable|string',
                'icon' => 'nullable|string|max:50',
                'sort_order' => 'nullable|integer',
                'is_active' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $event->update($request->all());

            Log::info('Event updated successfully', ['event_id' => $id]);

            return response()->json([
                'success' => true,
                'data' => $event,
                'message' => 'Мероприятие успешно обновлено'
            ]);
        } catch (\Exception $e) {
            Log::error('Admin update event error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при обновлении мероприятия: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete event
     */
    public function destroy(Request $request, $id)
    {
        try {
            Log::info('Deleting event', ['event_id' => $id, 'user_id' => $request->user()->id]);

            if ($request->user()->role !== 'admin') {
                return response()->json(['error' => 'Доступ запрещен'], 403);
            }

            $event = Event::findOrFail($id);
            $event->delete();

            Log::info('Event deleted successfully', ['event_id' => $id]);

            return response()->json([
                'success' => true,
                'message' => 'Мероприятие успешно удалено'
            ]);
        } catch (\Exception $e) {
            Log::error('Admin delete event error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при удалении мероприятия: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle event active status
     */
    public function toggleActive(Request $request, $id)
    {
        try {
            Log::info('Toggling event active status', ['event_id' => $id, 'user_id' => $request->user()->id]);

            if ($request->user()->role !== 'admin') {
                return response()->json(['error' => 'Доступ запрещен'], 403);
            }

            $event = Event::findOrFail($id);
            $event->is_active = !$event->is_active;
            $event->save();

            Log::info('Event active status toggled', [
                'event_id' => $id,
                'is_active' => $event->is_active
            ]);

            return response()->json([
                'success' => true,
                'data' => $event,
                'message' => $event->is_active ? 'Мероприятие опубликовано' : 'Мероприятие скрыто'
            ]);
        } catch (\Exception $e) {
            Log::error('Admin toggle active error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при изменении статуса: ' . $e->getMessage()
            ], 500);
        }
    }
}
