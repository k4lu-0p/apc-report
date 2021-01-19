<?php
namespace App\Services;

use App\Customer;
use App\Mail\CustomerMail;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class NewsletterService {

    private $user = null;
    private $request = null;

    public function setUserRequest($request) {
        // handle validations
        $validated = $request->validated();
        $this->request = $request;
        $this->user = $request->user();
    }

    /** envoi massif d'une newsletter à tous les customers */
    public function publishToAllCustomers() {

        $customers = Customer::all();
        $subject = $this->request->subject ?: null;
        $content = $this->request->content ?: null;
        $attachment = $this->request->attachment ?: null;

        if (!isset($subject, $content, $attachment)) {
            return response([ 'message' => 'empty parameters'], 400);
        }

        // upload du pdf
        $fileId = count(File::files(public_path('uploads'))) + 1;
        $pdf = $fileId . '-alpha-plus-courtage.' . 'pdf';
        $attachment->move(public_path('uploads'), $pdf);

        if (!empty($customers)) {
            // send an email to the owner of this newsletter
            Mail::to($this->request->user()->email)->send(new CustomerMail($customers[0], $subject, $content, $pdf));

            // send the same email to specific email for watch activity
            $additional_recipients = [ 'lucas.robin@alphapluscourtage.fr' ];
            if (env('APP_DEBUG', true) === false) {
                $additional_recipients = array_merge($additional_recipients, [
                    'gilles.gavoille@i2fc.fr',
                    'jpheulpin@ymail.com',
                ]);
            }

            foreach ($additional_recipients as $recipient) {
                Mail::to($recipient)->send(new CustomerMail($customers[0], $subject, $content, $pdf));
            }

            // mise en file d'attente de l'envoi
            foreach ($customers as $customer) {
                $to = $customer->email;
                Mail::to($to)->queue(new CustomerMail($customer, $subject, $content, $pdf));
            }

            return response([ 'message' => 'success' ], 200);

        }

        return response([ 'message' => 'failed' ], 500);

    }

}
