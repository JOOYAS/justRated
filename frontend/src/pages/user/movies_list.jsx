import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ScrollableCarousel from '../../components/scroll_carousel';
import MovieCard from '../../components/movie_card';
import GenreBar from '../../components/genre_bar';
import axiosInstance from '../../../utils/axios_instance';
import LoaderOverlay from '../../components/loader_overlay';

const Movies = () => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [movies, setMovies] = useState([])
    const mockMovies = [
        {
            _id: "1",
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

    const navigate = useNavigate();
    useEffect(() => {
        axiosInstance.get('/movies')
            .then(res => setMovies(res.data?.movies.reverse()))
            .catch(err => {
                console.error(err)
                setMovies(mockMovies)
            })
    }, [])


    return (
        <>
            {!movies.length ? <LoaderOverlay /> :

        <div className="">
            <GenreBar selectedGenre={selectedGenre} onSelect={setSelectedGenre} />
                    <section className='md:px-20  min-h-96 pt-10 flex-col gap-4 overflow-hidden'>
                        <div id='featured'>
                            <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6 z-20'>Featured today</h2>
                <ScrollableCarousel>
                                {movies?.map((movie) => (
                                    <MovieCard key={movie?._id} movie={movie} />
                                ))}
                            </ScrollableCarousel>
                        </div>

                        <div id='top'>
                            <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Top 10</h2>
                            <ScrollableCarousel>
                                {movies?.map((movie) => (
                                    <MovieCard key={movie?._id} movie={movie} />
                                ))}
                            </ScrollableCarousel>
                        </div>

                        <div id='malayalam'>
                            <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Malayalam Hits</h2>
                            <ScrollableCarousel>
                                {movies?.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </ScrollableCarousel>
                        </div>

                        <div id='indian'><h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Top from India</h2>
                            <ScrollableCarousel>
                                {movies?.map((movie) => (
                                    <MovieCard key={movie._id} movie={movie} />
                                ))}
                            </ScrollableCarousel></div>

                        <div id='action'>
                            <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Action Movies</h2>
                <ScrollableCarousel>
                                {movies?.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </ScrollableCarousel>
                        </div>

                        <div id='comedy'> <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Most Comedic Movies</h2>
                            <ScrollableCarousel>
                                {movies?.map((movie) => (
                                    <MovieCard key={movie._id} movie={movie} />
                                ))}
                            </ScrollableCarousel></div>

                        <div id='fantasy'> <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Visual Fantasy</h2>
                            <ScrollableCarousel>
                                {movies?.map((movie) => (
                                    <MovieCard key={movie._id} movie={movie} />
                                ))}
                            </ScrollableCarousel></div>

                        <div id='romance'> <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Romantic</h2>
                            <ScrollableCarousel>
                                {movies?.map((movie) => (
                                    <MovieCard key={movie._id} movie={movie} />
                                ))}
                            </ScrollableCarousel></div>

                        <div id='sci-fi'> <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Science Fiction</h2>
                            <ScrollableCarousel>
                                {movies?.map((movie) => (
                                    <MovieCard key={movie._id} movie={movie} />
                                ))}
                            </ScrollableCarousel></div>

                        <div id='thriller'> <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>High Thrilling</h2>
                            <ScrollableCarousel>
                                {movies?.map((movie) => (
                                    <MovieCard key={movie._id} movie={movie} />
                                ))}
                            </ScrollableCarousel></div>

                        <div id='animation'> <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Animated Movies</h2>
                            <ScrollableCarousel>
                                {movies?.map((movie) => (
                                    <MovieCard key={movie._id} movie={movie} />
                                ))}
                            </ScrollableCarousel></div>

            </section>
        </div>
            }
        </>
    )
}

export default Movies