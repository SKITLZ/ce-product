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
        return Product::where('user_id', auth()->user()->id)->get();
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
            'description' => ['nullable','string'],
            'price' => ['required', 'numeric', 'min:0', 'max:99999'],
            'weight' => ['required', 'numeric', 'min:0', 'max:999999'],
            'calories' => ['nullable', 'integer', 'min:0'],
            'protein' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'fat' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'carbohydrate' => ['nullable', 'numeric', 'min:0', 'max:100'],
        ]);

        $product = Product::create([
            'user_id' => auth()->user()->id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'weight' => $request->weight,
            'calories' => $request->calories,
            'protein' => $request->protein,
            'fat' => $request->fat,
            'carbohydrate' => $request->carbohydrate,
        ]);

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
        if ($product->user_id !== auth()->user()->id) {
            return response()->json('Unauthorized', 401);
        }

        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable','string'],
            'price' => ['required', 'numeric', 'min:0', 'max:99999'],
            'weight' => ['required', 'numeric', 'min:0', 'max:999999'],
            'calories' => ['nullable', 'integer', 'min:0'],
            'protein' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'fat' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'carbohydrate' => ['nullable', 'numeric', 'min:0', 'max:100'],
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
        if ($product->user_id !== auth()->user()->id) {
            return response()->json('Unauthorized', 401);
        }
        
        $product->delete();

        return response('Product was successfully deleted', 200);
    }
}
