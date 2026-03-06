<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function getByDay($day)
    {
        $validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

        if (!in_array($day, $validDays)) {
            return response()->json(['error' => 'Invalid day'], 400);
        }

        $menuItems = MenuItem::where('is_active', true)
            ->where('day', $day)
            ->orderBy('category')
            ->orderBy('sort_order')
            ->get()
            ->groupBy('category');

        return response()->json($menuItems);
    }

    public function getAll()
    {
        $menuItems = MenuItem::where('is_active', true)
            ->orderBy('day')
            ->orderBy('category')
            ->orderBy('sort_order')
            ->get()
            ->groupBy('day');

        return response()->json($menuItems);
    }
}
