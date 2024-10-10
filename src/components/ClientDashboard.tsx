import React, { useEffect, useState } from 'react'
import { BarChart2, TrendingUp, Users } from 'lucide-react'
import { getDashboardData } from '../services/api'

const ClientDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    websiteTraffic: 0,
    socialEngagement: 0,
    conversionRate: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData('client')
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
          <h2 className="text-2xl font-semibold text-gray-800">Client Dashboard</h2>
        </div>
        <nav className="mt-4">
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <BarChart2 className="inline-block mr-2" /> Analytics
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <TrendingUp className="inline-block mr-2" /> Campaigns
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <Users className="inline-block mr-2" /> Audience
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-4">Welcome, Client!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Website Traffic</h2>
            <p className="text-3xl font-bold">{dashboardData.websiteTraffic}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Social Engagement</h2>
            <p className="text-3xl font-bold">{dashboardData.socialEngagement}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Conversion Rate</h2>
            <p className="text-3xl font-bold">{dashboardData.conversionRate}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard