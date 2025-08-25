import React from 'react'
import { Link } from 'react-router-dom'
import ScrollableCarousel from '../../components/scroll_carousel'
import MovieCard from '../../components/moviecard';

const Home = () => {
    const mockMovies = [
        {
            _id: "1",
            name: "Echoes of Tomorrow",
            rating: 8.3,
            poster: { url: "https://picsum.photos/300/400?random=1" },
        },
        {
            _id: "2",
            name: "Neon Horizon",
            rating: 7.9,
            poster: { url: "https://picsum.photos/300/400?random=1" },
        },
        {
            _id: "3",
            name: "Shadows in Silence",
            rating: 8.6,
            poster: { url: "https://picsum.photos/300/400?random=1" },
        },
        {
            _id: "4",
            name: "Crimson Legacy",
            rating: 7.2,
            poster: { url: "https://picsum.photos/300/400?random=1" },
        },
        {
            _id: "5",
            name: "Fragments of Lightssssssssssssss",
            rating: 8.8,
            poster: { url: "https://picsum.photos/300/400?random=1" },
        },
        {
            _id: "6",
            name: "Silent Storm",
            rating: 6.9,
            poster: { url: "https://picsum.photos/300/400?random=1" },
        },
        {
            _id: "7",
            name: "Beyond the Abyss",
            rating: 8.1,
            poster: { url: "https://picsum.photos/300/400?random=1" },
        },
        {
            _id: "8",
            name: "Glass Empire",
            rating: 7.5,
            poster: { url: "https://picsum.photos/300/400?random=1" },
        },
        {
            _id: "9",
            name: "Midnight Veil",
            rating: 8.0,
            poster: { url: "https://picsum.photos/300/400?random=1" },
        },
        {
            _id: "10",
            name: "Rise of Dawn",
            rating: 8.4,
            poster: { url: "https://picsum.photos/300/400?random=1" },
        },
    ];

    return (
        <>
            <div className="fixed inset-0 -z-10 bg-emerald-200 dark:bg-indigo-950 bg-[url('/bbblurry2.svg')]  bg-top bg-cover bg-no-repeat"></div>
            <div>
                <section className='w-screen md:flex md:pb-10 md:h-[86vh] items-center justify-between overflow-hidden'>
                    <div className='px-4 py-40 pb-56 md:py-60 md:w-2/3 text-center wrap-anywhere'>
                        <h1 className='font-extrabold sansation-bold italic text-3xl md:text-4xl mb-6 text-white dark:text-amber-300'>
                            One place for precise movie details<br />
                        </h1>
                        <p className='font-light text-xl md:text-2xl mb-8 md:mb-16'>Accurate, updated, and trusted by movie lovers everywhere.</p>
                        <Link to={'/movies'} className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg hover:border-4 border-amber-100 hover:shadow-xl transition-transform hover:scale-105 duration-200">
                            Explore Movies 🍿
                        </Link>
                    </div>

                    <div className="group hidden relative w-screen flex-1 h-52 md:flex justify-center transition-all duration-300 mb-48">
                        <img src="https://picsum.photos/300" className="absolute w-52 h-80 rounded-xl shadow-lg bg-indigo-950/25 transition-transform duration-200 group-hover:left-40 group-hover:rotate-0 group-hover:scale-105 hover:z-30 hover:scale-125 hover:shadow-xl hover:border-4 border-amber-100" />
                        <img src="https://picsum.photos/300" className="absolute w-52 h-80 rounded-xl shadow-lg bg-indigo-950/25 transition-transform duration-200 group-hover:left-20 group-hover:rotate-0 group-hover:scale-105 rotate-[24deg] hover:z-30 hover:scale-125 hover:shadow-xl hover:border-4 border-amber-100" />
                        <img src="https://picsum.photos/300" className="absolute w-52 h-80 rounded-xl shadow-lg bg-indigo-950/25 transition-transform duration-200 group-hover:left-0 group-hover:rotate-0 group-hover:scale-105 transform rotate-[12deg] hover:z-30 hover:scale-125 hover:shadow-xl hover:border-4 border-amber-100"
                        />
                    </div>

                </section>

                <section className="relative h-[1rem] custom-top-fade bg-amber-50 dark:bg-neutral-800">
                    <div className='px-4 md:px-20 absolute w-full grid grid-cols-3 gap-2  -top-[800%]'>
                        <div className="p-2 md:p-6 rounded-4xl bg-indigo-900/15 backdrop-blur-3xl text-center shadow-lg border-4 border-amber-100">
                            <span className="text-3xl">🎬</span>
                            <h3 className="font-bold mt-3">Vast Library</h3>
                            <p className="text-sm">1M+ movie details</p>
                        </div>
                        <div className="p-2 md:p-6 rounded-4xl bg-indigo-900/15 backdrop-blur-md text-center shadow-lg border-4 border-amber-100">
                            <span className="text-3xl">🙊</span>
                            <h3 className="font-bold mt-3">Spoiler-Free</h3>
                            <p className="text-sm">Reviews that don't ruin it</p>
                        </div>
                        <div className="p-2 md:p-6 rounded-4xl bg-indigo-900/15 backdrop-blur-md text-center shadow-lg border-4 border-amber-100">
                            <span className="text-3xl">🔥</span>
                            <h3 className="font-bold mt-3">Trending</h3>
                            <p className="text-sm">What the world's watching</p>
                        </div>
                    </div>

                </section>

                <section className='bg-amber-50 dark:bg-neutral-800 md:px-20  min-h-96 pt-10 flex-col gap-4 overflow-hidden'>
                    <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6 z-20'>Featured today</h2>
                    <ScrollableCarousel>
                        {mockMovies.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </ScrollableCarousel>


                    <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Top 10</h2>
                    <ScrollableCarousel>
                        {mockMovies.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </ScrollableCarousel>

                    <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Currently on Theaters</h2>
                    <ScrollableCarousel>
                        {mockMovies.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </ScrollableCarousel>
                </section>
            </div>
        </>
    )
}

export default Home