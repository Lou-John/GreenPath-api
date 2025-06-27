import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter, 
  Droplets, 
  Sun, 
  AlertTriangle,
  Heart,
  MoreVertical
} from 'lucide-react'

const Plants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)

  // Placeholder data - replace with actual API calls
  const plants = [
    {
      id: '1',
      commonName: 'Monstera Deliciosa',
      scientificName: 'Monstera deliciosa',
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=400',
      watering: 'Weekly',
      sunlight: ['Bright indirect'],
      careLevel: 'Easy',
      lastWatered: '2 days ago',
      needsAttention: false
    },
    {
      id: '2',
      commonName: 'Snake Plant',
      scientificName: 'Sansevieria trifasciata',
      image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=400',
      watering: 'Bi-weekly',
      sunlight: ['Low light', 'Bright indirect'],
      careLevel: 'Very Easy',
      lastWatered: '5 days ago',
      needsAttention: true
    },
    {
      id: '3',
      commonName: 'Fiddle Leaf Fig',
      scientificName: 'Ficus lyrata',
      image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=400',
      watering: 'Weekly',
      sunlight: ['Bright indirect'],
      careLevel: 'Moderate',
      lastWatered: '1 day ago',
      needsAttention: false
    },
    {
      id: '4',
      commonName: 'Peace Lily',
      scientificName: 'Spathiphyllum',
      image: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg?auto=compress&cs=tinysrgb&w=400',
      watering: 'Weekly',
      sunlight: ['Low light', 'Medium light'],
      careLevel: 'Easy',
      lastWatered: '3 days ago',
      needsAttention: true
    }
  ]

  const filteredPlants = plants.filter(plant =>
    plant.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Plants</h1>
          <p className="text-gray-600 mt-2">Manage and care for your plant collection</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Plant
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        <button 
          onClick={() => setFilterOpen(!filterOpen)}
          className="btn-secondary flex items-center"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <div className="card">
          <h3 className="font-medium text-gray-900 mb-4">Filter Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Care Level</label>
              <select className="input">
                <option value="">All levels</option>
                <option value="very-easy">Very Easy</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="difficult">Difficult</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Watering</label>
              <select className="input">
                <option value="">All frequencies</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Light Requirements</label>
              <select className="input">
                <option value="">All light levels</option>
                <option value="low">Low light</option>
                <option value="medium">Medium light</option>
                <option value="bright-indirect">Bright indirect</option>
                <option value="direct">Direct sunlight</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Plants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlants.map((plant) => (
          <div key={plant.id} className="card hover:shadow-md transition-shadow duration-200 relative group">
            {plant.needsAttention && (
              <div className="absolute top-4 right-4 z-10">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
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
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{plant.commonName}</h3>
                  <p className="text-sm text-gray-500 italic line-clamp-1">{plant.scientificName}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-blue-600">
                    <Droplets className="w-4 h-4 mr-1" />
                    <span>{plant.watering}</span>
                  </div>
                  <div className="flex items-center text-yellow-600">
                    <Sun className="w-4 h-4 mr-1" />
                    <span>{plant.sunlight[0]}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    plant.careLevel === 'Very Easy' ? 'bg-green-100 text-green-800' :
                    plant.careLevel === 'Easy' ? 'bg-blue-100 text-blue-800' :
                    plant.careLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
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

      {filteredPlants.length === 0 && (
        <div className="text-center py-12">
          <Leaf className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No plants found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button className="btn-primary">Add Your First Plant</button>
        </div>
      )}
    </div>
  )
}

export default Plants