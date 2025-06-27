import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Leaf, 
  Building2, 
  Users, 
  Droplets, 
  Sun, 
  Calendar,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'

const Dashboard: React.FC = () => {
  // Placeholder data - replace with actual API calls
  const stats = [
    { name: 'Total Plants', value: '24', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Houses', value: '3', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Users', value: '8', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Care Tasks', value: '12', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-50' },
  ]

  const recentPlants = [
    { id: '1', name: 'Monstera Deliciosa', image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=400', lastWatered: '2 days ago' },
    { id: '2', name: 'Snake Plant', image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=400', lastWatered: '5 days ago' },
    { id: '3', name: 'Fiddle Leaf Fig', image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=400', lastWatered: '1 day ago' },
  ]

  const upcomingTasks = [
    { id: '1', plant: 'Peace Lily', task: 'Watering', due: 'Today', priority: 'high' },
    { id: '2', plant: 'Rubber Plant', task: 'Fertilizing', due: 'Tomorrow', priority: 'medium' },
    { id: '3', plant: 'Spider Plant', task: 'Pruning', due: 'In 3 days', priority: 'low' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your plants.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Plants */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Plants</h2>
            <Link to="/plants" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentPlants.map((plant) => (
              <div key={plant.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <img 
                  src={plant.image} 
                  alt={plant.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{plant.name}</h3>
                  <p className="text-sm text-gray-500">Last watered {plant.lastWatered}</p>
                </div>
                <Droplets className="w-5 h-5 text-blue-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Tasks</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <h3 className="font-medium text-gray-900">{task.plant}</h3>
                    <p className="text-sm text-gray-500">{task.task}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{task.due}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/plants" className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200">
            <Leaf className="w-8 h-8 text-primary-600 mr-4" />
            <div>
              <h3 className="font-medium text-gray-900">Add New Plant</h3>
              <p className="text-sm text-gray-500">Expand your collection</p>
            </div>
          </Link>
          <Link to="/search" className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200">
            <TrendingUp className="w-8 h-8 text-primary-600 mr-4" />
            <div>
              <h3 className="font-medium text-gray-900">Search Plants</h3>
              <p className="text-sm text-gray-500">Find care information</p>
            </div>
          </Link>
          <Link to="/houses" className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200">
            <Building2 className="w-8 h-8 text-primary-600 mr-4" />
            <div>
              <h3 className="font-medium text-gray-900">Manage Houses</h3>
              <p className="text-sm text-gray-500">Organize by location</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard