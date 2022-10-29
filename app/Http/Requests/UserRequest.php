<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\DB;

class UserRequest extends FormRequest
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
            'dni'           =>  'required|unique:users',
            'first_name'    =>  'required',
            'last_name'     =>  'required',
            'phone'         =>  '',
            'email'         =>  'required|unique:users',
            /* 'password'      =>  '', */
            'canton_id'     =>  'required',
            'parroquia_id'  =>  'required',
            'recinto_id'    =>  '',
            'roles'         =>  'required'
        ];
    }

    public function messages()
    {
        $messages = [
            'dni.required'          => 'el campo DNI es requerido',
            'dni.unique'            => 'El DNI ya esta registrado',
            'first_name.required'   =>  'El campo del nombre es obligatorio',
            'last_name.required'    =>  'El campo del apellido es obligatorio',
            'email.required'        =>  'El email es requerido',
            'email.unique'          =>  'El email ya ha sido registrado',
            'canton_id.required'    =>  'El canton es requerido',
            'parroquia_id.required' =>  'La parroquia es obligatoria',
            'roles.required'        =>  'Elija el role'
        ];
        return $messages;
    }

    protected function failedValidation(Validator $validator)
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()],422));
    }
}
