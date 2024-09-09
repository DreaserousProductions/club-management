<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mingle_users', function (Blueprint $table) {
            $table->id();
            $table->string('rollnumber')->unique(); // Mandatory roll number
            $table->string('role')->nullable(); // Nullable role
            $table->string('otp')->nullable(); // Nullable otp
            $table->string('name')->nullable(); // Nullable name
            $table->string('avatar_img_path')->nullable(); // Nullable avatar image path
            $table->json('clubs_enrolled_in')->nullable(); // Nullable JSON list of club IDs
            $table->unsignedBigInteger('club_admin')->nullable(); // Nullable club admin (club ID)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mingle_users');
    }
};
