// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import { X, Lock, Eye, EyeOff, Mail, CircleUserRound } from 'lucide-react';

const Login = ({ isOpen, onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });

    // Handle smooth entrance animation
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            setIsSignUp(!isSignUp);
        }
        // console.log(response)
        // console.log(isSignUp ? 'Sign Up:' : 'Login:', formData);
        // onClose();
    };

    const switchMode = () => {
        setIsSignUp(!isSignUp);
        setFormData({ email: '', password: '', confirmPassword: '', name: '' });
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300); // Match the animation duration
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {/* Simple Blurred Background */}
            <div
                className={`absolute inset-0 backdrop-blur-sm transition-all duration-800 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={handleClose}
            />


            {/* Modal with smooth scale and fade animation */}
            <div
                className={`relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 transition-all duration-300 ease-out transform ${isVisible
                        ? 'scale-100 opacity-100 translate-y-0'
                        : 'scale-95 opacity-0 translate-y-4'
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 font-bold hover:text-gray-800 focus:outline-none cursor-pointer"
                >
                    <X size={25} />
                </button>

                {/* Header with staggered animation */}
                <div className="text-center mb-6">
                    <div
                        className={`flex items-center justify-center gap-3 mb-2 transition-all duration-500 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                            }`}
                    >
                        {isSignUp && (
                            <CircleUserRound
                                size={28}
                                className="text-black transition-all duration-300 ease-out"
                            />
                        )}
                        <h2 className="text-2xl font-bold text-gray-800">
                            {isSignUp ? 'Create Account' : 'Welcome Back !'}
                        </h2>
                    </div>
                </div>

                {/* Form with staggered animation */}
                <form
                    onSubmit={handleSubmit}
                    className={`space-y-4 transition-all duration-500 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    {/* Name Field (Sign Up only) */}
                    {isSignUp && (
                        <div className="transition-all duration-300 ease-out">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-out"
                                required
                            />
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="transition-all duration-300 ease-out">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-out"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="transition-all duration-300 ease-out">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-out"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 ease-out"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password (Sign Up only) */}
                    {isSignUp && (
                        <div className="transition-all duration-300 ease-out">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-out"
                                required
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200 ease-out transform hover:scale-[1.02] font-medium"
                    >
                        {isSignUp ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                {/* Switch Mode with staggered animation */}
                <div
                    className={`text-center mt-6 transition-all duration-500 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                        }`}
                >
                    <p className="text-sm text-gray-600">
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button
                            type="button"
                            onClick={switchMode}
                            className="text-blue-600 hover:text-blue-800 font-medium transition-all duration-200 ease-out hover:underline"
                        >
                            {isSignUp ? 'Sign in' : 'Sign up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;