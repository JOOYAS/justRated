import React from 'react'
import { useNavigate } from 'react-router-dom';
import ScrollableCarousel from '../../components/scroll_carousel';
import MovieCard from '../../components/moviecard';

const Movies = () => {
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

    const navigate = useNavigate();

    const movies = [
        {
            _id: "1",
            title: "Inception",
            genre: "Sci-Fi",
            poster: {
                url: "https://picsum.photos/400/600?random=1",
                public_id: "mock/inception"
            }
        },
        {
            _id: "2",
            title: "Interstellar",
            genre: "Sci-Fi",
            poster: {
                url: "https://picsum.photos/400/600?random=2",
                public_id: "mock/interstellar"
            }
        },
        {
            _id: "3",
            title: "The Dark Knight",
            genre: "Action",
            poster: {
                url: "https://picsum.photos/400/600?random=3",
                public_id: "mock/darkknight"
            }
        }
    ];


    return (
        <div className="">
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

                <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Indian specials</h2>
                <ScrollableCarousel>
                    {mockMovies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </ScrollableCarousel>

                <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Animations</h2>
                <ScrollableCarousel>
                    {mockMovies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </ScrollableCarousel>

                <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Musical movies</h2>
                <ScrollableCarousel>
                    {mockMovies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </ScrollableCarousel>
            </section>
        </div>

    )
}

export default Movies