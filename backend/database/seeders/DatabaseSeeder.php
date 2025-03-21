<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ProjectsCollectionSeeder::class,
            UserSeeder::class, // Replace with the actual second seeder name
        ]);
    }
}
