import React from 'react'
import { Link } from 'react-router-dom';
import { Hotel } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-[#d1d5dc] ">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-8 md:px-16 lg:py-12 lg:px-24">
                <div className="flex flex-col md:flex-row md:justify-between gap-8">
                    <div className="mb-6 mt-4 md:mb-0 flex-1 min-w-[220px]">
                        <div className='flex items-center space-x-2'>
                            {/* <div className='absolute inset-y-0 left-0 flex items-center h-full'> */}
                            <Hotel className='size-8 text-gray-900 pointer-events-none'/>
                            <Link to="/" className="text-2xl font-bold text-gray-900">
                                HotelStay                                
                            </Link>
                        {/* </div>                         */}
                        </div> 
                        <p className='pt-6 text-gray-500 text-sm max-w-80'>Discover the world's most extraordinary places to stay, from boutique hotels to luxury rooms.</p>                       
                    </div>
                    <div className="grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-3 flex-1">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-800 uppercase">Resources</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <Link to="/home" className="hover:underline">
                                        Home
                                    </Link>
                                </li>
                                <li className='mb-4'>
                                    <Link to="/about" className="hover:underline">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/rooms" className="hover:underline">
                                        Rooms
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-800 uppercase">Follow us</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <a
                                        href=""
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Facebook
                                    </a>
                                </li>                                
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-800 uppercase">Legal</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <span className="text-sm text-gray-500 sm:text-center">
                        &copy; 2025
                        <a href="" className="hover:underline">
                            HotelStay
                        </a>
                        . All Rights Reserved.
                    </span>
                    <div className="flex flex-wrap mt-2 space-x-4 sm:mt-0">
                        <Link to="#" className="text-gray-500 hover:text-gray-900">
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 8 19"
                            >
                                <path
                                    fillRule="evenodd"
    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
    clipRule="evenodd"
                                />
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </Link>
                        
                        <Link to="#" className="text-gray-500">
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 17"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="sr-only">Twitter page</span>
                        </Link>                                              
                    </div>
                </div>
            </div>
        </footer>
    );
}