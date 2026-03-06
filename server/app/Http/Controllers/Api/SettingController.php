<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function getContactInfo()
    {
        return response()->json([
            'phone' => Setting::get('contact_phone', '+7 (495) 666-33-99'),
            'email' => Setting::get('contact_email', 'hello@znaika.ru'),
            'address' => Setting::get('contact_address', 'ул. Весенняя, 15, г. Москва'),
            'work_hours' => Setting::get('work_hours', 'Пн-Пт: 9:00 - 18:00'),
            'telegram' => Setting::get('telegram_link', 'https://t.me/znaika_bot'),
            'vk' => Setting::get('vk_link', 'https://vk.com/'),
            'ok' => Setting::get('ok_link', 'https://ok.ru/')
        ]);
    }

    public function getSocialLinks()
    {
        return response()->json([
            'vk' => Setting::get('vk_link', 'https://vk.com/'),
            'ok' => Setting::get('ok_link', 'https://ok.ru/'),
            'telegram' => Setting::get('telegram_link', 'https://t.me/znaika_bot')
        ]);
    }
}
