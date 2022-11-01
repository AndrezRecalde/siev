<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veed extends Model
{
    use HasFactory;

    protected $table = 'veedores';

    protected $fillable = [
        'dni',
        'first_name',
        'last_name',
        'phone',
        'email',
        'observacion',
        'user_id',
        'parroquia_id',
        'recinto_id',           //DONDE VOTA
        'recinto__id',          //DONDE CUIDA VOTO
        'cedula_frontal',
        'cedula_reverso',
    ];
}
