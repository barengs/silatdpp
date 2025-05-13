<?php

namespace Database\Seeders;

use App\Models\History;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['nama' => 'pengajuan'],
            ['nama' => 'penanganan'],
            ['nama' => 'disetujui'],
        ];

        foreach ($data as $item){
            History::create($item);
        }
    }
}
