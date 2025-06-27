import React, { useState } from 'react'
import { 
  User, 
  Mail, 
  Camera, 
  Edit, 
  Save, 
  X,
  Building2,
  Leaf,
  Calendar,
  Settings
} from 'lucide-react'

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nickname: 'John Doe',
    email: 'john@example.com',
    iconUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
  })

  // Placeholder data - replace with actual API calls
  const userStats = {
    totalPlants: 24,
    housesManaged: 3,
    careTasksCompleted: 156,
    joinDate: '2024-01-01'
  }

  const recentActivity = [
    { date: '2024-01-15', action: 'Watered Monstera Deliciosa', house: 'Living Room' },
    { date: '2024-01-14', action: 'Added Snake Plant', house: 'Bedroom' },
    { date: '2024-01-13', action: 'Fertilized Peace Lily', house: 'Living Room' },
    { date: '2024-01-12', action: 'Created Kitchen house', house: 'Kitchen' },
  ]

  const handleSave = () => {
    // TODO: Implement API call to update user profile
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      nickname: 'John Doe',
      email: 'john@example.com',
      iconUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleSave}
                    className="btn-primary flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="btn-secondary flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img 
                    src={formData.iconUrl} 
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors duration-200">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{formData.nickname}</h3>
                  <p className="text-gray-600">{formData.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Member since {new Date(userStats.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nickname
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.nickname}
                      onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                      className="input"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                      {formData.nickname}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                      {formData.email}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{activity.action}</span>
                      <span className="text-sm text-gray-500">{activity.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">in {activity.house}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Leaf className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Plants</span>
                </div>
                <span className="font-semibold text-gray-900">{userStats.totalPlants}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building2 className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Houses</span>
                </div>
                <span className="font-semibold text-gray-900">{userStats.housesManaged}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">Care Tasks</span>
                </div>
                <span className="font-semibold text-gray-900">{userStats.careTasksCompleted}</span>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Settings className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-gray-700">Notification Preferences</span>
              </button>
              <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <User className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-gray-700">Privacy Settings</span>
              </button>
              <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-red-600">
                <span className="text-red-600">Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile