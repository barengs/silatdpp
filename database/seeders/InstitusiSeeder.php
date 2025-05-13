<?php

namespace Database\Seeders;

use App\Models\Institusi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstitusiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Institusi::create([
            'nama' => 'SDN Palengaan Daya I',
            'alamat' => 'Palengaan Daja, Kec. Palengaan',
            'kontak' => 'sdnpaldaya1@gmail.com'
        ]);
    }
}
