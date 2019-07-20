<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // protected $fillable = ['name', 'description', 'price', 'weight', 'calories', 'protein', 'fat', 'carbohydrate'];
    protected $guarded = [];    // the same as the $filllable array above
}
