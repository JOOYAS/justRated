import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="backdrop-blur-2xl bg-gradient-to-t from-black via-black/50 to-transparent text-neutral-200 bottom-0">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row-reverse items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <img className="h-8" src="/just_rated_logo_new3.svg" alt="logo" />
                </div>

                <nav className="flex gap-6 text-sm">
                    <Link to="/" className="hover:text-amber-500">Home</Link>
                    <Link to="/movies" className="hover:text-amber-500">Movies</Link>
                    <Link to="/about" className="hover:text-amber-500">About</Link>
                    <Link to="/profile" className="hover:text-amber-500">Account</Link>
                </nav>
            </div>

            <div className="border-t border-neutral-700 bg-orange-800 text-center py-4 text-xs text-neutral-100">
                © {new Date().getFullYear()} JustRated. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer