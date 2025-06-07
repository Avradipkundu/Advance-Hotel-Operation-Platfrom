// src/components/RoomCard.jsx
import React from "react";
import { Star, MapPin } from "lucide-react";

const RoomCard = ({
  image,
  title,
  location,
  price,
  rating,
  bestSeller,
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden w-72 flex-shrink-0">
    <div className="relative">
      <img src={image} alt={title} className="h-40 w-full object-cover" />
      {bestSeller && (
        <span className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded shadow">
          Best Seller
        </span>
      )}
    </div>
    <div className="p-4">
      <div className="flex items-center mb-2">
        <h3 className="font-bold text-lg flex-1">{title}</h3>
        <span className="flex items-center text-orange-500 text-sm font-semibold">
          <Star className="w-4 h-4 mr-1 fill-orange-500" />
          {rating}
        </span>
      </div>
      <div className="flex items-center text-gray-500 text-sm mb-3">
        <MapPin className="w-4 h-4 mr-1" />
        {location}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-gray-800">
          ${price}
          <span className="text-base font-normal text-gray-500">/night</span>
        </span>
        <button className="px-4 py-1 bg-gray-100 rounded font-medium text-gray-700 hover:bg-blue-100 transition">
          Book Now
        </button>
      </div>
    </div>
  </div>
);

export default RoomCard;