<?php

namespace App\Mail;

use App\Report;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Services\SurveyService;

class ReportMail extends Mailable
{
    use Queueable, SerializesModels;

    private $report;
    private $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Report $report, User $user)
    {
        $this->report = $report;
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(SurveyService $surveyService)
    {
        $responses = json_decode($this->report->responses);
        // $responses = $surveyService->humanReadableResponses($responses);

        return $this->view('mails.report')
            ->subject('[APC Report] Rapport de ' . $this->user->name)
            ->with([
                'user' => $this->user->name,
                'location' => json_decode($this->report->appointment->location)->label,
                'responses' => $responses,
                'start_at' => $this->report->appointment->start_at,
                'finish_at' => $this->report->appointment->finish_at,
                'customer_name' => $this->report->customer->commercial_name,
            ]);
        ;
    }
}
