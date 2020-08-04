<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Customer;
use App\Http\Requests\GetAppointmentsRequest;
use App\Http\Requests\PostAppointmentRequest;
use App\Report;
use App\Services\AppointmentService;
use App\Services\SurveyService;
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
    public function index(GetAppointmentsRequest $request, AppointmentService $appointmentService)
    {
        $appointmentService->setUserRequest($request);
        return $appointmentService->handleFilteredRequest();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostAppointmentRequest $request, AppointmentService $appointmentService)
    {
        $appointmentService->setUserRequest($request);
        return $appointmentService->create();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function show(AppointmentService $appointmentService, $id)
    {
        return $appointmentService->getById($id);
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
    public function destroy(AppointmentService $appointmentService, $id)
    {
        return $appointmentService->deleteById($id);
    }
}
