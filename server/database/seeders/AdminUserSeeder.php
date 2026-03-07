<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        User::updateOrCreate(
            ['email' => 'admin@znaika.ru'],
            [
                'name' => 'Администратор',
                'password' => Hash::make('admin123'),
                'phone' => '+79991234567',
                'child_name' => 'Admin Child',
                'child_age' => '5 лет',
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('Admin user created successfully!');
    }
}
