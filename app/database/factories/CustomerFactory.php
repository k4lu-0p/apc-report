<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Customer;
use Faker\Generator as Faker;

$factory->define(Customer::class, function (Faker $faker) {
    return [
        'commercial_name' => $faker->company . ' Courtage',
        'leader_lastname' => $faker->name,
        'leader_firstname' => $faker->name,
        'address' => json_encode([
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
        'phone' => "00.00.00.00.00",
        'email' => "lucas.robin@alphapluscourtage.fr",
        // 'email' => $faker->email,
    ];
});
