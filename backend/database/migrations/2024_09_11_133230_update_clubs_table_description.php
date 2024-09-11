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
        Schema::table('clubs', function (Blueprint $table) {
            // Drop the old 'description' column
            $table->dropColumn('description');

            // Add the new 'description' column with JSON datatype
            $table->json('description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('clubs', function (Blueprint $table) {
            // Rollback the new 'description' column
            $table->dropColumn('description');

            // Add the old 'description' column back as a text type
            $table->text('description')->nullable();
        });
    }
};
