import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollableCarousel from '../../components/scroll_carousel'
import MovieCard from '../../components/movie_card';
import axiosInstance from '../../../utils/axios_instance';
import PosterDeck from '../../components/poster_deck';

const Home = () => {
    const [movies, setMovies] = useState([])

    const mockMovies = [
        {
            _id: "68bfbecaf26ddf203f1682d8",
            title: "Echoes of Tomorrow",
            rating: 8.3,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "2",
            title: "Neon Horizon",
            rating: 7.9,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "3",
            title: "Shadows in Silence",
            rating: 8.6,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "4",
            title: "Crimson Legacy",
            rating: 7.2,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "5",
            title: "Fragments of Lightssssssssssssss",
            rating: 8.8,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "6",
            title: "Silent Storm",
            rating: 6.9,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "7",
            title: "Beyond the Abyss",
            rating: 8.1,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "8",
            title: "Glass Empire",
            rating: 7.5,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "9",
            title: "Midnight Veil",
            rating: 8.0,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "10",
            title: "Rise of Dawn",
            rating: 8.4,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
    ];

    useEffect(() => {
        axiosInstance.get('/movies')
            .then(res => setMovies(res.data?.movies))
            .catch(err => {
                console.error(err)
                setMovies(mockMovies)
            })
    }, [])

    return (//bg-[url('/bbblurry2.svg')]
        <> 
            <div className="fixed inset-0 -z-10 bg-emerald-400 dark:bg-indigo-950 blur-xs md:blur-none bg-[url('/film.jpg')] bg-right bg-cover bg-no-repeat"></div>
            <div>
                <section className='w-screen md:flex md:pb-10 h-[75vh] md:h-[84vh] items-center justify-between overflow-hidden'>
                    <div className='px-4 py-30 pb-56 md:py-60 md:w-2/3 text-center wrap-anywhere shadow-2xl'>
                        <h1 className='font-extrabold sansation-bold italic text-3xl md:text-4xl mb-6 text-amber-300'>
                            One place for precise movie details<br />
                        </h1>
                        <p className='font-normal text-amber-100 text-xl md:text-2xl mb-8 md:mb-16'>Accurate, updated, and trusted by movie lovers everywhere.</p>
                        <Link to={'/movies'} className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg border-transparent border-4  hover:border-amber-100 hover:shadow-xl transition-transform hover:scale-105 duration-200">
                            Explore Movies 🍿
                        </Link>
                    </div>

                    {/* just_rated/xpmjzzzl1h1wpawtna7d
                    just_rated/qmsfy4h3h5ntznc6l4xl
                    iu_a9cjfv
                    iu_iqclwv
                    iu_vbchlf*/}
                    <div className="group hidden relative w-screen flex-1 h-52 md:flex justify-center ms-28 transition-all duration-300 mb-48">
                        <PosterDeck />
                    </div>


                </section>

                <section className="relative h-[1rem] custom-top-fade bg-amber-50 dark:bg-neutral-800">
                    <div className='px-4 md:px-20 absolute w-full grid grid-cols-3 gap-2  -top-[800%]'>
                        <div className="group p-2 md:p-6 rounded-4xl bg-indigo-900/15 backdrop-blur-3xl text-center shadow-lg border-4 border-amber-100 hover:bg-amber-500/15">
                            <span className="text-5xl group-hover:animate-pulse">🎬</span>
                            <h3 className="font-bold mt-3">Vast Library</h3>
                            <p className="text-sm">1M+ movie details</p>
                        </div>
                        <div className="group p-2 md:p-6 rounded-4xl bg-indigo-900/15 backdrop-blur-md text-center shadow-lg border-4 border-amber-100 hover:bg-red-500/15">
                            <span className="text-5xl group-hover:animate-pulse">🙊</span>
                            <h3 className="font-bold mt-3">Spoiler-Free</h3>
                            <p className="text-sm">Reviews that don't ruin it</p>
                        </div>
                        <div className="group p-2 md:p-6 rounded-4xl bg-indigo-900/15 backdrop-blur-md text-center shadow-lg border-4 border-amber-100 hover:bg-blue-500/15">
                            <span className="text-5xl group-hover:animate-pulse">🔥</span>
                            <h3 className="font-bold mt-3">Trending</h3>
                            <p className="text-sm">What the world's watching</p>
                        </div>
                    </div>

                </section>

                <section className='bg-amber-50 dark:bg-neutral-800 md:px-20  min-h-96 pt-10 flex-col gap-4 overflow-hidden'>
                    <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6 z-20'>Featured today</h2>
                    <ScrollableCarousel>
                        {movies?.map((movie) => (
                            <MovieCard key={movie?._id} movie={movie} />
                        ))}
                    </ScrollableCarousel>


                    <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Top 10</h2>
                    <ScrollableCarousel>
                        {movies?.map((movie) => (
                            <MovieCard key={movie?._id} movie={movie} />
                        ))}
                    </ScrollableCarousel>

                    <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Currently on Theaters</h2>
                    <ScrollableCarousel>
                        {movies?.map((movie) => (
                            <MovieCard key={movie?._id} movie={movie} />
                        ))}
                    </ScrollableCarousel>
                </section>
            </div>
        </>
    )
}

export default Home