<?php

namespace App\Mail;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class StatsMail extends Mailable
{
    use Queueable, SerializesModels;

    public $current_month_year;
    public $csv_path;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($current_month_year, $csv_path)
    {
        $this->current_month_year = $current_month_year;
        $this->csv_path = $csv_path;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.stats')
            ->attach($this->csv_path)
            ->with([
                'current_month_year' => $this->current_month_year,
            ]);
    }
}
