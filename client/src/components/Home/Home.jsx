// src/pages/Homepage.jsx
import React from "react";
import RoomCard from "../Rooms/RoomCard";
import bgImage from '../../assets/hotel.jpg';

const rooms = [
    {
        image: "src/assets/image1.jpg",
        title: "Urbanza Suites",
        location: "Main Road 123 Street, 23 Colony",
        price: 399,
        rating: 4.8,
        bestSeller: true,
    },
    {
        image: "src/assets/image2.jpg",
        title: "Urbanza Suites",
        location: "Main Road 123 Street, 23 Colony",
        price: 350,
        rating: 4.1,
        bestSeller: false,
    },
    {
        image: "src/assets/image3.jpg",
        title: "Urbanza Suites",
        location: "Main Road 123 Street, 23 Colony",
        price: 300,
        rating: 4.5,
        bestSeller: true,
    },
    {
        image: "src/assets/image4.jpg",
        title: "Urbanza Suites",
        location: "Main Road 123 Street, 23 Colony",
        price: 275,
        rating: 4.9,
        bestSeller: true,
    },
    {
        image: "src/assets/image5.jpg",
        title: "Urbanza Suites",
        location: "Main Road 123 Street, 23 Colony",
        price: 249,
        rating: 4.6,
        bestSeller: true,
    },
];

const Home = () => {
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
                    <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">                    
                    {/* Cards Section */}
                    <div className="bg-white py-16 md:py-16">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-12">Featured Rooms</h2>
                            <h2 className="text-base md:text-2xl font-bold text-center text-gray-400 mb-6 md:mb-12">Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.</h2>
                            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8">
                                {rooms.map((room, idx) => (
                                    <RoomCard key={idx} {...room} />
                                ))}
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