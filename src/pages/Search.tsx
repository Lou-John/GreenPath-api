import React, { useState } from 'react'
import { 
  Search as SearchIcon, 
  Filter, 
  Leaf, 
  Sun, 
  Droplets, 
  AlertTriangle,
  Plus,
  ExternalLink
} from 'lucide-react'

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Placeholder search results - replace with actual API calls
  const mockResults = [
    {
      id: '1',
      commonName: 'Monstera Deliciosa',
      scientificName: 'Monstera deliciosa',
      thumbnailUrl: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=400',
      watering: 'Weekly',
      sunlight: ['Bright indirect light'],
      careLevel: 'Easy',
      poisonousToHumans: false,
      poisonousToPets: true,
      detailed: false
    },
    {
      id: '2',
      commonName: 'Snake Plant',
      scientificName: 'Sansevieria trifasciata',
      thumbnailUrl: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=400',
      watering: 'Bi-weekly',
      sunlight: ['Low light', 'Bright indirect light'],
      careLevel: 'Very Easy',
      poisonousToHumans: false,
      poisonousToPets: true,
      detailed: false
    },
    {
      id: '3',
      commonName: 'Peace Lily',
      scientificName: 'Spathiphyllum',
      thumbnailUrl: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg?auto=compress&cs=tinysrgb&w=400',
      watering: 'Weekly',
      sunlight: ['Low light', 'Medium light'],
      careLevel: 'Easy',
      poisonousToHumans: true,
      poisonousToPets: true,
      detailed: false
    }
  ]

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsLoading(true)
    // TODO: Replace with actual API call
    // const results = await plantsService.searchPlants(searchTerm)
    
    // Simulate API delay
    setTimeout(() => {
      setSearchResults(mockResults)
      setIsLoading(false)
    }, 1000)
  }

  const handleAddToCollection = (plantId: string) => {
    // TODO: Implement add to collection functionality
    console.log('Adding plant to collection:', plantId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Search Plants</h1>
        <p className="text-gray-600 mt-2">Discover new plants and learn about their care requirements</p>
      </div>

      {/* Search Bar */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for plants by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="input pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="btn-secondary flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button 
              onClick={handleSearch}
              disabled={!searchTerm.trim() || isLoading}
              className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SearchIcon className="w-4 h-4 mr-2" />
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">Filter Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pet Safe</label>
                <select className="input">
                  <option value="">All plants</option>
                  <option value="safe">Pet safe only</option>
                  <option value="toxic">Show toxic plants</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for plants...</p>
        </div>
      )}

      {!isLoading && searchResults.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Search Results ({searchResults.length})
            </h2>
            <p className="text-sm text-gray-600">
              Showing results for "{searchTerm}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((plant) => (
              <div key={plant.id} className="card hover:shadow-md transition-shadow duration-200">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img 
                    src={plant.thumbnailUrl} 
                    alt={plant.commonName}
                    className="w-full h-full object-cover"
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
                    {(plant.poisonousToHumans || plant.poisonousToPets) && (
                      <div className="flex items-center text-orange-600" title="Toxic to pets or humans">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button 
                      onClick={() => handleAddToCollection(plant.id)}
                      className="flex-1 btn-primary text-sm flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add to Collection
                    </button>
                    <button className="btn-secondary text-sm flex items-center justify-center px-3">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && searchResults.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <Leaf className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No plants found</h3>
          <p className="text-gray-500 mb-4">
            No plants match your search for "{searchTerm}". Try different keywords or adjust your filters.
          </p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setSearchResults([])
            }}
            className="btn-secondary"
          >
            Clear Search
          </button>
        </div>
      )}

      {!searchTerm && searchResults.length === 0 && (
        <div className="text-center py-12">
          <SearchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Search for Plants</h3>
          <p className="text-gray-500 mb-4">
            Enter a plant name to discover new species and learn about their care requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Monstera', 'Snake Plant', 'Pothos', 'Peace Lily'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setSearchTerm(suggestion)
                  handleSearch()
                }}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm hover:bg-primary-200 transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search