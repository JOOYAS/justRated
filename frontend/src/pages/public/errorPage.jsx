import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    const error = useRouteError();
    const statusCode = error.status || 500;
    const errorImageUrl = `https://robohash.org/${statusCode}`; //just an robo image

    return (
        <div className="min-h-dvh flex">
            <div className="z-10 w-screen md:w-[65%] flex flex-col justify-center items-center text-center p-8 bg-amber-50 dark:bg-neutral-800 bg-[url('/ooorganize9.svg')] bg-center bg-cover bg-no-repeat ">
                <h1 className="flex text-9xl font-bold text-red-500 items-center"><span className='text-6xl text-amber-900 dark:text-gray-300'>Error  </span>{statusCode}</h1>
                <p className="mt-4 text-2xl font-semibold">
                    Page Not Found
                </p>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-primary mt-6"
                >
                    Go Back
                </button>
            </div>

            <div className="hidden flex-1 md:flex flex-col items-center justify-center bg-indigo-800" >
                <span className='text-[10rem] font-extrabold text-red-500 custom-animate [writing-mode:vertical-lr] [text-orientation:upright]' >{statusCode}</span>
                <img className='h-10 mb-20' src='/just_rated_logo_new3.svg' alt='logo' />
            </div>
        </div>
    )
}

export default ErrorPage