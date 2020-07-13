<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Appointment;
use Carbon\Carbon;

$factory->define(Appointment::class, function () {

    $faker = Faker\Factory::create('fr_FR');

    $start_at = $faker->dateTimeInInterval('now', '+ 5 days');
    $finish_at = Carbon::instance($start_at)->addHour();

    return [
        'report_id' => $faker->numberBetween(1, 10),
        'user_id' => $faker->numberBetween(1, 10),
        'customer_id' => $faker->numberBetween(1, 10),
        'title' => $faker->sentence(6, false),
        'location' => json_encode([
            'city' => $faker->city(),
            'postcode' => $faker->postcode(),
            'address' => $faker->address(),
            'country' => $faker->country(),
            'lat' => $faker->latitude(),
            'longitude' => $faker->longitude(),
        ]),
        'start_at' => $start_at,
        'finish_at' => $finish_at,
        'warning' => $faker->sentence(12, false),
    ];
});
