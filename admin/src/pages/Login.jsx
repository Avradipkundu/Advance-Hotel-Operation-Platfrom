import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { toast } from 'react-toastify'
import { GrUserAdmin } from "react-icons/gr"
import { ShieldUser, RectangleEllipsis } from 'lucide-react'

function Login() {
    const [formData, setFormData] = useState({ name:"", password:"" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/adminLogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                toast.success(`${data.msg}`);
                navigate('/dashboard');
            }   
            else{
                toast.error("login failed")
            }         
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='bg-gradient-to-r from-purple-100 to-purple-100 ... flex justify-center items-center min-h-screen'>
            <div className='rounded-lg p-8 shadow-2xl max-w-md w-full'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-6'>
                        <div className="flex justify-center">
                            <GrUserAdmin className="h-10 w-10 mb-4" />
                        </div>
                        <h2 className='text-2xl font-bold text-center text-gray-900'>Admin Portal</h2>
                        <p className="text-sm text-center text-gray-600">
                            Please sign in to access the admin dashboard
                        </p>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="username"
                            className='block text-sm font-medium text-gray-900 mb-2'>Username</label>
                        <div className='relative'>
                            <div className='absolute pl-3 inset-y-0 left-0 flex items-center h-full pointer-events-none'>
                                <ShieldUser className='w-6 h-6 text-gray-500' />
                            </div>
                            <input type="text"
                                className='w-full px-3 pl-10
                        border py-2 border-gray-400 rounded-lg text-black 
                        placeholder-gray-400 focus:outline-none
                        focus:ring-2 focus:ring-black 
                        focus:border-transparent transition duration-200
                         '
                                name="name"
                                id="username"
                                placeholder='Enter your username'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className='mb-5'>
                        <label htmlFor="password"
                            className='block text-sm font-medium text-gray-900 mb-2'>Password</label>
                        <div className='relative'>
                            <div className='absolute pl-3 inset-y-0 left-0 flex items-center h-full pointer-events-none'>
                                <RectangleEllipsis className='w-6 h-6 text-gray-500' />
                            </div>
                            <input type="password"
                                className='w-full px-3 pl-10
                        border py-2 border-gray-400 rounded-lg text-black 
                        placeholder-gray-400 focus:outline-none
                        focus:ring-2 focus:ring-black 
                        focus:border-transparent transition duration-200
                         '
                                name="password"
                                id="password"
                                placeholder='Enter your password'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit"
                        className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 shadow-2xl transition delay-150 duration-300 ease-in-out hover:scale-105 cursor-pointer'>
                        Sign In </button>
                </form>
            </div>
        </div>
    )
}

export default Login