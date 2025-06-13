// src/components/RoomCard.jsx
import React from "react";
import { Star, MapPin } from "lucide-react";

const RoomCard = ({
  roomNo,
  image,
  name,  
  price,
  rating,
  handleBookNow = () => {},
  isLoading = false,
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden w-72 flex-shrink-0">
    <div className="relative">
      <img src={`http://localhost:8000${image}`} alt={name} className="h-40 w-full object-cover" />      
    </div>
    <div className="p-4">
      <div className="flex items-center mb-2">
        <h3 className="font-bold text-lg flex-1">{name}</h3>
        <span className="flex items-center text-orange-500 text-sm font-semibold">
          <Star className="w-4 h-4 mr-1 fill-orange-500" />
          {rating}
        </span>
      </div>      
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-gray-800">
          ${price}
          <span className="text-base font-normal text-gray-500">/night</span>
        </span>
        <button 
        onClick={() => handleBookNow(roomNo, name, price)}
        disabled={isLoading}
        className="px-4 py-1 bg-gray-100 rounded font-medium text-gray-700 hover:bg-blue-100 transition">
          {isLoading ? "Processing..." : "Book Now"}
        </button>
      </div>
    </div>
  </div>
);

export default RoomCard;