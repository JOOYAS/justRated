import React from 'react'

const Footer = () => {
    return (
        <footer className="movie-footer">
            <p>&copy; {new Date().getFullYear()} MovieReview. All rights reserved.</p>
        </footer>
    )
}

export default Footer