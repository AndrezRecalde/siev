<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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
        $attributes['user_id'] = Auth::user()->id;
        /** cambiar por: auth()->id() */

        $veedor = static::query()->create($attributes);

        return $veedor;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function coordinador()
    {
        return $this->belongsTo(Coordinador::class);
    }

    public function scopeRecinto($query, $recinto)
    {
        if ($recinto > 0) {
            return $query->where('re.id', $recinto);
        }
    }

    public function scopeParroquia($query, $parroquia)
    {
        if ($parroquia > 0) {
            return $query->where('p.id', $parroquia);
        }
    }

    public function scopeCanton($query, $canton)
    {
        if ($canton > 0) {
            return $query->where('c.id', $canton);
        }
    }

    public function scopeUsuario($query, $usuario)
    {
        if ($usuario > 0) {
            return $query->where('us.id', $usuario);
        }
    }
}
