<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use Illuminate\Http\Request;

class ClassRoomController extends Controller
{
    public function index()
    {
        $classRooms = ClassRoom::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($classRooms);
    }

    public function show($id)
    {
        $classRoom = ClassRoom::findOrFail($id);
        return response()->json($classRoom);
    }
}
