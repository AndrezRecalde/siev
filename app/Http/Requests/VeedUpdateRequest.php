<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class VeedUpdateRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'dni'           =>  'required',
            'first_name'    =>  'required',
            'last_name'     =>  'required',
            'phone'         =>  'required',
            'user_id'       =>  'required',
            'email'         =>  '',
            'observacion'   =>  '',
            'parroquia_id'  =>  'required',
            'recinto_id'    =>  'required',
            'recinto__id'   =>  'required',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()],422));
    }
}
