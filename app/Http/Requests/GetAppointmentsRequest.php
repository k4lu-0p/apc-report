<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetAppointmentsRequest extends FormRequest
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
            'report_status' => ['nullable', 'string'],
            'commercial_name' => ['nullable', 'string'],
            'period' => ['nullable'],
            'limit' => ['required', 'numeric'],
            'offset' => ['required', 'numeric'],
        ];
    }
}
