<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\RekomResource;
use App\Models\Rekom;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RekomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Rekom::latest()->paginate(10);

        return new RekomResource(true, 'semua data rekom', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
