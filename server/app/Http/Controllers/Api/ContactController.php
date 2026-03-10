<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        try {
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

            // Отправка email
            Mail::to('vareshka0101@mail.ru')->send(new ContactFormMail([
                'name' => $validated['name'] ?? 'Не указано',
                'phone' => $validated['phone'],
                'message' => $validated['message'] ?? null,
            ], 'contact'));

            Log::info('Contact form submitted', ['id' => $contact->id]);

            return response()->json([
                'success' => true,
                'message' => 'Форма отправлена! Мы свяжемся с вами в ближайшее время.'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Contact form error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при отправке формы'
            ], 500);
        }
    }

    public function registration(Request $request)
    {
        try {
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

            // Отправка email
            Mail::to('vareshka0101@mail.ru')->send(new ContactFormMail([
                'name' => $validated['parentName'],
                'phone' => $validated['phone'],
                'email' => $validated['email'] ?? null,
                'message' => $validated['message'] ?? null,
                'additional_data' => [
                    'child_name' => $validated['childName'],
                    'child_age' => $validated['childAge'],
                    'preferred_class' => $validated['preferredClass'] ?? null
                ]
            ], 'registration'));

            Log::info('Registration form submitted', ['id' => $contact->id]);

            return response()->json([
                'success' => true,
                'message' => 'Спасибо за заявку! Мы свяжемся с вами в ближайшее время.'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Registration error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при отправке заявки'
            ], 500);
        }
    }

    public function excursion(Request $request)
    {
        try {
            $validated = $request->validate([
                'parentName' => 'required|string|max:255',
                'phone' => 'required|string|max:255',
                'email' => 'nullable|email|max:255',
                'message' => 'nullable|string'
            ]);

            $contact = Contact::create([
                'name' => $validated['parentName'],
                'phone' => $validated['phone'],
                'email' => $validated['email'] ?? null,
                'message' => $validated['message'] ?? null,
                'type' => 'excursion',
                'additional_data' => []
            ]);

            // Отправка email
            Mail::to('vareshka0101@mail.ru')->send(new ContactFormMail([
                'name' => $validated['parentName'],
                'phone' => $validated['phone'],
                'email' => $validated['email'] ?? null,
                'message' => $validated['message'] ?? null,
                'additional_data' => []
            ], 'excursion'));

            Log::info('Excursion form submitted', ['id' => $contact->id]);

            return response()->json([
                'success' => true,
                'message' => 'Спасибо за запись на экскурсию! Мы свяжемся с вами для подтверждения.'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Excursion error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при отправке заявки'
            ], 500);
        }
    }
}
