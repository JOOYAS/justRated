const LoaderOverlay = ({ children, overlay = false }) => {
    return (
        <div className={`relative ${overlay ? 'w-full h-full' : ''}`}>
            {overlay && children}

            <div className={`
				absolute w-full h-full inset-0 flex items-center justify-center 
				bg-black/40 backdrop-blur-sm 
				${overlay ? '' : 'relative'}
			`}>
                <img src="/star_logo_2_blur.svg"
                    className="size-12 animate-spin text-yellow-400"
                    viewBox="0 0 24 24"
                />
            </div>
        </div>
    );
};

export default LoaderOverlay