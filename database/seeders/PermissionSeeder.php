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
            ['name' => 'dapat menambah buku tamu'],
            ['name' => 'dapat mengubah buku tamu'],
            ['name' => 'dapat menghapus buku tamu'],
            ['name' => 'dapat menambah divisi'],
            ['name' => 'dapat mengubah divisi'],
            ['name' => 'dapat menghapus divisi'],
            ['name' => 'dapat menambah transportasi'],
            ['name' => 'dapat mengubah transportasi'],
            ['name' => 'dapat menghapus transportasi'],
            ['name' => 'dapat menambah institusi'],
            ['name' => 'dapat mengubah institusi'],
            ['name' => 'dapat menghapus institusi'],
            ['name' => 'dapat menambah rekanan'],
            ['name' => 'dapat mengubah rekanan'],
            ['name' => 'dapat menghapus rekanan'],
            ['name' => 'dapat menambah rekom'],
            ['name' => 'dapat mengubah rekom'],
            ['name' => 'dapat menghapus'],
            ['name' => 'dapat menambah biaya'],
            ['name' => 'dapat mengubah biaya'],
            ['name' => 'dapat menghapus biaya'],
            ['name' => 'dapat menambah karyawan'],
            ['name' => 'dapat mengubah karyawan'],
            ['name' => 'dapat menghapus karyawan'],
            ['name' => 'dapat menambah sppd'],
            ['name' => 'dapat mengubah sppd'],
            ['name' => 'dapat menghapus sppd'],
        ];

        foreach ($this->data as $value) {
            Permission::create($value);
        }
    }
}
