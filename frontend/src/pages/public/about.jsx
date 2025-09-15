import React from 'react'

const About = () => {
    return (
        <section className="h-dvh flex justify-center items-center">
            <div className="mx-auto md:px-96 text-center fixed inset-0 -z-10 bg-emerald-200 dark:bg-emerald-900 bg-[url('/bbblurry2.svg')]  bg-top bg-cover bg-no-repeat ">
            </div>
            <div className='max-w-2xl px-6 z-10'>
                <header className="mb-8">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-1">About Us</h1>
                    <p className="text-xl text-gray-500 dark:text-gray-50 font-medium">
                        Helping everyone discover, rate, and relive great movies.
                    </p>
                </header>

                <article className="pt-4 space-y-8 font-sans leading-relaxed text-lg">
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
            <img className="hidden md:block left-0 h-32 bg-black dark:bg-transparent rounded-2xl" src="/just_rated_logo_new3.svg" alt="logo" />

        </section>
    )
}

export default About