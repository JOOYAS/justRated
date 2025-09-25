import React, { useState } from 'react';

const LazyImage = ({ publicId, alt, className = "bg-indigo-950/50 " }) => {
    const [loaded, setLoaded] = useState(false);

    // Construct the low-quality placeholder URL
    const placeholder = `${import.meta.env.VITE_CLOUDINARY_LOW}${publicId}`;

    // Construct the high-quality image URL
    const highQualitySrc = `${import.meta.env.VITE_CLOUDINARY_MID}${publicId}`;

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img
                src={placeholder}
                alt=""
                aria-label='placeholder'
                className={`absolute w-full h-full object-cover  transition-all duration-[2s] ${loaded ? 'opacity-0 blur-none' : 'opacity-100 blur-sm'}`}
                loading='eager'
            />
            <img
                src={highQualitySrc}
                alt='' aria-label={alt}
                onLoad={() => {
                    console.log('High-quality image loaded');
                    setLoaded(true);
                }}

                className={`absolute w-full h-full object-cover transition-all duration-[2s] ${loaded ? 'opacity-100 blur-none' : 'opacity-0 blur-xs'}`}
                loading='lazy'
            />
        </div>
    );
};

export default LazyImage;