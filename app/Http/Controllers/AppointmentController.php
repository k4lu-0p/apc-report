<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Http\Requests\StoreAppointment;
use App\Http\Resources\AppointmentResource;
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
    public function store(StoreAppointment $request)
    {
        $validated = $request->validated();

        // Handle date format
        $start_at = Carbon::create($request->start_at)->format('Y-m-d H:i:s');
        $finish_at = Carbon::create($request->finish_at)->format('Y-m-d H:i:s');

        $appointment = new Appointment();

        $appointment->report_id = $request->report_id ?: 0;
        $appointment->user_id = $request->user()->id;
        $appointment->customer_id = $request->customer_id;
        $appointment->title = $request->title;
        $appointment->location = $request->location;
        $appointment->start_at = $start_at;
        $appointment->finish_at = $finish_at;
        $appointment->warning = $request->warning ?: null;

        $appointment->save();

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
     * Show the form for editing the specified resource.
     *
     * @param  \App\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function edit(Appointment $appointment)
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
