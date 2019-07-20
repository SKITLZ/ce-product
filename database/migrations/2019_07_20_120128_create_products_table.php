<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')
                  ->onDelete('cascade');
            $table->string('name');
            $table->string('description')->nullable();
            $table->decimal('price', 7, 2);
            $table->decimal('weight', 8, 2);
            $table->integer('calories')->nullable();
            $table->decimal('protein', 4, 1)->nullable();
            $table->decimal('fat', 4, 1)->nullable();
            $table->decimal('carbohydrate', 4, 1)->nullable();
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
        Schema::dropIfExists('products');
    }
}
