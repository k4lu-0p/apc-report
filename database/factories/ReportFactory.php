<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Report;
use Faker\Generator as Faker;

function generateSurvey(Faker $faker): string {
    $survey = [
        'profile' => $faker->randomElement(['agency', 'firm']),
        'reception' => $faker->randomElement([1, 2, 3]),
        'subject' => $faker->randomElement(['new_partner', 'routine_visit']),
        'has_described_society' => $faker->boolean(),
        'has_showed_extranet' => $faker->boolean(),
        'has_showed_automotive_pricing' =>  $faker->boolean(),
        'has_distributed_visual_support' =>  $faker->boolean(),
        'appointment_quality' => $faker->randomElement([1, 2, 3]),
        'products_evoked' => [
            'auto' =>  $faker->boolean(),
            'housing' =>  $faker->boolean(),
            'moto' =>  $faker->boolean(),
            'health' =>  $faker->boolean(),
            'juridic' =>  $faker->boolean(),
            'life' =>  $faker->boolean(),
        ],
        'monthly_volume' => $faker->randomElement([1, 2, 3, 4]),
    ];

    return json_encode($survey);
}

$factory->define(Report::class, function(Faker $faker) {
    return [
        'appointment_id' => $faker->numberBetween(1, 10),
        'user_id' => $faker->numberBetween(1, 10),
        'customer_id' => $faker->numberBetween(1, 10),
        'survey' => generateSurvey($faker),
    ];
});
