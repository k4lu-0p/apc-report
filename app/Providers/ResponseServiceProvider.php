<?php

namespace App\Providers;

use App\Http\Resources\AppointmentResource;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class ResponseServiceProvider extends ServiceProvider {

    public function boot() {
        Response::macro('newAppointmentStored', function ($appointment) {

            $_appointment = new AppointmentResource($appointment);

            return Response::json([
                'http' => 201,
                'status' => 'succes',
                'message' => 'Rendez-vous créé avec succès.',
                'appointment' => $_appointment,
            ]);
        });
    }
}
