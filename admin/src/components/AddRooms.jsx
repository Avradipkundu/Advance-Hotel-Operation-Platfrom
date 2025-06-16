import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify'

const AddRoomsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all rooms');
  const [showPopup, setShowPopup] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    roomNo: '',
    image: '',
    name: '',
    type: 'Single Bed',
    price: '',
    rating: '',
    features: [],
    description: ''
  });

  const API_BASE_URL = 'http://localhost:8000/api';
  const roomTypes = ['all rooms', 'Single Bed', 'Double Bed', 'Luxury Room', 'Family Suite'];
  const availableFeatures = [
    'Free WiFi',
    'Free Breakfast',
    'Room Service',
    'Pool Access',
    'Mountain View',
    'Parking'
  ];

  const fetchAllRooms = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:8000/api/allRooms", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Failed to fetch rooms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all rooms on component mount
  useEffect(() => {
    fetchAllRooms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        image: files.length === 1 ? files[0] : files
      }));
    }
  };

  const handleFeatureChange = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const createFormData = (data) => {
    const formDataObj = new FormData();

    // Add text fields
    formDataObj.append('roomNo', data.roomNo);
    formDataObj.append('name', data.name);
    formDataObj.append('type', data.type);
    formDataObj.append('price', data.price);
    formDataObj.append('rating', data.rating);
    formDataObj.append('description', data.description);
    formDataObj.append('features', data.features);

    // Add images - handle both single file and file array
    if (data.image) {
      if (Array.isArray(data.image)) {
        // Multiple files
        data.image.forEach((file) => {
          formDataObj.append("image", file);
        });
      } else {
        // Single file
        formDataObj.append("image", data.image);
      }
    }

    return formDataObj;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingRoom) {
        // Update existing room
        const formDataObj = createFormData(formData);
        const token = localStorage.getItem('token');

        // Use axios for update (consistent with your fetch pattern)
        const response = await axios.put(
          `${API_BASE_URL}/updateRooms/${editingRoom._id}`,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          }
        );

        // axios returns data directly, no need for .json()
        console.log('Room updated:', response.data);

        // Refresh the rooms list
        await fetchAllRooms();
        setEditingRoom(null);
      } else {
        // Create new room - also fix this part to use axios consistently
        const formDataObj = createFormData(formData);
        const token = localStorage.getItem('token');

        const response = await axios.post(
          `${API_BASE_URL}/addRooms`,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log('Room added:', response.data);

        // Refresh the rooms list
        await fetchAllRooms();
      }

      setShowPopup(false);
      resetForm();
    } catch (error) {
      console.error('Error saving room:', error);
      setError('Failed to save room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      roomNo: '',
      image: '',
      name: '',
      type: 'Single Bed',
      price: '',
      rating: '',
      features: [],
      description: ''
    });
  };

  const closePopup = () => {
    setShowPopup(false);
    setEditingRoom(null);
    resetForm();
    setError('');
  };

  const editRoom = (room) => {
    setEditingRoom(room);
    setFormData({
      roomNo: room.roomNo,
      image: room.image,
      name: room.name,
      type: room.type,
      price: room.price,
      rating: room.rating,
      features: room.features,
      description: room.description
    });
    setShowPopup(true);
  };

  const deleteRoom = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?'))
      return;
    setLoading(true);
      setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_BASE_URL}/deleteRooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const msg = await response.data
      if(!msg.message){
        console.log("msg not found")
      }
      toast.success(`${msg.message}`)

      console.log('Room deleted successfully');
      

      // Refresh the rooms list
      await fetchAllRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
      setError('Failed to delete room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter rooms based on selected filter
  const filteredRooms = rooms.filter(room => {
    if (selectedFilter === 'all rooms') return true;
    if (selectedFilter === 'Single Bed') return room.type === 'Single Bed'
    if (selectedFilter === 'Double Bed') return room.type === 'Double Bed'
    if (selectedFilter === 'Luxury Room') return room.type === 'Luxury Room'
    if (selectedFilter === 'Family Suite') return room.type === 'Family Suite'
    return true;
  });

  return (
    <div className="p-5 max-w-6xl mx-auto font-sans">
      <h1 className="text-4xl text-gray-800 text-center mb-8 font-bold">Add Rooms</h1>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button
            onClick={() => setError('')}
            className="float-right text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-8 gap-5 flex-col md:flex-row">
        <div className="flex-1 max-w-xs w-full">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-base bg-white cursor-pointer transition-colors duration-300 focus:outline-none focus:border-blue-500"
            disabled={loading}
          >
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-blue-500 text-white border-none py-3 px-6 rounded-lg text-base font-bold cursor-pointer transition-colors duration-300 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setShowPopup(true)}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Add Room'}
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}

      {/* Display Added Rooms */}
      {!loading && rooms.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Added Rooms ({filteredRooms.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div key={room.roomNo} className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Room Images */}
                {room.image && (
                  <div className="mb-4">
                    <img
                      src={`http://localhost:8000${room.image}`}
                      alt={room.name}
                      className="w-full h-48 object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />

                  </div>
                )}

                {/* Room Details */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-800">{room.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editRoom(room)}
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRoom(room._id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Room #{room.roomNo}
                    </span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded capitalize">
                      {room.type}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-black">${room.price}/night</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600 ml-1">{room.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{room.description}</p>

                  {/* Features */}
                  {room.features.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {room.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                        {room.features.length > 3 && (
                          <span className="text-xs text-gray-500">+{room.features.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Rooms Message */}
      {!loading && rooms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No rooms added yet</h3>
          <p className="text-gray-500">Click "Add Room" to create your first room listing</p>
        </div>
      )}

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-11/12 max-w-2xl max-h-screen overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h2 className="m-0 text-gray-800 text-2xl font-semibold">
                {editingRoom ? 'Edit Room' : 'Add New Room'}
              </h2>
              <button
                className="bg-transparent border-none text-2xl cursor-pointer text-gray-600 p-0 w-8 h-8 flex items-center justify-center hover:text-gray-800 transition-colors duration-200"
                onClick={closePopup}
                disabled={loading}
              >
                ×
              </button>
            </div>

            <div className="p-5">
              <div className="mb-5">
                <label htmlFor="roomNo" className="block mb-2 font-bold text-gray-800">Room Number:</label>
                <input
                  type="text"
                  id="roomNo"
                  name="roomNo"
                  value={formData.roomNo}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-md text-sm transition-colors duration-300 focus:outline-none focus:border-blue-500"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-800">
                  {editingRoom ? 'Update Images (optional):' : 'Select Image/Images:'}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                    className="hidden"
                    required={!editingRoom}
                    disabled={loading}
                  />
                  <label
                    htmlFor="image"
                    className={`w-full p-3 border-2 border-dashed border-gray-300 rounded-md text-sm cursor-pointer transition-colors duration-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center bg-gray-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="text-center">
                      <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>

                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 10MB each</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="name" className="block mb-2 font-bold text-gray-800">Room Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-md text-sm transition-colors duration-300 focus:outline-none focus:border-blue-500"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="type" className="block mb-2 font-bold text-gray-800">Room Type:</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-md text-sm transition-colors duration-300 focus:outline-none focus:border-blue-500"
                  required
                  disabled={loading}
                >
                  <option value="Single Bed">Single Bed</option>
                  <option value="Double Bed">Double Bed</option>
                  <option value="Luxury Room">Luxury Room</option>
                  <option value="Family Suite">Family Suite</option>
                </select>
              </div>

              <div className="mb-5">
                <label htmlFor="price" className="block mb-2 font-bold text-gray-800">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-md text-sm transition-colors duration-300 focus:outline-none focus:border-blue-500"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="rating" className="block mb-2 font-bold text-gray-800">Rating:</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-md text-sm transition-colors duration-300 focus:outline-none focus:border-blue-500"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-bold text-gray-800">Features:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {availableFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`feature-${index}`}
                        checked={formData.features.includes(feature)}
                        onChange={() => handleFeatureChange(feature)}
                        className="w-auto m-0 accent-blue-500"
                        disabled={loading}
                      />
                      <label htmlFor={`feature-${index}`} className="m-0 font-normal cursor-pointer text-gray-700">
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="description" className="block mb-2 font-bold text-gray-800">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-3 border-2 border-gray-300 rounded-md text-sm transition-colors duration-300 focus:outline-none focus:border-blue-500 resize-vertical"
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex gap-4 justify-end mt-8 pt-5 border-t border-gray-200 flex-col md:flex-row">
                <button
                  type="button"
                  onClick={closePopup}
                  className="bg-gray-500 text-white border-none py-3 px-6 rounded-md cursor-pointer text-sm transition-colors duration-300 hover:bg-gray-600 disabled:opacity-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-green-500 text-white border-none py-3 px-6 rounded-md cursor-pointer text-sm font-bold transition-colors duration-300 hover:bg-green-600 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (editingRoom ? 'Update Room' : 'Add Room')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRoomsPage;