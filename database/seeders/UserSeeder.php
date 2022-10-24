<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Veedor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        Role::truncate();

        $adminRole = Role::create(['name' => 'Administrador']);
        $supervisorRole = Role::create(['name' => 'Supervisor']);
        $coordiandorRole = Role::create(['name' => 'Coordinador']);

        $admin = New User;
        $admin->dni = '0802704172';
        $admin->first_name = 'Cristhian Andres';
        $admin->last_name = 'Recalde Solanno';
        $admin->phone = '0939242242';
        $admin->email = 'azw1021@gmail.com';
        $admin->password = Hash::make('a123456');
        $admin->user_id = 1;
        $admin->canton_id = 1;
        $admin->parroquias()->attach($admin->id);
        $admin->recintos()->attach($admin->id);
        $admin->save();
        $admin->assignRole($adminRole);

        $supervisor = New User;
        $supervisor->dni = '0803147090';
        $supervisor->first_name = 'Lino';
        $supervisor->last_name = 'Espinoza';
        $supervisor->phone = '0923456789';
        $supervisor->email = 'linoespinoza@gmail.com';
        $supervisor->password = Hash::make('a123456');
        $supervisor->user_id = 1;
        $supervisor->canton_id = 1;
        $supervisor->parroquias()->attach($supervisor->id);
        $supervisor->recintos()->attach($supervisor->id);
        $supervisor->save();
        $supervisor->assignRole($supervisorRole);


        $coordinador = New User;
        $coordinador->dni = '0802456782';
        $coordinador->first_name = 'Lady Mercedez';
        $coordinador->last_name = 'Cedeno Plaza';
        $coordinador->phone = '0989342145';
        $coordinador->email = 'ladymercedez@gmail.com';
        $coordinador->password = Hash::make('a123456');
        $coordinador->user_id = 2;
        $coordinador->canton_id = 1;
        $coordinador->parroquias()->attach($coordinador->id);
        $coordinador->recintos()->attach($coordinador->id);
        $coordinador->save();
        $coordinador->assignRole($coordiandorRole);

        $coordinador = New User;
        $coordinador->dni = '0822345566';
        $coordinador->first_name = 'Gerald';
        $coordinador->last_name = 'Ortiz';
        $coordinador->phone = '0923455577';
        $coordinador->email = 'gerald@gmail.com';
        $coordinador->password = Hash::make('a123456');
        $coordinador->user_id = 2;
        $coordinador->canton_id = 1;
        $coordinador->parroquias()->attach($coordinador->id);
        $coordinador->recintos()->attach($coordinador->id);
        $coordinador->save();
        $coordinador->assignRole($coordiandorRole);

        $veedor = New Veedor;
        $veedor->dni = '0811111111';
        $veedor->first_name = 'Lolito';
        $veedor->last_name = 'Lolipoldo';
        $veedor->phone = '0933434455';
        $veedor->email = 'lolito@gmail.com';
        $veedor->observacion = '';
        $veedor->user_id = 3;
        $veedor->parroquia_id = 1;
        $veedor->recinto_id = 1;
        $veedor->recinto__id = 1;
        $veedor->save();


        $veedor = New Veedor;
        $veedor->dni = '0811111122';
        $veedor->first_name = 'Maria Dolores';
        $veedor->last_name = 'Garzon';
        $veedor->phone = '0933434460';
        $veedor->email = 'maria@gmail.com';
        $veedor->observacion = '';
        $veedor->user_id = 4;
        $veedor->parroquia_id = 1;
        $veedor->recinto_id = 1;
        $veedor->recinto__id = 1;
        $veedor->save();



    }
}
