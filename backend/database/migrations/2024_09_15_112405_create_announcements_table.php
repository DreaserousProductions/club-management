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
        Schema::create('announcements', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('author_name'); // Author's name
            $table->unsignedBigInteger('club_id')->nullable(); // Foreign key for club
            $table->string('title'); // Title of the announcement
            $table->text('content'); // Content of the announcement
            $table->timestamps(); // Created at and updated at timestamps

            $table->foreign('club_id')->references('id')->on('clubs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
