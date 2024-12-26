import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase'
import SignOut from './SignOut';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const [user] = useAuthState(auth);

    // Helper function to determine if a link is active
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    // Navigation items - now including authentication state
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/dashboard', label: 'Dashboard' },
    ];

    return (
        <nav className="bg-color-30">
            <div className="max-w-4xl mx-auto px-4">
                {/* Main Navbar Content */}
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <Link 
                        to="/" 
                        className="text-xl font-semibold text-color-60 hover:text-color-10-a transition-colors"
                    >
                        FitTrack
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map(({ path, label }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`${
                                    isActive(path)
                                        ? 'text-color-10-a'
                                        : 'text-color-60 hover:text-color-10-a'
                                } transition-colors text-lg font-semibold`}
                            >
                                {label}
                            </Link>
                        ))}
                        {user && (
                            <div className="ml-6">
                                <SignOut />
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-color-60 hover:text-color-10-a p-2"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-color-60/10">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map(({ path, label }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`${
                                    isActive(path)
                                        ? 'text-color-10-a'
                                        : 'text-color-60 hover:text-color-10-a'
                                } block px-3 py-2 text-lg font-semibold transition-colors`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                        {user && (
                            <div className="px-3 py-2">
                                <SignOut />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>

        // <nav className="
        //     p-4 bg-color-30 text-color-60 text-lg font-semibold
        // ">
        //     <div className="
        //         max-w-4xl mx-auto 
        //         flex items-center justify-between gap-7
        //     ">
        //         <Link 
        //             to="/" 
        //         >
        //             Home
        //         </Link>
        //         <div className='flex items-center space-x-6'>
        //             <Link
        //                 to="/dashboard"
        //             >
        //                 Dashboard
        //             </Link>

        //             { user && (
        //                 <div className='flex gap-6 items-center'>
        //                     <SignOut />
        //                 </div>
        //             )}

        //         </div>
        //     </div>

        // </nav>
    )
}