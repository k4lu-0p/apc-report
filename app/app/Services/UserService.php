<?php
namespace App\Services;

use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;

class UserService {

    private $user = null;
    private $request = null;

    const FILTER_AUTHORIZED = [
        'USER_NAME' => 'user_name',
        'USER_EMAIL' => 'user_email',
    ];

    public function setUserRequest($request) {
        // handle validations
        $validated = $request->validated();
        $hasValidParams = $this->handleWrongParameters();

        if ($hasValidParams === true) {
            $this->request = $request;
            $this->user = $request->user();
        }
    }

    /**
     * Vérifie si la valeur du $by paramètre est authorisée
     */
    private function handleWrongParameters()
    {
        if (isset($this->request->by) && in_array($this->request->by, self::FILTER_AUTHORIZED) === false) {
            $error = ValidationException::withMessages([
                'by' => ['filtre inconnu']
            ]);
            throw $error;
        }

        return true;
    }

    /**
     *  Récupère le rendez-vous via son ID
     */
    public function getById(int $id)
    {
        if (empty($id)) {
            throw ValidationException::withMessages([
                'id' => ['id utilisateur introuvable']
            ]);
        }

        $user = User::find($id);

        if (empty($user)) {
            return response()->userNotFound();
        }

        // revoke admin tokens for this user before create a new
        $tokensToDelete = $user->tokens->where('name', 'admin-token-' . $id);
        if (count($tokensToDelete) > 0) {
            foreach ($tokensToDelete as $tokenToDelete) {
                $tokenToDelete->delete();
            }
        }

        $newAdminToken = $user->createToken( 'admin-token-' . $id );

        $response = [
            'user' => new UserResource($user),
            'token' => $newAdminToken->plainTextToken
        ];

        return response($response, 200);
    }

    /**
     * GET les users
     */
    private function getAll()
    {
        $result = User::query()
            ->offset($this->request->offset)
            ->limit($this->request->limit)
            ->orderBy('name', 'asc')
            ->get();

        return UserResource::collection($result);
    }

    /**
     * GET recherche users par le nom
     */
    private function getByUserName()
    {
        $result = User::query()
            ->where('name', 'LIKE', '%' . $this->request->value . '%')
            ->offset($this->request->offset)
            ->limit($this->request->limit)
            ->get();

        return UserResource::collection($result);
    }

    /**
     * GET recherche users par l'email
     */
    private function getByUserEmail()
    {
        $result = User::query()
            ->where('email', 'LIKE', '%' . $this->request->value . '%')
            ->offset($this->request->offset)
            ->limit($this->request->limit)
            ->get();

        return UserResource::collection($result);
    }

    /**
     * entry point des requêtes filtrées
     */
    public function handleFilteredRequest()
    {
        switch ($this->request->by) {
            case self::FILTER_AUTHORIZED['USER_NAME'] :
                return $this->getByUserName();
                break;
            case self::FILTER_AUTHORIZED['USER_EMAIL'] :
                return $this->getByUserEmail();
                break;
            default:
                return $this->getAll();
                break;
        }
    }
}
