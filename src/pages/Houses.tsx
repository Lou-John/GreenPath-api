import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Building2, 
  Users, 
  Leaf, 
  MoreVertical,
  MapPin
} from 'lucide-react'

const Houses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Placeholder data - replace with actual API calls
  const houses = [
    {
      id: '1',
      name: 'Living Room',
      userIds: ['user1', 'user2'],
      plants: [
        { id: '1', commonName: 'Monstera Deliciosa', image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: '2', commonName: 'Snake Plant', image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: '3', commonName: 'Peace Lily', image: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg?auto=compress&cs=tinysrgb&w=200' }
      ],
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Bedroom',
      userIds: ['user1'],
      plants: [
        { id: '4', commonName: 'Spider Plant', image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: '5', commonName: 'Pothos', image: 'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=200' }
      ],
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Kitchen',
      userIds: ['user1', 'user2', 'user3'],
      plants: [
        { id: '6', commonName: 'Herb Garden', image: 'https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg?auto=compress&cs=tinysrgb&w=200' }
      ],
      createdAt: '2024-01-05'
    }
  ]

  const filteredHouses = houses.filter(house =>
    house.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Houses</h1>
          <p className="text-gray-600 mt-2">Organize your plants by location</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create House
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search houses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* Houses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHouses.map((house) => (
          <div key={house.id} className="card hover:shadow-md transition-shadow duration-200 relative group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="p-1 rounded-full bg-white shadow-md hover:bg-gray-50">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <Link to={`/houses/${house.id}`} className="block">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <Building2 className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{house.name}</h3>
                  <p className="text-sm text-gray-500">Created {new Date(house.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{house.userIds.length} member{house.userIds.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Leaf className="w-4 h-4 mr-1" />
                  <span>{house.plants.length} plant{house.plants.length !== 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Plant Preview */}
              {house.plants.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Plants</h4>
                  <div className="flex -space-x-2">
                    {house.plants.slice(0, 4).map((plant, index) => (
                      <img
                        key={plant.id}
                        src={plant.image}
                        alt={plant.commonName}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        title={plant.commonName}
                      />
                    ))}
                    {house.plants.length > 4 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">+{house.plants.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {house.plants.length === 0 && (
                <div className="text-center py-4">
                  <Leaf className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No plants yet</p>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>

      {filteredHouses.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No houses found</h3>
          <p className="text-gray-500 mb-4">Create your first house to organize your plants</p>
          <button className="btn-primary">Create House</button>
        </div>
      )}
    </div>
  )
}

export default Houses