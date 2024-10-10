import React, { useEffect, useState } from 'react'
import { Users, BarChart, Settings } from 'lucide-react'
import { getDashboardData } from '../services/api'

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    activeCampaigns: 0,
    revenue: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData('admin')
        setDashboardData(data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
        </div>
        <nav className="mt-4">
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <Users className="inline-block mr-2" /> Users
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <BarChart className="inline-block mr-2" /> Analytics
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <Settings className="inline-block mr-2" /> Settings
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-4">Welcome, Admin!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold">{dashboardData.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Active Campaigns</h2>
            <p className="text-3xl font-bold">{dashboardData.activeCampaigns}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Revenue</h2>
            <p className="text-3xl font-bold">${dashboardData.revenue}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard