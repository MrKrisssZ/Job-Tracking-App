<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // GET /jobs
    public function index(Request $request)
    {
        $user = auth('api')->user();
        $query = $user->jobs()->orderBy('created_at', 'desc');

        // If ?status= is provided, apply filtering
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }
        return response()->json($query->get());
    }

    // POST /jobs
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company'      => 'required|string|max:255',
            'position'     => 'required|string|max:255',
            'url'          => 'required|url',
            'status'       => 'required|in:Applied,Not Applied,Interview,Offer,Rejected',
            'applied_at'   => 'required|date',
            'last_update'  => 'nullable|date',
            'notes'        => 'nullable|string',
        ]);



        $job = auth('api')->user()->jobs()->create($validated);

        if (!$job)
        {
            return response()->json([
                'message' => 'Job storing failed'
            ], 404);
        }

        return response()->json($job, 201); // Created
    }

    // GET /jobs/{id}
    public function show($id)
    {
        $job = auth('api')->user()->jobs()->find($id);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        return $job;
    }

    // PUT/PATCH /jobs/{id}
    public function update(Request $request, $id)
    {

        $job = auth('api')->user()->jobs()->find($id);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        $validated = $request->validate([
            'company'      => 'sometimes|required|string|max:255',
            'position'     => 'sometimes|required|string|max:255',
            'url'          => 'sometimes|required|url',
            'status'       => 'sometimes|required|in:Applied,Not Applied,Interview,Offer,Rejected',
            'applied_at'   => 'nullable|date',
            'last_update'  => 'nullable|date',
            'notes'        => 'sometimes|required|string'
        ]);

        $job->update($validated);
        return response()->json($job, 200);
    }

    // DELETE /jobs/{id}
    public function destroy($id)
    {
        $job = auth('api')->user()->jobs()->find($id);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        $job->delete();
        return response()->json(['message' => 'Job deleted'], 200);
    }
}
