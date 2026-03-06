<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::where('is_active', true)
            ->orderBy('category')
            ->orderBy('sort_order')
            ->get();

        return response()->json($galleries);
    }

    public function getByCategory($category)
    {
        $validCategories = ['holidays', 'classes', 'creativity', 'sport'];

        if (!in_array($category, $validCategories)) {
            return response()->json(['error' => 'Invalid category'], 400);
        }

        $galleries = Gallery::where('is_active', true)
            ->category($category)
            ->orderBy('sort_order')
            ->get();

        return response()->json($galleries);
    }
}
