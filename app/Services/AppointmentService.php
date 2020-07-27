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

class AppointmentService {

    private ?User $user = null;
    private $request = null;

    const FILTER_AUTHORIZED = [
        'CUSTOMER_NAME' => 'name',
        'APPOINTMENT_START_AT' => 'start_at',
    ];

    public function __construct()
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
                'id' => ['id appointment introuvable']
            ]);
        }

        $result = Appointment::find($id);
        return new AppointmentResource($result);
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

    public function create() {
        // handle date format
        $start_at = Carbon::create($this->request->start_at)->format('Y-m-d H:i:s');
        $finish_at = Carbon::create($this->request->finish_at)->format('Y-m-d H:i:s');

        // TODO: remove this
        $surveyService = new SurveyService();

        // create or search model to associate
        $appointment = new Appointment();
        $report = new Report();
        $customer = Customer::find($this->request->customer_id);

        // fill report data
        $report->is_complete = false;
        $report->responses = $surveyService->getDefaultResponsesStringify();

        // fill appointment data
        $appointment->title = $this->request->title;
        $appointment->location = $this->request->location;
        $appointment->start_at = $start_at;
        $appointment->finish_at = $finish_at;
        $appointment->warning = $this->request->warning ?: null;

        // save
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

        // succes response with appointment created
        return response()->newAppointmentStored($appointment);
    }


     /**
     *
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
