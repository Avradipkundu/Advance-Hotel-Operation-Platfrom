// src/components/BookingModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, MapPin, Star, Calculator } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookingModal = ({ isOpen, onClose, roomData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,    
  });

  const [pricing, setPricing] = useState({
    nights: 0,
    basePrice: 0,
    guestSurcharge: 0,
    totalPrice: 0
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Calculate pricing whenever booking data changes
  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut && roomData) {
      const checkInDate = new Date(bookingData.checkIn);
      const checkOutDate = new Date(bookingData.checkOut);
      const nights = Math.max(0, Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));
      
      const basePrice = roomData.price * nights;
      const guestSurcharge = Math.max(0, (bookingData.guests - 2)) * 25 * nights;
      const totalPrice = basePrice + guestSurcharge;

      setPricing({
        nights,
        basePrice,
        guestSurcharge,
        totalPrice
      });
    } else {
      setPricing({ nights: 0, basePrice: 0, guestSurcharge: 0, totalPrice: 0 });
    }
  }, [bookingData, roomData]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Prepare reservation data for your Mongoose schema
      const reservationData = {
        checkInDate: bookingData.checkIn,
        checkOutDate: bookingData.checkOut,
        guests: bookingData.guests
      };

      console.log('Sending reservation data:', reservationData);

      // POST to your Express reservation endpoint
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/api/reservation/${roomData._id}`, reservationData,{
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Booking successful:', response.data);
      
      alert(`Booking confirmed for ${roomData?.name}!\nReservation ID: ${response.data._id}\nTotal: $${pricing.totalPrice} for ${pricing.nights} nights`);

      toast.success("Room booking successfully...")
      
      handleClose();
      
    } catch (error) {
      console.error('Booking failed:', error);
      const errorMessage = error.response?.data?.error || 'Booking failed. Please try again.';
      alert(`Booking Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];
  
  // Get minimum checkout date (day after checkin)
  const minCheckOut = bookingData.checkIn 
    ? new Date(new Date(bookingData.checkIn).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    : today;

  if (!isOpen || !roomData) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 backdrop-blur-sm transition-all duration-300 ease-out ${
          isVisible ? ' bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Modal - Responsive sizing */}
      <div 
        className={`relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out transform ${
          isVisible 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-white rounded-full p-2 shadow-md"
        >
          <X size={20} />
        </button>

        {/* Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Side - Room Image and Info */}
          <div className="relative">
            {/* Room Image */}
            <div className="relative h-48 sm:h-64 lg:h-full lg:min-h-[400px]">
              <img 
                src={`http://localhost:8000${roomData.image}`} 
                alt={roomData.name}
                className="w-full h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none"
              />
              <div className="absolute bottom-4 left-4 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                {roomData.type}
              </div>
            </div>

            {/* Room Info - Mobile/Tablet */}
            <div className="p-4 lg:hidden">              
              <h2 className="text-xl font-bold text-gray-800 mb-2">{roomData.name}</h2>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {"★".repeat(roomData.rating)}{"☆".repeat(5 - roomData.rating)}
                </div>
                <span className="text-sm text-gray-500">{roomData.reviews}</span>
              </div>
              
              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-3">
                {roomData.features?.slice(0, 3).map((feature, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              {/* Base Price */}
              <div className="text-lg font-bold text-gray-800">
                ${roomData.price} <span className="text-sm font-normal text-gray-500">/night</span>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className="p-4 sm:p-6">
            {/* Room Info - Desktop */}
            <div className="hidden lg:block mb-6">              
              <h2 className="text-xl font-bold text-gray-800 mb-2">{roomData.name}</h2>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {"★".repeat(roomData.rating)}{"☆".repeat(5 - roomData.rating)}
                </div>
                <span className="text-sm text-gray-500">{roomData.reviews}</span>
              </div>
              
              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-3">
                {roomData.features?.slice(0, 3).map((feature, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              {/* Base Price */}
              <div className="text-lg font-bold text-gray-800">
                ${roomData.price} <span className="text-sm font-normal text-gray-500">/night</span>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBooking} className="space-y-4">


              {/* Booking Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg">
                {/* Check-In */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-In *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="date"
                      name="checkIn"
                      value={bookingData.checkIn}
                      onChange={handleInputChange}
                      min={today}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Check-Out */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-Out *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="date"
                      name="checkOut"
                      value={bookingData.checkOut}
                      onChange={handleInputChange}
                      min={minCheckOut}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <select
                      name="guests"
                      value={bookingData.guests}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>
                          {num} Guest{num > 1 ? 's' : ''} 
                          {num > 2 && ` (+$${(num - 2) * 25}/night)`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              {pricing.nights > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Calculator size={16} className="text-blue-600" />
                    <h3 className="font-semibold text-blue-800">Price Breakdown</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>${roomData.price} × {pricing.nights} night{pricing.nights > 1 ? 's' : ''}</span>
                      <span>${pricing.basePrice}</span>
                    </div>
                    {pricing.guestSurcharge > 0 && (
                      <div className="flex justify-between text-orange-600">
                        <span>Extra guest charges ({bookingData.guests - 2} guest{bookingData.guests > 3 ? 's' : ''})</span>
                        <span>+${pricing.guestSurcharge}</span>
                      </div>
                    )}
                    <hr className="border-blue-200" />
                    <div className="flex justify-between font-bold text-lg text-blue-800">
                      <span>Total</span>
                      <span>${pricing.totalPrice}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Book Button */}
              <button
                type="submit"
                disabled={pricing.nights === 0 || isLoading}
                className={`w-full py-3 px-6 rounded-lg transition-colors duration-200 font-medium ${
                  pricing.nights > 0 && !isLoading
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading 
                  ? 'Processing...' 
                  : pricing.nights > 0 
                    ? `Book Now - $${pricing.totalPrice}` 
                    : 'Select Dates to Continue'
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;