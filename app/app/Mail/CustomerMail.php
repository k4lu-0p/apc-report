<?php

namespace App\Mail;

use App\Customer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class CustomerMail extends Mailable
{
    use Queueable, SerializesModels;

    public $customer;
    public $subject;
    public $content;
    public $pdf;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Customer $customer, $subject, $content, $pdf)
    {
        $this->customer = $customer;
        $this->subject = $subject;
        $this->content = $content;
        $this->pdf = $pdf;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.customer')
            ->subject($this->subject)
            ->attach(public_path('uploads') . '/' . $this->pdf)
            ->with([
                'customer' => $this->customer,
                'content' => $this->content,
                'pdf' => $this->pdf,
            ]);

    }
}
