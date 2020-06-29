<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SecurityController extends Controller
{
    public function login(Request $request) {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        // Vérification des informations d'authentification
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => ['Nom d\'utilisateur ou mot de passe incorrecte.']
            ], 404);
        }

        /**
         * Supprime les anciens token de l'utilisateur afin d'éviter de spam la BDD
         * à chaques connexion de l'utilisateur.
         **/
        $user->tokens()->delete();

        // Créer, lier puis enregistrer un token pour l'utilisateur.
        $token = $user->createToken(Str::random(5))->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }
}
