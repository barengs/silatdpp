<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    protected $data;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->data = [
            ['name' => 'dapat menambah buku tamu', 'guard_name' => 'web'],
            ['name' => 'dapat mengubah buku tamu', 'guard_name' => 'web'],
            ['name' => 'dapat menghapus buku tamu', 'guard_name' => 'web'],
            ['name' => 'dapat menambah divisi', 'guard_name' => 'web'],
            ['name' => 'dapat mengubah divisi', 'guard_name' => 'web'],
            ['name' => 'dapat menghapus divisi', 'guard_name' => 'web'],
            ['name' => 'dapat menambah transportasi', 'guard_name' => 'web'],
            ['name' => 'dapat mengubah transportasi', 'guard_name' => 'web'],
            ['name' => 'dapat menghapus transportasi', 'guard_name' => 'web'],
            ['name' => 'dapat menambah institusi', 'guard_name' => 'web'],
            ['name' => 'dapat mengubah institusi', 'guard_name' => 'web'],
            ['name' => 'dapat menghapus institusi', 'guard_name' => 'web'],
            ['name' => 'dapat menambah rekanan', 'guard_name' => 'web'],
            ['name' => 'dapat mengubah rekanan', 'guard_name' => 'web'],
            ['name' => 'dapat menghapus rekanan', 'guard_name' => 'web'],
            ['name' => 'dapat menambah rekom', 'guard_name' => 'web'],
            ['name' => 'dapat mengubah rekom', 'guard_name' => 'web'],
            ['name' => 'dapat menghapus', 'guard_name' => 'web'],
            ['name' => 'dapat menambah biaya', 'guard_name' => 'web'],
            ['name' => 'dapat mengubah biaya', 'guard_name' => 'web'],
            ['name' => 'dapat menghapus biaya', 'guard_name' => 'web'],
            ['name' => 'dapat menambah karyawan', 'guard_name' => 'web'],
            ['name' => 'dapat mengubah karyawan', 'guard_name' => 'web'],
            ['name' => 'dapat menghapus karyawan', 'guard_name' => 'web'],
            ['name' => 'dapat menambah sppd', 'guard_name' => 'web'],
            ['name' => 'dapat mengubah sppd', 'guard_name' => 'web'],
            ['name' => 'dapat menghapus sppd', 'guard_name' => 'web'],
        ];

        foreach ($this->data as $value) {
            Permission::create($value);
        }
    }
}
