<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Report;
use App\Services\ReportSurveyService;
use Faker\Generator as Faker;

$factory->define(Report::class, function(Faker $faker, ReportSurveyService $reportSurveyService) {
    return [
        'appointment_id' => $faker->numberBetween(1, 10),
        'user_id' => $faker->numberBetween(1, 10),
        'customer_id' => $faker->numberBetween(1, 10),
        'is_complete' => false,
        'responses' =>  $reportSurveyService->getDefaultResponsesStringify(),
    ];
});
