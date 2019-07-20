<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['string'],
            'price' => ['required','numeric'],
            'weight' => ['required','numeric'],
            'calories' => ['integer'],
            'protein' => ['numeric'],
            'fat' => ['numeric'],
            'carbohydrate' => ['numeric'],
        ]);

        $product = Product::create($data);

        return response($product, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['string'],
            'price' => ['required','numeric'],
            'weight' => ['required','numeric'],
            'calories' => ['integer'],
            'protein' => ['numeric'],
            'fat' => ['numeric'],
            'carbohydrate' => ['numeric'],
        ]);

        $product->update($data);

        return response($product, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response('Product was successfully deleted', 200);
    }
}
