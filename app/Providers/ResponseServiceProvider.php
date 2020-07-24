<?php

namespace App\Providers;

use App\Http\Resources\AppointmentResource;
use App\Http\Resources\ReportResource;
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

        Response::macro('reportUpdated', function ($report) {

            $_report = new ReportResource($report);

            return Response::json([
                'http' => 204,
                'status' => 'succes',
                'message' => 'Rapport mis à jour avec succès.',
                'report' => $_report,
            ]);
        });
    }
}
