// src/components/Profile.jsx
import React, { useState } from 'react';
import { X, Edit, Save, User, Mail, Phone, MapPin, Lock, Eye, EyeOff } from 'lucide-react';

const Profile = ({ isOpen, onClose, user, setUser, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  if (!isOpen) return null;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
    // Here you would typically make an API call to update user data
  };

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

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordUpdate = () => {
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!');
      return;
    }
    // Here you would make an API call to update password
    alert('Password updated successfully!');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                  value={passwords.current}
                  onChange={(e) =>
                    handlePasswordChange("current", e.target.value)
                  }
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <input
                type="password"
                placeholder="New Password"
                value={passwords.new}
                onChange={(e) => handlePasswordChange("new", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={passwords.confirm}
                onChange={(e) =>
                  handlePasswordChange("confirm", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <button
                onClick={handlePasswordUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Lock size={18} />
                <span>Update Password</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex space-x-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save size={18} />
                <span>Save Changes</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Logout Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
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