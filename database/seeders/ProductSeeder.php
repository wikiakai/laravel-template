<?php

namespace Database\Seeders;

use App\Models\Product;

use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'dummy product',
            'code' => 'I-' . rand(10, 990),
            'qty' => rand(1, 99),
            'price' => rand(1000, 99000),
            'cost' => rand(1000, 99000),
            'description' => 'good looking product',
            'status' => 'ready'
        ]);
    }
}
