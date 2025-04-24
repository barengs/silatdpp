<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserProfile;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => Carbon::now(),
        ]);

        UserProfile::create([
            'user_id' => $user->id,
            'first_name' => 'admin',
            'last_name' => 'admin',
            'nick_name' => 'min',
            'address' => 'sistem admin',
            'gender' => 'L',
        ]);

        $user->assignRole('superadmin');
    }
}
