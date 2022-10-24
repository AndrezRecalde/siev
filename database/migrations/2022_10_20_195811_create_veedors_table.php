<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('veedores', function (Blueprint $table) {
            $table->id();
            $table->string('dni', 10)->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('observacion')->nullable();
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('parroquia_id');
            $table->unsignedInteger('recinto_id');      //Donde Vota
            $table->unsignedInteger('recinto__id');     //Donde va a cuidar el voto
            $table->string('cedula_frontal')->nullable();
            $table->string('cedula_reverso')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('veedors');
    }
};
