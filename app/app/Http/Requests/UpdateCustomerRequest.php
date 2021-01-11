<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomerRequest extends FormRequest {
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
            'commercial_name' => ['required', 'string'],
            'leader_firstname' => ['required', 'string'],
            'leader_lastname' => ['required', 'string'],
            'address' => ['required', 'json'],
            'email' => ['required', 'string'],
            'phone' => ['required', 'string'],
        ];
    }
}
