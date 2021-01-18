<?php

use Illuminate\Database\Seeder;
use App\Report;
use App\Customer;
use App\Services\SurveyService;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        return factory(App\Appointment::class, 20)->create()->each(function ($appointment) {

            $surveyService = new SurveyService();
            $report = new Report();
            $customer = Customer::find(random_int(1, 10));

            $report->user_id = App\User::where('email', 'lucas.robin@alphapluscourtage.fr')->first()->id;
            $report->appointment_id = $appointment->id;
            $report->customer_id = $customer->id;
            $report->is_complete = false;
            $report->responses = $surveyService->getDefaultResponsesStringify();

            $report->save();

        });
    }
}
