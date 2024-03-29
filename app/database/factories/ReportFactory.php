<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Report;
use App\Services\SurveyService;
use Faker\Generator as Faker;

$factory->define(Report::class, function(Faker $faker) {

    $surveyService = new SurveyService();

    return [
        // 'user_id' => $faker->numberBetween(1, 10),
        'user_id' => App\User::where('email', 'lucas.robin@alphapluscourtage.fr')->first()->id,
        'appointment_id' => $faker->numberBetween(1, 10),
        'customer_id' => $faker->numberBetween(1, 10),
        'is_complete' => false,
        'responses' =>  $surveyService->getDefaultResponsesStringify(),
    ];
});
