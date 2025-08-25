const LoaderOverlay = ({ children, overlay = false }) => {
    return (
        <div className={`relative ${overlay ? 'w-full h-full' : ''}`}>
            {overlay && children}

            <div className={`
				absolute inset-0 flex items-center justify-center 
				bg-black/40 backdrop-blur-sm 
				${overlay ? '' : 'relative'}
			`}>
                <svg
                    className="w-12 h-12 animate-spin text-yellow-400"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 
						22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            </div>
        </div>
    );
};

export default LoaderOverlay