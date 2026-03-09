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

Route::prefix('v1')->group(function () {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);


    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/parent-club/check-access', [AuthController::class, 'checkParentClubAccess']);
        Route::get('/parent-club/has-access', [AuthController::class, 'hasParentClubAccess']);


        Route::get('/forum/topics', [ForumController::class, 'getTopics']);
        Route::post('/forum/topics', [ForumController::class, 'createTopic']);
        Route::get('/forum/topics/{id}', [ForumController::class, 'getTopic']);
        Route::post('/forum/topics/{id}/posts', [ForumController::class, 'addPost']);
        Route::delete('/forum/topics/{id}', [ForumController::class, 'deleteTopic']);


        Route::post('/news', [NewsController::class, 'store']);
        Route::put('/news/{id}', [NewsController::class, 'update']);
        Route::delete('/news/{id}', [NewsController::class, 'destroy']);


        Route::prefix('admin')->group(function () {
            Route::get('/reviews', [ReviewController::class, 'adminIndex']);
            Route::get('/reviews/{id}', [ReviewController::class, 'adminShow']);
            Route::put('/reviews/{id}', [ReviewController::class, 'adminUpdate']);
            Route::delete('/reviews/{id}', [ReviewController::class, 'adminDestroy']);
            Route::patch('/reviews/{id}/approve', [ReviewController::class, 'toggleApproval']);
        });
    });


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
