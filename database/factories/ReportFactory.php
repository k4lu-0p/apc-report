<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Report;
use Faker\Generator as Faker;

$factory->define(Report::class, function (Faker $faker) {
    return [
        'user_id' => $faker->numberBetween(1, 10),
        'customer_id' => $faker->numberBetween(1, 10),
        'content' => $faker->text,
    ];
});
