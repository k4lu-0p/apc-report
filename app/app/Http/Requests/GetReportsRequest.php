<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetReportsRequest extends FormRequest
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
            'by' => ['nullable'],
            'value' => ['nullable'],
            'limit' => ['required', 'numeric'],
            'offset' => ['required', 'numeric'],
            'responses' => ['nullable', 'json'],
        ];
    }
}
