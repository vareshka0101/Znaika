<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ParentClubAccess;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Register a new user with validation
     */
    public function register(Request $request)
    {
        try {
            Log::info('Registration attempt', ['email' => $request->email]);

            // Кастомные сообщения об ошибках на русском
            $messages = [
                'name.required' => 'Имя обязательно для заполнения',
                'name.string' => 'Имя должно быть строкой',
                'name.max' => 'Имя не может быть длиннее 255 символов',
                'name.regex' => 'Имя может содержать только буквы, пробелы и дефисы',

                'email.required' => 'Email обязателен для заполнения',
                'email.email' => 'Введите корректный email адрес',
                'email.unique' => 'Пользователь с таким email уже существует',

                'password.required' => 'Пароль обязателен для заполнения',
                'password.min' => 'Пароль должен быть минимум 8 символов',
                'password.confirmed' => 'Пароли не совпадают',

                'phone.required' => 'Телефон обязателен для заполнения',
                'phone.regex' => 'Введите корректный номер телефона (например: +79991234567)',

                'childName.required' => 'Имя ребенка обязательно для заполнения',
                'childName.regex' => 'Имя ребенка может содержать только буквы, пробелы и дефисы',

                'childAge.required' => 'Возраст ребенка обязателен для заполнения',
            ];

            $validator = Validator::make($request->all(), [
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    'regex:/^[а-яА-ЯёЁa-zA-Z\s-]+$/u'
                ],
                'email' => 'required|string|email|max:255|unique:users',
                'password' => ['required', 'confirmed', Password::min(8)],
                'phone' => [
                    'required',
                    'string',
                    'max:20',
                    'regex:/^[\+][0-9]{1,3}[0-9]{10}$/'
                ],
                'childName' => [
                    'required',
                    'string',
                    'max:255',
                    'regex:/^[а-яА-ЯёЁa-zA-Z\s-]+$/u'
                ],
                'childAge' => 'required|string|max:50',
            ], $messages);

            if ($validator->fails()) {
                Log::warning('Registration validation failed', [
                    'errors' => $validator->errors()->toArray()
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Ошибка валидации',
                    'errors' => $validator->errors()
                ], 422);
            }


            $age = $request->childAge;
            if (!preg_match('/^[0-9]{1,2}\s*(лет|год|года)$/iu', $age)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ошибка валидации',
                    'errors' => [
                        'childAge' => ['Возраст должен быть указан в формате: "5 лет", "3 года" и т.д.']
                    ]
                ], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'child_name' => $request->childName,
                'child_age' => $request->childAge,
                'role' => 'parent',
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            Log::info('User registered successfully', ['user_id' => $user->id]);

            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $token,
                'message' => 'Регистрация успешна!'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Registration error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Ошибка при регистрации: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        try {
            Log::info('Login attempt', ['email' => $request->email]);

            $messages = [
                'email.required' => 'Email обязателен для заполнения',
                'email.email' => 'Введите корректный email адрес',
                'password.required' => 'Пароль обязателен для заполнения',
            ];

            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ], $messages);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ошибка валидации',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                Log::warning('Failed login attempt', ['email' => $request->email]);
                return response()->json([
                    'success' => false,
                    'message' => 'Неверный email или пароль'
                ], 401);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            Log::info('User logged in successfully', ['user_id' => $user->id]);

            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $token,
                'message' => 'Вход выполнен успешно!'
            ]);
        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Ошибка при входе: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            Log::info('User logged out', ['user_id' => $request->user()->id]);

            return response()->json([
                'success' => true,
                'message' => 'Выход выполнен успешно'
            ]);
        } catch (\Exception $e) {
            Log::error('Logout error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Ошибка при выходе'
            ], 500);
        }
    }

    /**
     * Get authenticated user
     */
    public function user(Request $request)
    {
        try {
            return response()->json($request->user());
        } catch (\Exception $e) {
            Log::error('Get user error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Ошибка получения данных пользователя'
            ], 500);
        }
    }

    /**
     * Check parent club access with secret code
     */
    public function checkParentClubAccess(Request $request)
    {
        try {
            Log::info('Checking parent club access', [
                'user' => $request->user()?->id,
                'code' => $request->secret_code
            ]);

            $validator = Validator::make($request->all(), [
                'secret_code' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }

            $validCodes = ['SECRET2026', 'DEMO2026'];

            if (in_array($request->secret_code, $validCodes)) {

                if ($request->user()) {
                    $access = ParentClubAccess::updateOrCreate(
                        ['user_id' => $request->user()->id],
                        [
                            'has_access' => true,
                            'accessed_at' => now()
                        ]
                    );

                    Log::info('Parent club access saved', [
                        'user_id' => $request->user()->id,
                        'access_id' => $access->id
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Доступ разрешен'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Неверный секретный код'
            ], 403);
        } catch (\Exception $e) {
            Log::error('Check parent club access error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Ошибка проверки доступа'
            ], 500);
        }
    }

    /**
     * Check if user has parent club access
     */
    public function hasParentClubAccess(Request $request)
    {
        try {
            if (!$request->user()) {
                Log::info('No user for parent club access check');
                return response()->json(['has_access' => false]);
            }

            $access = ParentClubAccess::where('user_id', $request->user()->id)
                ->where('has_access', true)
                ->first();

            Log::info('Parent club access check', [
                'user_id' => $request->user()->id,
                'has_access' => (bool)$access
            ]);

            return response()->json(['has_access' => (bool)$access]);
        } catch (\Exception $e) {
            Log::error('Has parent club access error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Ошибка проверки доступа'
            ], 500);
        }
    }
}
