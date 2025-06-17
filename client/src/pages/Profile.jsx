// src/components/Profile.jsx
import React, { useState } from 'react';
import { X, Edit, Save, User, Mail, Phone, MapPin, Lock } from 'lucide-react';
import axios from 'axios'
import { toast } from 'react-toastify';

const Profile = ({ isOpen, onClose, user, setUser, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false); 
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleSave = async (e) => {
    e.preventDefault();    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:8000/api/updateMyProfile', editedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        setUser(response.data.user);
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // const handlePasswordChange = (field, value) => {
  //   setPasswords(prev => ({
  //     ...prev,
  //     [field]: value
  //   }));
  // };

  // const handlePasswordUpdate = async(e) => {
  //   e.preventDefault()
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.put('http://localhost:8000/api/updateMyProfile', passwords,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     );
  //     if (response.status === 200) {
  //       setPasswords(passwords)
  //       toast.success("Password updateed successfully")
  //     }
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //     toast.error(error.response?.data?.message || 'Failed to update profile');
  //   }    
  // };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Picture Section */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {user.name}
              </h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit size={18} />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Personal Information
            </h4>

            {/* Name */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <User size={16} />
                <span>Full Name</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Mail size={16} />
                <span>Email Address</span>
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-50 rounded-lg">{user.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Phone size={16} />
                <span>Phone Number</span>
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedUser.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-50 rounded-lg">
                  {user.phone || "Not provided"}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <MapPin size={16} />
                <span>Address</span>
              </label>
              {isEditing ? (
                <textarea
                  value={editedUser.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-50 rounded-lg">
                  {user.address || "Not provided"}
                </p>
              )}
            </div>
          </div>

          {/* Password Change Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Change Password
            </h4>

            <div className="space-y-3">              

              <input
                type="password"
                placeholder="New Password"
                value={editedUser?.newPassword || ""}
                onChange={(e) => handleInputChange("newPassword", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={editedUser?.confirmPassword || ""}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              {/* <button
                onClick={handlePasswordUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Lock size={18} />
                <span>Update Password</span>
              </button> */}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex space-x-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Save size={18} />
                <span>Save Changes</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Logout Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;