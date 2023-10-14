<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Permission;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

use function Psy\debug;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Product::query();

        if ($request->q) {
            $query->where(
                'name',
                'like',
                "%{$request->q}%"
            );
        }
        $query->orderBy('created_at', 'desc');
        return inertia('Product/Index', ['data' => $query->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $formType = 'create';
        $categories = Category::all();

        return inertia('Product/Form', ['formType' => $formType, 'categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'string|required|max:255',
            'qty' => 'integer|required|min:1|max:100',
            'price' => 'decimal:0|required',
            'cost' => 'decimal:0|required',
            'category_id' => 'string',
            'description' => 'string',
            'status' => 'string|required',
            'image' => 'nullable|image',
        ]);

        DB::beginTransaction();

        // upload image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image->store('uploads', 'public');

            Product::create([
                'name' => $request->name,
                'code' => 'I-' . Product::count() + 1,
                'qty' => $request->qty,
                'price' => $request->price,
                'cost' => $request->cost,
                'category_id' => $request->category_id,
                'description' => $request->description,
                'status' => $request->status,
                'image' => $image->hashName('uploads'),
            ]);
        } else {
            Product::create([
                'name' => $request->name,
                'code' => 'I-' . Product::count() + 1,
                'qty' => $request->qty,
                'price' => $request->price,
                'cost' => $request->cost,
                'category_id' => $request->category_id,
                'description' => $request->description,
                'status' => $request->status,
                'image' => ''
            ]);
        }

        DB::commit();

        return redirect()->route('product.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): Response
    {
        $item = $product;
        $formType = 'show';
        $categories = Category::all();

        return inertia('Product/Form', ['item' => $item, 'formType' => $formType, 'categories' => $categories]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $item = Product::findOrFail($id);
        $formType = 'edit';
        $categories = Category::all();

        return inertia('Product/Form', ['item' => $item, 'formType' => $formType, 'categories' => $categories]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product): RedirectResponse
    {

        $request->validate([
            'name' => 'string|required|max:255',
            'qty' => 'integer|required|min:1|max:100',
            'price' => 'decimal:0|required',
            'cost' => 'decimal:0|required',
            'category_id' => 'string',
            'description' => 'string',
            'status' => 'string|required',
            'image' => 'nullable|image',
        ]);

        // upload image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image->store('uploads', 'public');

            $product->fill([
                'name' => $request->name,
                // 'code' => $product->code,
                'qty' => $request->qty,
                'price' => $request->price,
                'cost' => $request->cost,
                'category_id' => $request->category_id,
                'description' => $request->description,
                'status' => $request->status,
                'image' => $image->hashName('uploads'),
            ]);
        } else {
            $product->fill([
                'name' => $request->name,
                // 'code' => $product->code,
                'qty' => $request->qty,
                'price' => $request->price,
                'cost' => $request->cost,
                'category_id' => $request->category_id,
                'description' => $request->description,
                'status' => $request->status,
                'image' => ''
            ]);
        }

        $product->save();

        return redirect()->route('product.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has been updated']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {

        if ($product->id === null) {
            return redirect()->route('product.index')
                ->with('message', ['type' => 'error', 'message' => 'Item default can\'t deleted']);
        }
        $deleted = $product->delete();
        if ($deleted) {
            return redirect()->route('product.index')
                ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
        }
    }
}
