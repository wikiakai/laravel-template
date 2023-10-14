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

        Schema::create('products', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('code');
            $table->uuid('category_id')->nullable();
            $table->string('name');
            $table->decimal('qty')->default(0);
            $table->decimal('price')->default(0);
            $table->decimal('cost')->default(0);
            $table->text('description')->nullable();
            $table->enum('status', ['ready', 'out_of_stock', 'on_ordered'])->default('ready');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
