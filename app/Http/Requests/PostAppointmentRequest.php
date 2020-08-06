<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'customer.id' => ['required', 'numeric'],
            'customer.commercial_name' => ['required', 'string'],
            'customer.leader_firstname' => ['required', 'string'],
            'customer.leader_lastname' => ['required', 'string'],
            'customer.address' => ['required', 'json'],
            'customer.email' => ['required', 'string'],
            'customer.phone' => ['required', 'string'],
            'location' => ['required', 'json'],
            'start_at' => ['required', 'date'],
            'finish_at' => ['required', 'date'],
            'warning' => ['nullable', 'string'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'report_id.numeric' => 'Il semble y avoir un problème avec le questionnaire assigné au rendez-vous...',
            'report_id.unique' => 'Il semble y avoir un problème avec le questionnaire assigné au rendez-vous...',
            'customer_id.required' => 'Veuillez assigné un client à ce rendez-vous.',
            'customer_id.numeric' => 'Il semble y avoir un problème avec le client assigné au rendez-vous...',
            'start_at.required' => 'Veuillez définir une date de début pour ce rendez-vous',
            'start_at.date' => 'Le format de la date de début est invalide',
            'finish_at.required'=> 'Veuillez définir une date de fin pour ce rendez-vous',
            'finish_at.date' => 'Le format de la date de fin est invalide',
        ];
    }
}
