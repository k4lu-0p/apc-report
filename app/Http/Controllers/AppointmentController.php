<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Customer;
use App\Http\Requests\StoreAppointment;
use App\Http\Resources\AppointmentResource;
use App\Report;
use App\Services\ReportSurveyService;
use App\User;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return AppointmentResource::collection($request->user()->appointments);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAppointment $request, ReportSurveyService $reportSurveyService)
    {
        // handle validations
        $validated = $request->validated();

        // handle date format
        $start_at = Carbon::create($request->start_at)->format('Y-m-d H:i:s');
        $finish_at = Carbon::create($request->finish_at)->format('Y-m-d H:i:s');

        // create or search model to associate
        $user = User::find($request->user()->id);
        $appointment = new Appointment();
        $report = new Report();
        $customer = Customer::find($request->customer_id);

        // fill report data
        $report->is_complete = false;
        $report->responses = $reportSurveyService->getDefaultResponsesStringify();

        // fill appointment data
        $appointment->title = $request->title;
        $appointment->location = $request->location;
        $appointment->start_at = $start_at;
        $appointment->finish_at = $finish_at;
        $appointment->warning = $request->warning ?: null;

        // save
        $report->save();
        $appointment->save();

        // handle and save relations
        $appointment->report()->save($report); // has one
        $appointment->user()->associate($user); // belongs to
        $appointment->customer()->associate($customer); // belongs to

        $report->user()->associate($user); // belongs to
        $report->customer()->associate($customer); // belongs to
        $report->appointment()->associate($appointment); // belongs to

        $customer->reports()->save($report); // has many
        $customer->appointments()->save($appointment); // has many

        // succes response with appointment created
        return response()->newAppointmentStored($appointment);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function show(Appointment $appointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Appointment $appointment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Appointment $appointment)
    {
        //
    }
}
