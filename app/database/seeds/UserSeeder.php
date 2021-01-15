<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'J.Pheulpin',
            'email' => 'jpheulpin@ymail.com',
            'password' => Hash::make('apc'),
            'roles' => ["ROLE_ADMIN"],
        ]);

        User::create([
            'name' => 'Mario Silveri',
            'email' => 'mario.silveri@alphapluscourtage.fr',
            'password' => Hash::make('apc'),
            'roles' => ["ROLE_USER"],
        ]);

        return User::create([
            'name' => 'Lucas Robin',
            'email' => 'lucas.robin@alphapluscourtage.fr',
            'password' => Hash::make('lucas@1994'),
            'roles' => ["ROLE_ADMIN"],
        ]);
    }
}
