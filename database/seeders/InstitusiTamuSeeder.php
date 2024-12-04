<?php

namespace Database\Seeders;

use App\Models\InstitusiTamu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstitusiTamuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        InstitusiTamu::create([
            'nama' => 'SDN Palengaan Daya I',
            'alamat' => 'Palengaan Daja, Kec. Palengaan',
            'kontak' => 'sdnpaldaya1@gmail.com'
        ]);
    }
}
