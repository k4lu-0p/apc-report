<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Appointment;
use Carbon\Carbon;

$factory->define(Appointment::class, function () {

    $faker = Faker\Factory::create('fr_FR');

    $start_at = $faker->dateTimeInInterval('now', '+ 5 days');
    $finish_at = Carbon::instance($start_at)->addHour();

    return [
        // 'user_id' => $faker->numberBetween(1, 10),
        'user_id' => App\User::where('email', 'lucas.robin@alphapluscourtage.fr')->first()->id,
        'customer_id' => $faker->numberBetween(1, 10),
        'start_at' => $start_at,
        'finish_at' => $finish_at,
        'warning' => $faker->sentence(12, false),
        'location' => json_encode([
            'label' => 'France, Vesoul, 4 Rue de la Banque',
            'address' => [
                'city' => 'Vesoul',
                'state' => 'Bourgogne-Franche-Comté',
                'county' => 'Haute-Saône',
                'street' => 'Rue de la Banque',
                'country' => 'France',
                'postalCode' => '70000',
                'houseNumber' => '4',
            ],
            'language' => 'fr',
            'locationId' => '',
            'matchLevel' => 'houseNumber',
            'countryCode' => 'FRA',
        ]),
    ];
});

