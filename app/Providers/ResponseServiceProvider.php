<?php

namespace App\Providers;

use App\Http\Resources\AppointmentResource;
use App\Http\Resources\ReportResource;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class ResponseServiceProvider extends ServiceProvider {

    public function boot() {
        // New Appointment created
        Response::macro('newAppointmentStored', function ($appointment) {

            $_appointment = new AppointmentResource($appointment);

            return Response::json([
                'http' => 201,
                'status' => 'succes',
                'message' => 'Rendez-vous créé avec succès.',
                'appointment' => $_appointment,
            ]);
        });


        // Report updated
        Response::macro('reportUpdated', function ($report) {

            $_report = new ReportResource($report);

            return Response::json([
                'http' => 204,
                'status' => 'succes',
                'message' => 'Rapport mis à jour avec succès.',
                'report' => $_report,
            ]);
        });

        // Report not found
        Response::macro('reportNotFound', function () {

            return Response::json([
                'http' => 404,
                'status' => 'report_not_found',
                'message' => 'Rapport introuvable.',
            ]);
        });

        // Appointment not found
        Response::macro('appointmentNotFound', function () {

            return Response::json([
                'http' => 404,
                'status' => 'appointment_not_found',
                'message' => 'Rendez-vous introuvable.',
            ]);
        });

        // Appointment not found
        Response::macro('customerDeleted', function () {

            return Response::json([
                'http' => 200,
                'status' => 'customer_deleted',
                'message' => 'Partenaire supprimé avec succès !',
            ]);
        });
    }
}
