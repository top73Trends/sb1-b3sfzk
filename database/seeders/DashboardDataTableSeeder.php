<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\DashboardData;
use Illuminate\Database\Seeder;

class DashboardDataTableSeeder extends Seeder
{
    public function run()
    {
        $admin = User::whereHas('roles', function ($query) {
            $query->where('name', 'admin');
        })->first();

        DashboardData::create([
            'user_id' => $admin->id,
            'role' => 'admin',
            'data' => [
                'totalUsers' => 100,
                'activeCampaigns' => 25,
                'revenue' => 50000,
            ],
        ]);

        $client = User::whereHas('roles', function ($query) {
            $query->where('name', 'client');
        })->first();

        DashboardData::create([
            'user_id' => $client->id,
            'role' => 'client',
            'data' => [
                'websiteTraffic' => 10000,
                'socialEngagement' => 5000,
                'conversionRate' => 2.5,
            ],
        ]);

        $user = User::whereHas('roles', function ($query) {
            $query->where('name', 'user');
        })->first();

        DashboardData::create([
            'user_id' => $user->id,
            'role' => 'user',
            'data' => [
                'tasksCompleted' => 15,
                'upcomingDeadlines' => 5,
                'teamPerformance' => 85,
            ],
        ]);
    }
}