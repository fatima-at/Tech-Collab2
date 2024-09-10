<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => Hash::make('password'), 
            'bio' => $this->faker->sentence,
            'general_field' => $this->faker->randomElement(['Web Development', 'AI', 'Cybersecurity']),
            'profile_picture' => $this->faker->imageUrl(150, 150, 'people', true),
            'cv' => 'cvs/kD541z4RYb27WgBzkC9vf63xQPpu1zEhjSLAJyGj.pdf', 
            'linkedin_profile' => $this->faker->url,
            'email_verified' => true,
            'registration_completed' => true,
            'vector_id' => $this->faker->uuid,
        ];
    }
}
