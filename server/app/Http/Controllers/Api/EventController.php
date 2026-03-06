<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($events);
    }

    public function upcoming()
    {
        $events = Event::where('is_active', true)
            ->upcoming()
            ->orderBy('sort_order')
            ->get();

        return response()->json($events);
    }

    public function archive()
    {
        $events = Event::where('is_active', true)
            ->archive()
            ->orderBy('sort_order')
            ->get();

        return response()->json($events);
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);
        return response()->json($event);
    }
}
