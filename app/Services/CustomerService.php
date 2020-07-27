<?php
namespace App\Services;

use App\Customer;
use App\Http\Requests\GetCustomersRequest;
use App\Http\Resources\CustomerResource;
use App\User;
use Illuminate\Validation\ValidationException;

class CustomerService {

    private ?GetCustomersRequest $request = null;
    private ?User $user = null;

    const FILTER_AUTHORIZED = [
        'CUSTOMER_NAME' => 'name',
    ];

    public function __construct(GetCustomersRequest $request)
    {
    }

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
     * Permet de gérer les valeurs GET inconnus/interdis passé à by
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
     * Récupère le client via son ID
     */
    public function getById(int $id)
    {
        if (empty($id)) {
            throw ValidationException::withMessages([
                'id' => ['id customer introuvable']
            ]);
        }

        $result = Customer::find($id);
        return new CustomerResource($result);
    }

    /**
     * Récupère un ou plusieurs client au comparant la chaine entré dans la requête avec les noms des clients
     */
    private function getByName()
    {
        $result = Customer::query()
            ->where('name', 'LIKE', '%' . $this->request->value . '%')
            ->offset($this->request->offset)
            ->limit($this->request->limit)
            ->get();

        return CustomerResource::collection($result);
    }

     /**
     * GET les customers
     */
    private function getAll()
    {
        $result = Customer::query()
            ->offset($this->request->offset)
            ->limit($this->request->limit)
            ->get();

        return CustomerResource::collection($result);
    }


    /**
     *
     */
    public function handleFilteredRequest()
    {
        switch ($this->request->by) {
            case self::FILTER_AUTHORIZED['CUSTOMER_NAME'] :
                return $this->getByName();
                break;
            default :
                return $this->getAll();
                break;
        }
    }
}
