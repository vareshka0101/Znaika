<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($programs);
    }

    public function show($id)
    {
        $program = Program::findOrFail($id);
        return response()->json($program);
    }
}
