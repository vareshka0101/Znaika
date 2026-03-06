<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::where('is_active', true)
            ->orderBy('date', 'desc')
            ->get();

        return response()->json($news);
    }

    public function show($id)
    {
        $news = News::findOrFail($id);


        $news->increment('views');

        return response()->json($news);
    }
}
