<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Traits\HasRoles;

class Coordinador extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'users';
    protected $guard_name = 'web';



    protected $fillable = [
        'dni',
        'first_name',
        'last_name',
        'phone',
        'email',
        'password',
        'user_id',
        'canton_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'pivot'
    ];

    public static function create(array $attributes = [])
    {
        /* $attributes['user_id'] = Auth::user()->id; */
        /** cambiar por: auth()->id() */
        $attributes['password'] = Hash::make('consejo2023');

        $user = static::query()->create($attributes);

        return $user;
    }

    public function setPasswordAttribute($password)
    {
        return $this->attributes['password'] = Hash::needsRehash($password) ? Hash::make($password) : $password;
    }

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function veedores()
    {
        return $this->hasMany(Veedor::class);
    }

    public function canton()
    {
        return $this->belongsTo(Canton::class);
    }

    public function parroquias()
    {
        return $this->belongsToMany(Parroquia::class, 'parroquia_user', 'user_id');
    }

    public function recintos()
    {
        return $this->belongsToMany(Recinto::class, 'recinto_user', 'user_id');
    }

    public function coordinador()
    {
        return $this->belongsTo(Coordinador::class);
    }

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($coordinador) {
            $coordinador->veedores()->delete();
        });
    }
}
