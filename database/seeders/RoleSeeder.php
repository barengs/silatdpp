<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    protected $role;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->role = [
            ['name' => 'superadmin', 'guard_name' => 'web'],
            ['name' => 'administrasi', 'guard_name' => 'web'],
            ['name' => 'kabid', 'guard_name' => 'web'],
            ['name' => 'kadis', 'guard_name' => 'web'],
            ['name' => 'kasi', 'guard_name' => 'web'],
            ['name' => 'resepsionis', 'guard_name' => 'web'],
        ];

        foreach ($this->role as $role) {
            Role::create($role);
        }
    }
}
