<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Category::query();
        if ($request->q) {
            $query->where(
                'name',
                'like',
                "%{$request->q}%"
            );
        }
        $query->orderBy('created_at', 'desc');
        return inertia('Category/Index', ['data' => $query->paginate(10)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|min:5|max:30'
        ]);

        Category::create([
            'name' => $request->name
        ]);

        return redirect()->route('category.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|min:5|max:30'
        ]);

        $category->fill([
            'name' => $request->name
        ]);

        $category->save();
        return redirect()->route('category.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if ($category->id === null) {
            return redirect()->route('category.index')->with(
                'message',
                ['type' => 'error', 'message' => 'Item default can\'t deleted']
            );
        }
        $deleted = $category->delete();
        if ($deleted) {
            return redirect()->route('category.index')
                ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
        }
    }
}
