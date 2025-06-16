// src/pages/ContactUs.jsx
import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Star,
  CheckCircle,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Data:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 lg:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            📞 Get In Touch
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-gray-800 to-slate-700 bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're here to make your stay extraordinary. Reach out to us anytime!
          </p>
        </div>

        {/* Contact Information Cards */}
<div className="flex justify-center mb-16">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
      <div className="flex justify-center mb-4">
        <Phone className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="font-bold text-lg text-gray-900 mb-2">Call Us</h3>
      <p className="text-gray-700 font-medium mb-1">+1 2223334444</p>
      <p className="text-gray-500 text-sm">24/7 Support Available</p>
    </div>

    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
      <div className="flex justify-center mb-4">
        <Mail className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="font-bold text-lg text-gray-900 mb-2">Email Us</h3>
      <p className="text-gray-700 font-medium mb-1">
        hotelstay@gmail.com
      </p>
      <p className="text-gray-500 text-sm">We reply within 2 hours</p>
    </div>

    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
      <div className="flex justify-center mb-4">
        <Clock className="w-8 h-8 text-purple-600" />
      </div>
      <h3 className="font-bold text-lg text-gray-900 mb-2">
        Business Hours
      </h3>
      <p className="text-gray-700 font-medium mb-1">24/7 Front Desk</p>
      <p className="text-gray-500 text-sm">Always here for you</p>
    </div>
  </div>
</div>


        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <MessageCircle className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">
                Send us a Message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="reservation">Room Reservation</option>
                    <option value="inquiry">General Inquiry</option>
                    <option value="complaint">Complaint</option>
                    <option value="feedback">Feedback</option>
                    <option value="event">Event Planning</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Quick Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">+1 2223334444</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-green-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">info@hotelstay.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-red-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">
                      London
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                What are your check-in and check-out times?
              </h3>
              <p className="text-gray-600">
                Check-in is at 3:00 PM and check-out is at 11:00 AM. Early
                check-in and late check-out may be available upon request.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                Do you offer airport transportation?
              </h3>
              <p className="text-gray-600">
                Yes, we provide complimentary airport shuttle service. Please
                contact us 24 hours in advance to arrange pickup.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                Is parking available?
              </h3>
              <p className="text-gray-600">
                We offer valet parking for $35 per night. Self-parking is
                available for $25 per night in our secure garage.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                Are pets allowed?
              </h3>
              <p className="text-gray-600">
                Yes, we are a pet-friendly hotel. We welcome pets up to 50 lbs
                with a $75 per stay pet fee.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                Do you have a fitness center?
              </h3>
              <p className="text-gray-600">
                Yes, our 24-hour fitness center features state-of-the-art
                equipment and is complimentary for all guests.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                What dining options are available?
              </h3>
              <p className="text-gray-600">
                We have three restaurants: fine dining, casual bistro, and a
                rooftop bar. Room service is available 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;