<?php

namespace App\Http\Controllers;

use App\Models\DashboardData;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getDashboardData(Request $request, $role)
    {
        $user = $request->user();
        $dashboardData = $user->dashboardData()->where('role', $role)->first();

        if (!$dashboardData) {
            return response()->json(['message' => 'Dashboard data not found'], 404);
        }

        return response()->json($dashboardData->data);
    }
}