<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    use HasUlids;

    protected $fillable = [
        'name',
        'code',
        'category_id',
        'qty',
        'price',
        'cost',
        'description',
        'image',
        'status'
    ];
}
