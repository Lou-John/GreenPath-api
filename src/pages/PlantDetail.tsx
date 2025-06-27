import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Droplets, 
  Sun, 
  Scissors, 
  AlertTriangle, 
  Calendar,
  Edit,
  Trash2,
  Heart,
  Share2,
  Camera
} from 'lucide-react'

const PlantDetail: React.FC = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  // Placeholder data - replace with actual API call
  const plant = {
    id: '1',
    commonName: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'The Monstera deliciosa is a popular houseplant known for its large, glossy leaves with distinctive splits and holes. Native to Central America, it\'s an excellent choice for indoor gardening.',
    watering: 'Weekly',
    wateringBenchmark: { value: '1-2', unit: 'times per week' },
    sunlight: ['Bright indirect light'],
    careLevel: 'Easy',
    pruningMonth: ['Spring', 'Summer'],
    flowers: false,
    floweringSeason: null,
    poisonousToHumans: false,
    poisonousToPets: true,
    lastWatered: '2 days ago',
    nextWatering: 'In 5 days',
    detailed: true
  }

  const careHistory = [
    { date: '2024-01-15', action: 'Watered', notes: 'Soil was dry' },
    { date: '2024-01-10', action: 'Fertilized', notes: 'Monthly feeding' },
    { date: '2024-01-08', action: 'Watered', notes: 'Regular watering' },
    { date: '2024-01-01', action: 'Repotted', notes: 'Moved to larger pot' },
  ]

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'care', name: 'Care Guide' },
    { id: 'history', name: 'Care History' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/plants" className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{plant.commonName}</h1>
            <p className="text-gray-600 italic">{plant.scientificName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
          <button className="btn-secondary flex items-center">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Plant Image and Quick Actions */}
        <div className="space-y-6">
          <div className="card">
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img 
                src={plant.image} 
                alt={plant.commonName}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="w-full btn-secondary flex items-center justify-center">
              <Camera className="w-4 h-4 mr-2" />
              Update Photo
            </button>
          </div>

          {/* Quick Care Actions */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200">
                <div className="flex items-center">
                  <Droplets className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium">Water Plant</span>
                </div>
                <span className="text-sm text-gray-500">Due in 5 days</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors duration-200">
                <div className="flex items-center">
                  <Scissors className="w-5 h-5 text-green-600 mr-3" />
                  <span className="font-medium">Prune</span>
                </div>
                <span className="text-sm text-gray-500">Optional</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-colors duration-200">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-yellow-600 mr-3" />
                  <span className="font-medium">Schedule Care</span>
                </div>
              </button>
            </div>
          </div>

          {/* Warnings */}
          {plant.poisonousToPets && (
            <div className="card bg-orange-50 border-orange-200">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900">Pet Safety Warning</h4>
                  <p className="text-sm text-orange-700 mt-1">This plant is toxic to pets. Keep away from cats and dogs.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
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
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="card">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{plant.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Care Requirements</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Care Level</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          plant.careLevel === 'Easy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {plant.careLevel}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Watering</span>
                        <span className="text-gray-900">{plant.watering}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Light</span>
                        <span className="text-gray-900">{plant.sunlight.join(', ')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Pruning Season</span>
                        <span className="text-gray-900">{plant.pruningMonth.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Plant Characteristics</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Produces Flowers</span>
                        <span className="text-gray-900">{plant.flowers ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Pet Safe</span>
                        <span className={`text-sm font-medium ${plant.poisonousToPets ? 'text-red-600' : 'text-green-600'}`}>
                          {plant.poisonousToPets ? 'No' : 'Yes'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Human Safe</span>
                        <span className={`text-sm font-medium ${plant.poisonousToHumans ? 'text-red-600' : 'text-green-600'}`}>
                          {plant.poisonousToHumans ? 'No' : 'Yes'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Watering Guide</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Droplets className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-900">Watering Schedule</span>
                    </div>
                    <p className="text-blue-800">
                      Water {plant.wateringBenchmark.value} {plant.wateringBenchmark.unit}. 
                      Check soil moisture before watering - it should be dry to the touch.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Light Requirements</h3>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Sun className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="font-medium text-yellow-900">Lighting Conditions</span>
                    </div>
                    <p className="text-yellow-800">
                      Prefers {plant.sunlight.join(' or ')}. Avoid direct sunlight which can scorch the leaves.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pruning & Maintenance</h3>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Scissors className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-medium text-green-900">Pruning Schedule</span>
                    </div>
                    <p className="text-green-800">
                      Best pruned during {plant.pruningMonth.join(' and ')}. Remove dead or yellowing leaves regularly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Care History</h3>
                  <button className="btn-primary text-sm">Add Entry</button>
                </div>
                <div className="space-y-4">
                  {careHistory.map((entry, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200">
                      <div className="w-2 h-2 rounded-full bg-primary-500 mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{entry.action}</span>
                          <span className="text-sm text-gray-500">{entry.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{entry.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlantDetail