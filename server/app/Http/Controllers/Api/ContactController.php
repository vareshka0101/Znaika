<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'phone' => 'required|string|max:255',
            'message' => 'nullable|string'
        ]);

        $contact = Contact::create([
            'name' => $validated['name'] ?? null,
            'phone' => $validated['phone'],
            'message' => $validated['message'] ?? null,
            'type' => 'contact'
        ]);



        return response()->json(['message' => 'Form submitted successfully'], 201);
    }

    public function registration(Request $request)
    {
        $validated = $request->validate([
            'parentName' => 'required|string|max:255',
            'childName' => 'required|string|max:255',
            'childAge' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'preferredClass' => 'nullable|string|max:255',
            'message' => 'nullable|string'
        ]);

        $contact = Contact::create([
            'name' => $validated['parentName'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'message' => $validated['message'] ?? null,
            'type' => 'registration',
            'additional_data' => [
                'child_name' => $validated['childName'],
                'child_age' => $validated['childAge'],
                'preferred_class' => $validated['preferredClass'] ?? null
            ]
        ]);

        return response()->json(['message' => 'Registration submitted successfully'], 201);
    }

    public function excursion(Request $request)
    {
        $validated = $request->validate([
            'parentName' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'preferredDate' => 'nullable|string|max:255',
            'message' => 'nullable|string'
        ]);

        $contact = Contact::create([
            'name' => $validated['parentName'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'message' => $validated['message'] ?? null,
            'type' => 'excursion',
            'additional_data' => [
                'preferred_date' => $validated['preferredDate'] ?? null
            ]
        ]);

        return response()->json(['message' => 'Excursion request submitted successfully'], 201);
    }
}
