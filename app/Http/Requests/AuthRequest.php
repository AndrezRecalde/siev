<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthRequest extends FormRequest
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
            'dni'     =>  'required|string',
            'password'  =>  'required|string'
        ];
    }

    public function messages(Type $var = null)
    {
        return [
            'dni.required'    =>  'El DNI es obligatorio',
            'password.required' =>  'La contraseña es obligatoria'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()],422));
    }
}
