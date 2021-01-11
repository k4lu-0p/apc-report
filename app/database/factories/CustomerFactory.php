<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Customer;
use Faker\Generator as Faker;

$factory->define(Customer::class, function (Faker $faker) {
    return [
        'commercial_name' => $faker->name,
        'leader_lastname' => $faker->name,
        'leader_firstname' => $faker->name,
        'address' => json_encode([
            'city' => $faker->city(),
            'postcode' => $faker->postcode(),
            'address' => $faker->address(),
            'country' => $faker->country(),
            'lat' => $faker->latitude(),
            'longitude' => $faker->longitude(),
        ]),
        'phone' => "00.00.00.00.00",
        'email' => $faker->mail,
    ];
});
