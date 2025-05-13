<?php

namespace Database\Seeders;

use App\Models\Biaya;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BiayaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Biaya::create([
            'name' => 'Dalam Kota',
        ]);
    }
}
