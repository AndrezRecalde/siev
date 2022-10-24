<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veedor extends Model
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

    public static function create(array $attributes = [])
    {
        $attributes['user_id'] = 1;   /** cambiar por: auth()->id() */


        $veedor = static::query()->create($attributes);

        return $veedor;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
