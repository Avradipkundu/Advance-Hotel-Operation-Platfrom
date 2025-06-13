// src/pages/Homepage.jsx
import React from "react";
import RoomCard from "../Rooms/RoomCard";
import bgImage from '../../assets/hotel.jpg';
import { useState, useEffect } from "react";
import axios from 'axios';

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const fetchRooms = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:8000/api/allRooms", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response) {
                console.error("rooms not found")
            }
            setRooms(response.data);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        } finally {
            setLoadingData(false)
        }
    };
    useEffect(() => {
        fetchRooms();
    }, []);

    const handleBookNow = async (roomNo, roomName, price) => {
        setIsLoading(roomNo);
        setTimeout(() => {
            setIsLoading(null);
            alert(`Successfully initiated booking for ${roomName}!\nPrice: $${price}/night\nBooking ID: ${roomId}-${Date.now()}`);
        }, 1500);
    };
    return (
        <>
            <div
                className="bg-cover bg-center h-screen"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover', // or 'contain'
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}
            >
                <div className="min-h-screen bg-opacity-30">
                    {/* Hero Section */}
                    <div className="flex items-center justify-center h-screen text-center">
                        <div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 font-serif">Welcome to HotelStay</h1>
                            <p className="text-2xl sm:text-3xl text-white font-extralight opacity-90">Find your perfect room</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto w-full max-w-7xl">
                <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                    <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-1 mx-auto sm:px-6 lg:px-8">
                        {/* Cards Section */}
                        <div className="bg-white py-16 md:py-16">
                            <div className="max-w-7xl mx-auto px-4">
                                <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-12">Featured Rooms</h2>
                                <h2 className="text-base md:text-2xl font-bold text-center text-gray-400 mb-6 md:mb-12">Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.</h2>
                                <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8">
                                    {loadingData ? (
                                        <div className="text-center text-gray-500 py-8">Loading rooms...</div>
                                    ) : (rooms.map((room, idx) => (
                                        <RoomCard key={idx} {...room}
                                            handleBookNow={handleBookNow}
                                            isLoading={isLoading === room._id}
                                        />
                                    )))
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </aside >
            </div >
        </>
    );
};

export default Home;