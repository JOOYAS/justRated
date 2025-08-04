import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="movie-header">
            <div className="logo">
                {/* <img src="/film.svg" alt="logo" /> */}
                <span>MovieReview</span>
            </div>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/movies">Movies</Link>
                <Link to="/about">About</Link>
                <Link to="/account">Account</Link>
            </nav>
        </header>
    )
}

export default Header