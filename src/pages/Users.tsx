import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Users as UsersIcon, 
  Mail, 
  Building2,
  MoreVertical,
  UserCheck
} from 'lucide-react'

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Placeholder data - replace with actual API calls
  const users = [
    {
      id: 'user1',
      nickname: 'John Doe',
      email: 'john@example.com',
      iconUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
      houseIds: ['house1', 'house2'],
      houses: ['Living Room', 'Kitchen']
    },
    {
      id: 'user2',
      nickname: 'Jane Smith',
      email: 'jane@example.com',
      iconUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
      houseIds: ['house1', 'house3'],
      houses: ['Living Room', 'Bedroom']
    },
    {
      id: 'user3',
      nickname: 'Mike Johnson',
      email: 'mike@example.com',
      iconUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
      houseIds: ['house2'],
      houses: ['Kitchen']
    },
    {
      id: 'user4',
      nickname: 'Sarah Wilson',
      email: 'sarah@example.com',
      iconUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200',
      houseIds: ['house1', 'house2', 'house3'],
      houses: ['Living Room', 'Kitchen', 'Bedroom']
    }
  ]

  const filteredUsers = users.filter(user =>
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-2">Manage users and their access to houses</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="card hover:shadow-md transition-shadow duration-200 relative group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="p-1 rounded-full bg-white shadow-md hover:bg-gray-50">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="flex items-start space-x-4">
              <img 
                src={user.iconUrl} 
                alt={user.nickname}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">{user.nickname}</h3>
                  <UserCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm truncate">{user.email}</span>
                </div>
                
                {/* Houses */}
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      {user.houses.length} house{user.houses.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {user.houses.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {user.houses.slice(0, 2).map((house, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                        >
                          {house}
                        </span>
                      ))}
                      {user.houses.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{user.houses.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
          <button className="btn-primary">Add First User</button>
        </div>
      )}
    </div>
  )
}

export default Users