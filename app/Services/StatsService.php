<?php
namespace App\Services;

use App\Appointment;
use App\Http\Resources\AppointmentResource;
use App\User;
use Carbon\Carbon;

class StatsService {

    // Récupère les rendez-vous de l'utilisateur pour le mois courant
    public function getAppointmentsMonthly()
    {
        $currentMonth = now()->month;

        $appointments = Appointment::whereMonth('start_at', '=', $currentMonth)->get();

        return $appointments;
    }

}
