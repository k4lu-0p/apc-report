<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAppointment extends FormRequest
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
            'report_id' => ['nullable', 'numeric', 'unique:App\Report,id'],
            'customer_id' => ['required', 'numeric'],
            'title' => ['required', 'max:6'],
            'location' => ['required', 'json'],
            'start_at' => ['required', 'date'],
            'finish_at' => ['required', 'date'],
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
            'title.required' => 'Veuillez définir un titre pour ce rendez-vous.',
            'title.max' => 'Le titre ne doit pas dépasser 60 caractères.',
            'start_at.required' => 'Veuillez définir une date de début pour ce rendez-vous',
            'start_at.date' => 'Le format de la date de début est invalide',
            'finish_at.required'=> 'Veuillez définir une date de fin pour ce rendez-vous',
            'finish_at.date' => 'Le format de la date de fin est invalide',
        ];
    }
}
