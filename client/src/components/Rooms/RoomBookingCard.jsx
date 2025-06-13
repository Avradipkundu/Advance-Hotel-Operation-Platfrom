import React from 'react'
import {Star} from 'lucide-react'

const RoomBookingCard = ({
roomNo,
  image,
  name,
  type,
  price,
  reviews,
  rating,
  description,
  features = [],
  getFeatureIcon = () => null,
  handleBookNow = () => {},
  isLoading = false,
}) => (
    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
        <div className="flex flex-col lg:flex-row">
            {/* Room Image */}
            <div className="lg:w-80 h-64 lg:h-auto relative overflow-hidden">
                <img
                    src={`http://localhost:8000${image}`}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                    {type}
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    ${price}
                </div>
            </div>

            {/* Room Details */}
            <div className="flex-1 p-6 lg:p-8">
                <div className="h-full flex flex-col justify-between">
                    <div>
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-800 transition-colors">
                                {name}
                            </h3>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < rating
                                                ? "text-amber-400 fill-current"
                                                : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 font-medium">{reviews}</span>
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {features.map((feature, id) => (
                                <div
                                    key={id}
                                    className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
                                >
                                    {getFeatureIcon(feature)}
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price and Book Section */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4 border-t border-gray-100">
                        <div>
                            <div className="text-3xl font-bold text-gray-800 mb-1">
                                ${price}
                                <span className="text-lg font-normal text-gray-500 ml-1">/night</span>
                            </div>
                            <p className="text-sm text-gray-600">Best price guarantee</p>
                        </div>
                        <button
                            onClick={() => handleBookNow(roomNo, name, price)}
                            disabled={isLoading}
                            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? "Processing..." : "Book Now"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default RoomBookingCard