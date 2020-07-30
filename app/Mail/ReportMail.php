<?php

namespace App\Mail;

use App\Report;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReportMail extends Mailable
{
    use Queueable, SerializesModels;

    private Report $report;
    private User $user;

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
    public function build()
    {
        return $this->view('mails.report')
            ->with([
                'user' => $this->user->name,
                'responses' => $this->report->responses,
                'start_at' => $this->report->appointment->start_at,
                'finish_at' => $this->report->appointment->finish_at,
                'customer_name' => $this->report->customer->name,
            ]);
        ;
    }
}
