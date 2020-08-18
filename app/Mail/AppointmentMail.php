<?php

namespace App\Mail;

use App\Appointment;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Services\SurveyService;
use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;

class AppointmentMail extends Mailable
{
    use Queueable, SerializesModels;

    private Appointment $appointment;
    private User $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Appointment $appointment, User $user)
    {
        $this->appointment = $appointment;
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        $icalObject = Calendar::create('[APC] Rendez-vous Alpha Plus Courtage')
            ->event(
                Event::create('[APC] Rendez-vous avec ' . $this->user->name)
                    ->startsAt(new \DateTime($this->appointment->start_at))
                    ->endsAt(new \DateTime($this->appointment->finish_at))
                    ->createdAt(new \DateTime($this->appointment->created_at))
                    ->organizer( $this->user->email,  $this->user->name)
                    ->alertMinutesBefore(10, '[APC] Rendez-vous Alpha Plus Courtage')
                    ->uniqueIdentifier(uniqid())
            )
            ->get();

        return $this->view('mails.appointment')
            ->subject('[Alpha Plus Courtage] Rappel de rendez-vous avec ' . $this->user->name)
            ->attachData($icalObject, 'agenda.ics')
            ->with([
                'user' => $this->user->name,
                'location' => json_decode($this->appointment->location)->label,
                'start_at' => $this->appointment->start_at,
                'finish_at' => $this->appointment->finish_at,
                'customer_name' => $this->appointment->customer->commercial_name,
            ]);
        ;
    }
}
