import React, { useState, useEffect } from 'react';
import { Wifi, Coffee, Car, Waves, Mountain, Users, Bed } from 'lucide-react';
import RoomBookingCard from '../components/Rooms/RoomBookingCard';
import axios from 'axios';

const getFeatureIcon = (feature) => {
    const iconMap = {
        "Free WiFi": <Wifi className="w-3 h-3" />,
        "Free Breakfast": <Coffee className="w-3 h-3" />,
        "Room Service": <Bed className="w-3 h-3" />,
        "Pool Access": <Waves className="w-3 h-3" />,
        "Mountain View": <Mountain className="w-3 h-3" />,
        "Parking": <Car className="w-3 h-3" />,
    };
    return iconMap[feature] || <Users className="w-3 h-3" />;
};

function RoomPages() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("All Rooms");
    const [isLoading, setIsLoading] = useState(null);
    const [loadingData, setLoadingData] = useState(true);

    const fetchRooms = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:8000/api/allRooms",{
                    headers: { Authorization: `Bearer ${token}`}
                });
                if(!response){
                    console.error("rooms not found")
                }
                setRooms(response.data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            } finally{
                setLoadingData(false)
            }
        };
    useEffect(() => {
        fetchRooms();
    }, []);

    const handleBookNow = async (roomId, roomName, price) => {
        setIsLoading(roomId);
        setTimeout(() => {
            setIsLoading(null);
            alert(`Successfully initiated booking for ${roomName}!\nPrice: $${price}/night\nBooking ID: ${roomId}-${Date.now()}`);
        }, 1500);
    };

    const handleRoomTypeChange = (e) => {
        setSelectedRoomType(e.target.value);
    };

    const filteredRooms = selectedRoomType === "All Rooms"
        ? rooms
        : rooms.filter(room => room.type === selectedRoomType);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
                <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-5xl font-bold mb-4">Hotel <span className="text-amber-400">Rooms</span></h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Discover our premium accommodations designed for comfort, luxury, and unforgettable experiences
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
                {/* Filter */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-1">Filter by Room Type</h2>
                            <p className="text-sm text-gray-600">Find the perfect accommodation for your stay</p>
                        </div>
                        <select
                            value={selectedRoomType}
                            onChange={handleRoomTypeChange}
                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-xl font-medium shadow-lg hover:from-amber-600 hover:to-amber-700 transition"
                        >
                            <option value="All Rooms">All Rooms</option>
                            <option value="Single Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Luxury Room">Luxury Room</option>
                            <option value="Family Suite">Family Suite</option>
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600 text-sm">
                        {loadingData ? 'Loading rooms...' : `Showing ${filteredRooms.length} of ${rooms.length} rooms`}
                    </p>
                </div>

                {/* Room Cards */}
                <div className="space-y-6 pb-12">
                    {loadingData ? (
                        <div className="text-center text-gray-500 py-8">Loading rooms...</div>
                    ) : (
                        filteredRooms.map((room, index) => (
                            <RoomBookingCard
                                key={index}
                                {...room}                                
                                getFeatureIcon={getFeatureIcon}
                                handleBookNow={handleBookNow}
                                isLoading={isLoading === room.roomNo}
                            />
                        ))
                    )}
                </div>

                {/* Empty State */}
                {!loadingData && filteredRooms.length === 0 && (
                    <div className="text-center py-16">
                        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                            <Bed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No rooms found</h3>
                            <p className="text-gray-600">Try adjusting your filter to see more options.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RoomPages;
