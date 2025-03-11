<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $cursor = $request->input('cursor', null);
            $searchTerm = $request->input('search', null);

            $query = Country::query();
            if ($searchTerm) {
                $query->where('name', 'like', "%{$searchTerm}%");
            }

            $paginator = $query->orderBy('id', 'asc')->cursorPaginate(15, ['id', 'name'], 'cursor', $cursor);

            // $countries = Cache::remember("countries_{$cursor}_{$searchTerm}", $this->cachingTimeout, function () use ($paginator) {
            //     return $paginator->items();
            // });

            return response()->json([
                'data' => $paginator->items(),
                'pagination' => [
                    'nextCursor' => $paginator->nextPageUrl(),
                    'previousCursor' => $paginator->previousPageUrl(),
                    'current' => $paginator->cursor(),
                    'per_page' => $paginator->perPage(),
                    'more_pages' => $paginator->hasMorePages()
                ]
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'error' => $exception->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Country  $country
     * @return \Illuminate\Http\Response
     */
    public function show(Country $country)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Country  $country
     * @return \Illuminate\Http\Response
     */
    public function edit(Country $country)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Country  $country
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Country $country)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Country  $country
     * @return \Illuminate\Http\Response
     */
    public function destroy(Country $country)
    {
        //
    }
}
