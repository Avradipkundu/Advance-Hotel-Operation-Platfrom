import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Bed, Users, Wifi, Car, Coffee, Tv, Bath } from 'lucide-react';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Deluxe Ocean View",
      type: "Deluxe",
      price: 2500,
      capacity: 2,
      size: "35 sqm",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop",
      amenities: ["wifi", "tv", "bath", "coffee"],
      availability: "Available",
      description: "Luxurious room with stunning ocean views and premium amenities."
    },
    {
      id: 2,
      name: "Executive Suite",
      type: "Suite",
      price: 4500,
      capacity: 4,
      size: "65 sqm",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
      amenities: ["wifi", "tv", "bath", "coffee", "parking"],
      availability: "Occupied",
      description: "Spacious suite perfect for business travelers and families."
    },
    {
      id: 3,
      name: "Standard Room",
      type: "Standard",
      price: 1800,
      capacity: 2,
      size: "25 sqm",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c6650b81?w=400&h=300&fit=crop",
      amenities: ["wifi", "tv", "bath"],
      availability: "Available",
      description: "Comfortable standard room with all essential amenities."
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [newRoom, setNewRoom] = useState({
    name: '',
    type: 'Standard',
    price: '',
    capacity: 2,
    size: '',
    image: '',
    amenities: [],
    availability: 'Available',
    description: ''
  });

  const amenityIcons = {
    wifi: <Wifi className="w-4 h-4" />,
    tv: <Tv className="w-4 h-4" />,
    bath: <Bath className="w-4 h-4" />,
    coffee: <Coffee className="w-4 h-4" />,
    parking: <Car className="w-4 h-4" />
  };

  const roomTypes = ['All', 'Standard', 'Deluxe', 'Suite'];

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || room.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleAddRoom = () => {
    if (newRoom.name && newRoom.price) {
      const room = {
        ...newRoom,
        id: Date.now(),
        price: parseInt(newRoom.price)
      };
      setRooms([...rooms, room]);
      setNewRoom({
        name: '',
        type: 'Standard',
        price: '',
        capacity: 2,
        size: '',
        image: '',
        amenities: [],
        availability: 'Available',
        description: ''
      });
      setShowAddForm(false);
    }
  };

  const handleEditRoom = () => {
    if (editingRoom.name && editingRoom.price) {
      setRooms(rooms.map(room => 
        room.id === editingRoom.id 
          ? { ...editingRoom, price: parseInt(editingRoom.price) }
          : room
      ));
      setEditingRoom(null);
    }
  };

  const handleDeleteRoom = (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const handleAmenityToggle = (amenity, isEditing = false) => {
    const target = isEditing ? editingRoom : newRoom;
    const setter = isEditing ? setEditingRoom : setNewRoom;
    
    const updatedAmenities = target.amenities.includes(amenity)
      ? target.amenities.filter(a => a !== amenity)
      : [...target.amenities, amenity];
    
    setter({ ...target, amenities: updatedAmenities });
  };

  const handleImageUpload = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload to a server and get a URL back
      // For demo purposes, we'll create a local URL
      const imageUrl = URL.createObjectURL(file);
      if (isEditing) {
        setEditingRoom({ ...editingRoom, image: imageUrl });
      } else {
        setNewRoom({ ...newRoom, image: imageUrl });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Room Management</h1>
          <p className="text-gray-600">Manage your hotel rooms, availability, and pricing</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type} Rooms</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Room
            </button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredRooms.map(room => (
            <div key={room.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  room.availability === 'Available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {room.availability}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
                  <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">{room.type}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {room.capacity} guests
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    {room.size}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  {room.amenities.map(amenity => (
                    <div key={amenity} className="p-2 bg-gray-100 rounded-lg" title={amenity}>
                      {amenityIcons[amenity]}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">₹{room.price.toLocaleString()}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingRoom(room)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Room Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Add New Room</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRoom.name}
                      onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRoom.type}
                      onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Suite">Suite</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRoom.price}
                      onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRoom.capacity}
                      onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })}
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num} guests</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <input
                      type="text"
                      placeholder="e.g., 35 sqm"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRoom.size}
                      onChange={(e) => setNewRoom({ ...newRoom, size: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {newRoom.image && (
                    <img src={newRoom.image} alt="Preview" className="mt-2 w-32 h-24 object-cover rounded-lg" />
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(amenityIcons).map(amenity => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => handleAmenityToggle(amenity)}
                        className={`px-3 py-2 rounded-lg border text-sm capitalize flex items-center gap-2 ${
                          newRoom.amenities.includes(amenity)
                            ? 'bg-blue-100 border-blue-300 text-blue-700'
                            : 'bg-gray-100 border-gray-300 text-gray-700'
                        }`}
                      >
                        {amenityIcons[amenity]}
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newRoom.description}
                    onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddRoom}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Add Room
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Room Modal */}
        {editingRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Edit Room</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingRoom.name}
                      onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingRoom.type}
                      onChange={(e) => setEditingRoom({ ...editingRoom, type: e.target.value })}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Suite">Suite</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingRoom.price}
                      onChange={(e) => setEditingRoom({ ...editingRoom, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingRoom.capacity}
                      onChange={(e) => setEditingRoom({ ...editingRoom, capacity: parseInt(e.target.value) })}
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num} guests</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingRoom.size}
                      onChange={(e) => setEditingRoom({ ...editingRoom, size: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editingRoom.availability}
                    onChange={(e) => setEditingRoom({ ...editingRoom, availability: e.target.value })}
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {editingRoom.image && (
                    <img src={editingRoom.image} alt="Preview" className="mt-2 w-32 h-24 object-cover rounded-lg" />
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(amenityIcons).map(amenity => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => handleAmenityToggle(amenity, true)}
                        className={`px-3 py-2 rounded-lg border text-sm capitalize flex items-center gap-2 ${
                          editingRoom.amenities.includes(amenity)
                            ? 'bg-blue-100 border-blue-300 text-blue-700'
                            : 'bg-gray-100 border-gray-300 text-gray-700'
                        }`}
                      >
                        {amenityIcons[amenity]}
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editingRoom.description}
                    onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleEditRoom}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingRoom(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomManagement;