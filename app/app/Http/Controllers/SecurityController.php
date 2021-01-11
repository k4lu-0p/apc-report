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

        // supprimer les anciens tokens utilisateur
        $tokensToDelete = $user->tokens->where('name', 'user-token-' . $user->id);
        if (count($tokensToDelete) > 0) {
            foreach ($tokensToDelete as $tokenToDelete) {
                $tokenToDelete->delete();
            }
        }

        // Créer, lier puis enregistrer un token pour l'utilisateur.
        $token = $user->createToken( 'user-token-' . $user->id )->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }
}
