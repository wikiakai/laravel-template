<?php

namespace App\Http\Controllers;

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
    public function index(): Response
    {
        $query = Product::query();

        return inertia('Product/Index', ['data' => $query->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $formType = 'create';

        return inertia('Product/Form', ['formType' => $formType]);
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
            'description' => 'string',
            'image' => 'nullable|image',
        ]);

        // DB::beginTransaction();

        // upload image
        // if ($request->hasFile('image')) {
        $image = $request->file('image');
        // $image->storeAs('public/uploads', $image->hashName('uploads'));
        $image->store('uploads', 'public');
        // $event->image = $image->hashName('uploads');
        // }
        Product::create([
            'name' => $request->name,
            'qty' => $request->qty,
            'price' => $request->price,
            'description' => $request->description,
            'image' => $image->hashName('uploads'),
        ]);

        // DB::commit();

        // $product = Product::make([
        //     'name' => $request->name,
        //     'qty' => $request->qty,
        //     'price' => $request->price,
        //     'description' => $request->desription,
        // ]);

        // if ($request->hasFile('image')) {
        //     $image = $request->file('image');
        //     $image->store('uploads', 'public');
        //     $product->image = $image->hashName('uploads');
        // }

        // $product->save();

        return redirect()->route('product.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $item = Product::findOrFail($id);
        $formType = 'show';

        return inertia('Product/Form', ['item' => $item, 'formType' => $formType]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $item = Product::findOrFail($id);
        $formType = 'edit';

        return inertia('Product/Form', ['item' => $item, 'formType' => $formType]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
