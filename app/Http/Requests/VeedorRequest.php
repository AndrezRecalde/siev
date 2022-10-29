<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;


class VeedorRequest extends FormRequest
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
            'dni'           =>  'required|unique:veedores',
            'first_name'    =>  'required',
            'last_name'     =>  'required',
            'phone'         =>  'required',
            'email'         =>  '',
            'observacion'   =>  '',
            'parroquia_id'     =>  'required',
            'recinto_id'    =>  'required',  //Donde vota
            'recinto__id'   =>  'required',     //Donde cuida el voto
            /* 'cedula_frontal'    =>  '',
            'cedula_reverso'    =>  '' */
        ];
    }

    public function messages()
    {
        return [
            'dni.unique'  => 'La cedula ya se encuentra registrada',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()],422));
    }
}
