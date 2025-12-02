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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('company');
            $table->string('position');
            $table->text('url');
            $table->enum('status', ['Applied', 'Not Applied', 'Interview', 'Offer', 'Rejected']);
            $table->dateTime('applied_at')->nullable();
            $table->dateTime('last_update')->nullable();
            $table->text('notes');
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
