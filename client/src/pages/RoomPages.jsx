import React, { useState } from 'react';
import { Wifi, Coffee, Car, Waves, Mountain, Users, Bed } from 'lucide-react';
import RoomBookingCard from '../components/Rooms/RoomBookingCard';

const rooms = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        name: "Urbanza Suites",
        rating: 4,
        reviews: "200+ reviews",
        features: ["Room Service", "Mountain View", "Pool Access"],
        price: 399,
        type: "Double Bed",        
        description: "Spacious double room with premium amenities and stunning city views."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        name: "Urbanza Suites",
        rating: 4,
        reviews: "200+ reviews",
        features: ["Room Service", "Mountain View", "Pool Access"],
        price: 299,
        type: "Single Bed",        
        description: "Comfortable single room perfect for solo travelers and business trips."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        name: "Urbanza Suites",
        rating: 4,
        reviews: "200+ reviews",
        features: ["Free WiFi", "Free Breakfast", "Room Service"],
        price: 249,
        type: "Luxury Room",        
        description: "Premium luxury suite with exclusive amenities and personalized service."
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        name: "Urbanza Suites",
        rating: 4,
        reviews: "200+ reviews",
        features: ["Free WiFi", "Room Service", "Pool Access"],
        price: 199,
        type: "Family Suite",        
        description: "Spacious family suite with separate living area and kid-friendly amenities."
    },
];

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
    const [selectedRoomType, setSelectedRoomType] = useState("All Rooms");
    const [isLoading, setIsLoading] = useState(null);

    const handleBookNow = async (roomId, roomName, price) => {
        setIsLoading(roomId);
        // Simulate booking process
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
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                            Hotel <span className="text-amber-400">Rooms</span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Discover our premium accommodations designed for comfort, luxury, and unforgettable experiences
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-1">Filter by Room Type</h2>
                            <p className="text-sm text-gray-600">Find the perfect accommodation for your stay</p>
                        </div>
                        <select
                            value={selectedRoomType}
                            onChange={handleRoomTypeChange}
                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-xl border-none focus:outline-none font-medium text-sm cursor-pointer shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 min-w-[180px]"
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
                        Showing {filteredRooms.length} of {rooms.length} rooms
                    </p>
                </div>

                {/* Room Cards */}
                <div className="space-y-6 pb-12">
                    {filteredRooms.map((room, id) => (
                       <RoomBookingCard key={id} {...room}
                       getFeatureIcon={getFeatureIcon}
                       handleBookNow={handleBookNow}
                       isLoading={isLoading === room.id}
                       />
                    ))}
                </div>

                {/* Empty State */}
                {filteredRooms.length === 0 && (
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