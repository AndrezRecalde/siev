<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CoordinadorUpdateRequest extends FormRequest
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
            'email'         =>  'required',
            'user_id'       =>  'required',
            'canton_id'     =>  'required',
            'parroquia_id'  =>  'required',
            'recinto_id'    =>  '',
            'roles'         =>  'required'

        ];
    }

    public function messages()
    {
        return [
        'dni.unique' => 'Ya existe el DNI',
        'email.unique' => 'Ya existe el email',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()],422));
    }
}
