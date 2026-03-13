<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ForumController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ClassRoomController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\PricingController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\AdminEventController;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

Route::prefix('v1')->group(function () {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/parent-club/check-access', [AuthController::class, 'checkParentClubAccess']);
        Route::get('/parent-club/has-access', [AuthController::class, 'hasParentClubAccess']);

        // ФОРУМ МАРШРУТЫ - ИСПРАВЛЕНО
        Route::get('/forum/topics', [ForumController::class, 'index']);
        Route::post('/forum/topics', [ForumController::class, 'store']);
        Route::get('/forum/topics/{id}', [ForumController::class, 'show']);
        Route::put('/forum/topics/{id}', [ForumController::class, 'updateTopic']); // ДОБАВЛЕНО для обновления темы
        Route::post('/forum/topics/{id}/posts', [ForumController::class, 'addPost']);
        Route::delete('/forum/topics/{id}', [ForumController::class, 'destroy']);

        // Маршруты для работы с постами
        Route::put('/forum/topics/{topicId}/posts/{postId}', [ForumController::class, 'updatePost']); // ДОБАВЛЕНО для обновления поста
        Route::delete('/forum/topics/{topicId}/posts/{postId}', [ForumController::class, 'deletePost']); // Удаление поста


        Route::post('/news', [NewsController::class, 'store']);
        Route::put('/news/{id}', [NewsController::class, 'update']);
        Route::delete('/news/{id}', [NewsController::class, 'destroy']);


        // админка
        Route::prefix('admin')->group(function () {
            Route::get('/reviews', [ReviewController::class, 'adminIndex']);
            Route::get('/reviews/{id}', [ReviewController::class, 'adminShow']);
            Route::put('/reviews/{id}', [ReviewController::class, 'adminUpdate']);
            Route::delete('/reviews/{id}', [ReviewController::class, 'adminDestroy']);
            Route::patch('/reviews/{id}/approve', [ReviewController::class, 'toggleApproval']);

            //админка для форума
            Route::prefix('forum')->group(function () {
                Route::patch('/topics/{id}/toggle-lock', [ForumController::class, 'toggleLock']);
                Route::patch('/topics/{id}/toggle-pin', [ForumController::class, 'togglePin']);
            });

            //  для мероприятий
            Route::get('/events', [AdminEventController::class, 'index']);
            Route::get('/events/upcoming', [AdminEventController::class, 'getUpcoming']);
            Route::get('/events/archive', [AdminEventController::class, 'getArchive']);
            Route::get('/events/{id}', [AdminEventController::class, 'show']);
            Route::post('/events', [AdminEventController::class, 'store']);
            Route::put('/events/{id}', [AdminEventController::class, 'update']);
            Route::delete('/events/{id}', [AdminEventController::class, 'destroy']);
            Route::patch('/events/{id}/toggle-active', [AdminEventController::class, 'toggleActive']);
        });
    });

    // всеобщие маршруты
    Route::post('/news/{id}/views', [NewsController::class, 'incrementViews']);
    Route::get('/teachers', [TeacherController::class, 'index']);
    Route::get('/teachers/{id}', [TeacherController::class, 'show']);
    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/upcoming', [EventController::class, 'upcoming']);
    Route::get('/events/archive', [EventController::class, 'archive']);
    Route::get('/events/{id}', [EventController::class, 'show']);
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/{id}', [NewsController::class, 'show']);
    Route::get('/reviews', [ReviewController::class, 'index']);
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::get('/class-rooms', [ClassRoomController::class, 'index']);
    Route::get('/class-rooms/{id}', [ClassRoomController::class, 'show']);
    Route::get('/menu', [MenuController::class, 'getAll']);
    Route::get('/menu/{day}', [MenuController::class, 'getByDay']);
    Route::get('/gallery', [GalleryController::class, 'index']);
    Route::get('/gallery/{category}', [GalleryController::class, 'getByCategory']);
    Route::post('/contact', [ContactController::class, 'submit']);
    Route::post('/registration', [ContactController::class, 'registration']);
    Route::post('/excursion', [ContactController::class, 'excursion']);
    Route::get('/programs', [ProgramController::class, 'index']);
    Route::get('/programs/{id}', [ProgramController::class, 'show']);
    Route::get('/pricing/plans', [PricingController::class, 'getPlans']);
    Route::get('/pricing/faqs', [PricingController::class, 'getFaqs']);
    Route::get('/settings/contact', [SettingController::class, 'getContactInfo']);
    Route::get('/settings/social', [SettingController::class, 'getSocialLinks']);
});

Route::get('/test-mail', function () {
    try {
        Mail::raw('Тестовое письмо', function ($message) {
            $message->to('vareshka0101@mail.ru')
                ->subject('Тест почты');
        });
        return response()->json(['success' => true, 'message' => 'Письмо отправлено']);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'error' => $e->getMessage()]);
    }
});


Route::get('/test-access', function (Request $request) {
    $token = $request->bearerToken();
    $user = $request->user();

    return response()->json([
        'has_token' => !is_null($token),
        'has_user' => !is_null($user),
        'user_id' => $user?->id,
        'user_role' => $user?->role,
        'headers' => $request->headers->all(),
    ]);
})->middleware('auth:sanctum');
