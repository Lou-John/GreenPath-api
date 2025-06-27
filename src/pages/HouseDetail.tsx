import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  Leaf, 
  Plus, 
  Edit,
  Trash2,
  UserPlus,
  MoreVertical
} from 'lucide-react'

const HouseDetail: React.FC = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('plants')

  // Placeholder data - replace with actual API call
  const house = {
    id: '1',
    name: 'Living Room',
    userIds: ['user1', 'user2'],
    plants: [
      {
        id: '1',
        commonName: 'Monstera Deliciosa',
        scientificName: 'Monstera deliciosa',
        image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=400',
        careLevel: 'Easy',
        lastWatered: '2 days ago',
        needsAttention: false
      },
      {
        id: '2',
        commonName: 'Snake Plant',
        scientificName: 'Sansevieria trifasciata',
        image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=400',
        careLevel: 'Very Easy',
        lastWatered: '5 days ago',
        needsAttention: true
      },
      {
        id: '3',
        commonName: 'Peace Lily',
        scientificName: 'Spathiphyllum',
        image: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg?auto=compress&cs=tinysrgb&w=400',
        careLevel: 'Easy',
        lastWatered: '3 days ago',
        needsAttention: false
      }
    ],
    users: [
      {
        id: 'user1',
        nickname: 'John Doe',
        email: 'john@example.com',
        iconUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 'user2',
        nickname: 'Jane Smith',
        email: 'jane@example.com',
        iconUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    createdAt: '2024-01-15'
  }

  const tabs = [
    { id: 'plants', name: 'Plants', count: house.plants.length },
    { id: 'members', name: 'Members', count: house.users.length },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/houses" className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{house.name}</h1>
              <p className="text-gray-600">Created {new Date(house.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary flex items-center">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-50">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Plants</p>
              <p className="text-2xl font-bold text-gray-900">{house.plants.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-50">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Members</p>
              <p className="text-2xl font-bold text-gray-900">{house.users.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-50">
              <Building2 className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Needs Attention</p>
              <p className="text-2xl font-bold text-gray-900">
                {house.plants.filter(p => p.needsAttention).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'plants' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Plants in {house.name}</h2>
              <button className="btn-primary flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Plant
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {house.plants.map((plant) => (
                <div key={plant.id} className="card hover:shadow-md transition-shadow duration-200 relative group">
                  {plant.needsAttention && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-1 rounded-full bg-white shadow-md hover:bg-gray-50">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <Link to={`/plants/${plant.id}`} className="block">
                    <div className="aspect-square rounded-lg overflow-hidden mb-4">
                      <img 
                        src={plant.image} 
                        alt={plant.commonName}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{plant.commonName}</h3>
                        <p className="text-sm text-gray-500 italic line-clamp-1">{plant.scientificName}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          plant.careLevel === 'Very Easy' ? 'bg-green-100 text-green-800' :
                          plant.careLevel === 'Easy' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {plant.careLevel}
                        </span>
                        <span className="text-xs text-gray-500">
                          Watered {plant.lastWatered}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {house.plants.length === 0 && (
              <div className="text-center py-12">
                <Leaf className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No plants in this house</h3>
                <p className="text-gray-500 mb-4">Add some plants to get started</p>
                <button className="btn-primary">Add First Plant</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'members' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Members</h2>
              <button className="btn-primary flex items-center">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {house.users.map((user) => (
                <div key={user.id} className="card hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={user.iconUrl} 
                      alt={user.nickname}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{user.nickname}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <button className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {house.users.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No members yet</h3>
                <p className="text-gray-500 mb-4">Invite people to help care for plants in this house</p>
                <button className="btn-primary">Invite First Member</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default HouseDetail