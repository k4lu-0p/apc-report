<?php

namespace App\Console\Commands;

use App\Mail\StatsMail;
use App\Services\StatsService;
use App\Services\SurveyService;
use App\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SendMonthStatsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:month:stats';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envoi une synthèse des rendez-vous du mois courant de tous les collaborateurs.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(StatsService $statsService, SurveyService $surveyService)
    {

        $appointmentsMonthly = $statsService->getAppointmentsMonthly();
        $current_month_year = Carbon::now()->locale('fr_FR')->format('F Y');

        $csv_name = Str::snake($current_month_year) . '-' . uniqid() . '.csv';
        $csv_path = storage_path("app/$csv_name");

        $fichier_csv = fopen($csv_path, "w+"); // Créer un .csv dans le dossier storage

        fprintf($fichier_csv, chr(0xEF).chr(0xBB).chr(0xBF)); // Fix le problème encodage utf-8

        // En-tête du tableau (Ordre important)
        $header = [
            'RDV',
            'Rapport',
            'Collaborateur',
            'Partenaire',
            'Date',
            'Heure de debut',
            'Heure de fin',
            'Lieu',
            'Profile',
            'Nature RDV',
            'Qualité Réception',
            'Volumétrie',
            'Production future',
            'Qualité RDV',
            'Demo Extranet',
            'Présentation APC',
            'Exemple auto',
            'Plaquette',
        ];

        fputcsv($fichier_csv, $header, ";"); // Insérer l'en-tête du tableau en première ligne

        foreach ($appointmentsMonthly as $appointment) { // Parcourir les RDV du mois

            $locationLabel = json_decode($appointment->location)->label;
            $responses = json_decode($appointment->report->responses);

            $responses = $surveyService->humanReadableResponses($responses); // Rendre les réponse du questionnaire lisible par un humain

            // Contenu de la ligne pour le RDV courant à insérer dans le .csv (Ordre important)
            $row = [
                array_key_exists('abort_reason', $responses) > 0 ? $responses['abort_reason']['response'] : '',
                $appointment->report->is_complete ? 'Oui' : 'Non',
                $appointment->user->name ?: '',
                $appointment->customer->commercial_name ?: '',
                Carbon::create($appointment->start_at)->format('Y-m-d') ?: '',
                Carbon::create($appointment->start_at)->format('H:i:s') ?: '',
                Carbon::create($appointment->finish_at)->format('H:i:s') ?: '',
                $locationLabel ?: '',
                $appointment->report->is_complete ? implode(', ', $responses['profile']['responses']) : '',
                $appointment->report->is_complete ? $responses['subject']['response'] : '',
                $appointment->report->is_complete ? $responses['reception']['response'] : '',
                $appointment->report->is_complete ? $responses['monthly_volume']['response'] : '',
                $appointment->report->is_complete ? implode(', ', $responses['products_evoked']['responses']) : '',
                $appointment->report->is_complete ? $responses['appointment_quality']['response'] : '',
                $appointment->report->is_complete ? $responses['has_showed_extranet']['response'] : '',
                $appointment->report->is_complete ? $responses['has_described_society']['response'] : '',
                $appointment->report->is_complete ? $responses['has_showed_automotive_pricing']['response'] : '',
                $appointment->report->is_complete ? $responses['has_distributed_visual_support']['response'] : '',
            ];

            fputcsv($fichier_csv, $row, ";"); // Insertion dans le .csv
        }

        fclose($fichier_csv); // Fermeture du fichier .csv

        $admins = User::where('roles', '["ROLE_ADMIN"]')->get();

        // Envoi uniquement aux admins
        // foreach ($admins as $admin) {
        //     Mail::to($admin->email)->queue(new StatsMail($current_month_year, $csv_path));
        // }

        Mail::to('lucas.rob1@live.fr')->queue(new StatsMail($current_month_year, $csv_path));

    }
}
