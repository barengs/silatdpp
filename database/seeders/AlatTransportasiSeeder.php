<?php

namespace Database\Seeders;

use App\Models\AlatTransportasi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AlatTransportasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AlatTransportasi::create([
            'nama' => 'Roda 4',
            'jenis' => 'Mobil',
        ]);
    }

}
