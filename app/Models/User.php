<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'pivot'
    ];

    public static function create(array $attributes = [])
    {
        $attributes['user_id'] = Auth::user()->id;
        /** cambiar por: auth()->id() */
        /* $attributes['password'] = Hash::make('a123456'); */

        $user = static::query()->create($attributes);

        return $user;
    }

    //Me permite encriptar las password de los usuarios creados
    /* public function setPasswordAttribute($password)
    {
        return $this->attributes['password'] = Hash::needsRehash($password) ? Hash::make($password) : $password;
    } */

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
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
        return $this->belongsToMany(Parroquia::class, 'parroquia_user');
    }

    public function recintos()
    {
        return $this->belongsToMany(Recinto::class, 'recinto_user');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($user) {
            $user->veedores()->delete();
        });
    }
}
