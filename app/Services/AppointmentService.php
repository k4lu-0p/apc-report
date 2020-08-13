<?php
namespace App\Services;

use App\Appointment;
use App\Customer;
use App\Http\Resources\AppointmentResource;
use App\Report;
use App\User;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;
use App\Services\SurveyService;
use Illuminate\Support\Facades\Log;

class AppointmentService {

    private $user = null;
    private $request = null;

    const FILTER_AUTHORIZED = [
        'CUSTOMER_NAME' => 'name',
        'APPOINTMENT_START_AT' => 'start_at',
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
     * Récupère le rendez-vous via son ID
     */
    public function getById(int $id)
    {
        if (empty($id)) {
            throw ValidationException::withMessages([
                'id' => ['id rendez-vous introuvable']
            ]);
        }

        $result = Appointment::find($id);

        if (empty($result)) {
            return response()->appointmentNotFound();
        }

        return new AppointmentResource($result);
    }

    /**
     * Supprime le rendez-vous et le rapport associé
     */
    public function deleteById(int $id)
    {
        if (empty($id)) {
            throw ValidationException::withMessages([
                'id' => ['id rendez-vous introuvable']
            ]);
        }

        $appointment = Appointment::find($id);
        $appointment->report->delete();
        $appointment->delete();

        return response()->appointmentReportDeleted();
    }

    /**
     * GET les appointments
     */
    private function getAll()
    {
        $result = Appointment::query()
            ->where('user_id', '=', $this->user->id)
            ->offset($this->request->offset)
            ->limit($this->request->limit)
            ->orderBy('created_at', 'desc')
            ->get();

        return AppointmentResource::collection($result);
    }

    private function getByCustomerName()
    {
        $result = Appointment::query()
            ->join('customers', 'customers.id', '=', 'appointments.customer_id')
            ->where('appointments.user_id', '=', $this->user->id)
            ->where('customers.name', 'LIKE', '%' . $this->request->value . '%')
            ->offset($this->request->offset)
            ->limit($this->request->limit)
            ->get('appointments.*');

        return AppointmentResource::collection($result);
    }

    private function getByDateStart()
    {
        $result = Appointment::query()
            ->where('appointments.user_id', '=', $this->user->id)
            ->whereDate('appointments.start_at', '=', $this->request->value)
            ->offset($this->request->offset)
            ->limit($this->request->limit)
            ->get();

        return AppointmentResource::collection($result);
    }

    public function create()
    {

        Log::debug('[AppointmentService/create()] 1. Création nouveau RDV par ' . $this->request->user()->name);
        Log::debug('[AppointmentService/create()] 1. Contenu de la requête ' . json_encode($this->request->all()));

        // handle date format
        $start_at = Carbon::create($this->request->start_at)->format('Y-m-d H:i:s');
        $finish_at = Carbon::create($this->request->finish_at)->format('Y-m-d H:i:s');

        Log::debug('[AppointmentService/create()] 2. start_at ' . $start_at);
        Log::debug('[AppointmentService/create()] 3. finish_at ' . $finish_at);

        // TODO: remove this
        $surveyService = new SurveyService();
        // create or search model to associate
        $appointment = new Appointment();
        $report = new Report();

        if ( (int) $this->request->customer['id'] !== 0) {
            $customer = Customer::find( (int) $this->request->customer['id']);
            Log::debug('[AppointmentService/create()] 4. customer connu :' . $customer->commercial_name);
        } else {
            $customer = new Customer();
            $customer->commercial_name = $this->request->customer['commercial_name'];
            $customer->leader_lastname = $this->request->customer['leader_lastname'];
            $customer->leader_firstname = $this->request->customer['leader_firstname'];
            $customer->address = $this->request->customer['address'];
            $customer->phone = $this->request->customer['phone'];
            $customer->email = $this->request->customer['email'];
            Log::debug('[AppointmentService/create()] 4. nouveau customer :' . $customer->commercial_name);
        }

        // fill report data
        $report->is_complete = false;
        $report->responses = $surveyService->getDefaultResponsesStringify();

        // fill appointment data
        $appointment->location = $this->request->location;
        $appointment->start_at = $start_at;
        $appointment->finish_at = $finish_at;
        $appointment->warning = $this->request->warning ?: '';

        // save
        $customer->save();
        $report->save();
        $appointment->save();

        // handle and save relations
        $appointment->report()->save($report); // has one
        $appointment->user()->associate($this->user); // belongs to
        $appointment->customer()->associate($customer); // belongs to

        $report->user()->associate($this->user); // belongs to
        $report->customer()->associate($customer); // belongs to
        $report->appointment()->associate($appointment); // belongs to

        $customer->reports()->save($report); // has many
        $customer->appointments()->save($appointment); // has many

        Log::debug('[AppointmentService/create()] 5. report lié : ' . $report->id);
        Log::debug('[AppointmentService/create()] 6. customer lié : ' . $customer->id);

        // succes response with appointment created
        return response()->newAppointmentStored($appointment);
    }

    public function updateById($id)
    {
        $appointment = Appointment::find($id);

        foreach ($this->request->all() as $key => $value) {
            if ($key === 'start_at' || $key === 'finish_at') {
                // handle date format
                $appointment->{$key} = Carbon::create($value)->format('Y-m-d H:i:s');
            } else {
                $appointment->{$key} = $value ?: $appointment->{$key};
            }

        }
        $appointment->save();
        return response()->appointmentUpdated($appointment);
    }

    /**
     * entry point des requêtes filtrées
     */
    public function handleFilteredRequest()
    {
        switch ($this->request->by) {
            case self::FILTER_AUTHORIZED['CUSTOMER_NAME'] :
                return $this->getByCustomerName();
                break;
            case self::FILTER_AUTHORIZED['APPOINTMENT_START_AT'] :
                return $this->getByDateStart();
                break;
            default:
                return $this->getAll();
                break;
        }
    }
}
