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
        Schema::create('clubs', function (Blueprint $table) {
            $table->id(); // club_id (Primary key)
            $table->string('name'); // Club name
            $table->text('description')->nullable(); // Club description
            $table->unsignedBigInteger('president_id')->nullable(); // President ID
            $table->unsignedBigInteger('secretary_id')->nullable(); // Secretary ID
            $table->unsignedBigInteger('treasurer_id')->nullable(); // Treasurer ID
            $table->timestamps(); // Created_at and updated_at

            // Foreign key constraints
            $table->foreign('president_id')->references('id')->on('mingle_users')->onDelete('set null');
            $table->foreign('secretary_id')->references('id')->on('mingle_users')->onDelete('set null');
            $table->foreign('treasurer_id')->references('id')->on('mingle_users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clubs');
    }
};
