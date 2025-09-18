import React from 'react'

const About = () => {
    return (
        <div className="relative min-h-dvh flex justify-center-safe w-screen px-[1rem] md:px-12 md:py-12 md:ps-0 bg-gradient-to-br from-indigo-800 to-pink-600 overflow-hidden">
            <div className="relative flex flex-col justify-center items-center p-6 md:w-[65%] bg-amber-50 dark:bg-neutral-700  bg-[url('/ooorganize9.svg')] bg-center bg-cover bg-no-repeat md:rounded-e-4xl  md:shadow-2xl">
                <div>
                    <header className="mb-8  text-center md:text-start">
                        <h1 className="text-7xl font-extrabold tracking-tight">About Us</h1>
                        <p className="md:w-fit text-xl text-gray-50 bg-pink-500 font-medium">
                        Helping everyone discover, rate, and relive great movies.
                    </p>
                </header>

                    <article className="max-w-2xl space-y-4 font-sans leading-relaxed text-lg">
                    <p>
                        JustRated.com is built by movie lovers, for movie lovers. From hidden gems to blockbuster hits,
                        we make it simple to explore, rate, and share your opinions.
                    </p>
                    <p>
                        Whether you're a casual viewer or a hardcore film buff, this is your place to dive into cinema,
                        find new favorites, and let your voice be heard.
                    </p>
                </article>
                </div>

                <img className="absolute h-16 bottom-0 mb-4 mx-auto" src="/just_rated_logo_new3.svg" alt="logo" />
            </div>


            <div className="relative hidden md:flex flex-1 flex-col justify-center items-center">
                <img className='absolute h-screen right-[-50%] opacity-50' src='/star_logo_2_blur.svg' alt='logo' />
                <img className='absolute h-screen bottom-[-50%] opacity-50' src='/star_logo_2_blur.svg' alt='logo' />
                <img className='absolute h-screen top-[-50%] opacity-50' src='/star_logo_2_blur.svg' alt='logo' />


                <img className='px-10 h-36 text-amber-50 z-10' src='/just_rated_logo_new3.svg' />
            </div>
        </div>
    )
}

export default About