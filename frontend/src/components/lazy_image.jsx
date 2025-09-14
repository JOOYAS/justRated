import React, { useState } from 'react';

const LazyImage = ({ publicId, alt, className }) => {
    const [loaded, setLoaded] = useState(false);

    // Construct the low-quality placeholder URL
    const placeholder = `${import.meta.env.VITE_CLOUDINARY_LOW}${publicId}`;

    // Construct the high-quality image URL
    const highQualitySrc = `${import.meta.env.VITE_CLOUDINARY_MID}${publicId}`;

    return (
        <div className={`relative object-cover overflow-hidden ${className}`}>
            <img
                src={placeholder}
                alt="placeholder"
                className={`absolute inset-0 w-full h-full object-cover  transition-opacity duration-1000 ${loaded ? 'opacity-0' : 'opacity-100'}`}
                loading='eager'
            />
            <img
                src={highQualitySrc}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-100 ${loaded ? 'opacity-100 blur-none' : 'opacity-0 blur-sm'}`}
                loading='lazy'
            />
        </div>
    );
};

export default LazyImage;