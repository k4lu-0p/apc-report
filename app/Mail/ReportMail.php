<?php

namespace App\Mail;

use App\Report;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReportMail extends Mailable
{
    use Queueable, SerializesModels;

    private Report $report;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Report $report)
    {
        $this->report = $report;
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
                'user' => $this->report->user()->name,
                'responses' => $this->report->responses,
                'start_at' => $this->report->appointment()->start_at,
                'finish_at' => $this->report->appointment()->finish_at,
                'customer_name' => $this->report->customer()->name,
            ]);
        ;
    }
}
