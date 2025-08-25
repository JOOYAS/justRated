import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import LoaderOverlay from '../../components/loader_overlay';
import PersonCard from '../../components/personcard';
import ScrollableCarousel from '../../components/scroll_carousel';
import axiosInstance from '../../../utils/axios_instance';
import ReviewCard from '../../components/review_card';


const MovieDetail = () => {
    const mockmovie = {
        "success": true,
        "movie": {
            "_id": "66c5900a4fa1c7e9019d1234",
            "title": "Inception",
            "releaseDate": "2010-07-16T00:00:00.000Z",
            "genres": ["Sci-Fi", "Thriller"],
            "poster": {
                "url": "https://picsum.photos/300/450?random=1",
                "public_id": "posters/inception123"
            },
            "rating": 8.8,
            "featuredNow": true,
            "currentlyOnTheatres": false,

            "description": "A skilled thief leads a team into people's dreams to steal secrets, but faces his most dangerous mission yet.",
            "images": [
                {
                    "url": "https://picsum.photos/800/450?random=2",
                    "public_id": "movie_images/img1"
                },
                {
                    "url": "https://picsum.photos/800/450?random=3",
                    "public_id": "movie_images/img2"
                },
                {
                    "url": "https://picsum.photos/800/450?random=2",
                    "public_id": "movie_images/img1"
                },
                {
                    "url": "https://picsum.photos/800/450?random=3",
                    "public_id": "movie_images/img2"
                },
                {
                    "url": "https://picsum.photos/800/450?random=2",
                    "public_id": "movie_images/img1"
                },
                {
                    "url": "https://picsum.photos/800/450?random=3",
                    "public_id": "movie_images/img2"
                }
            ],
            "trailerUrl": "https://youtube.com/watch?v=YoHD9XEInc0",
            "tags": ["dream", "heist", "mind-bending"],
            "globalCollection": "Top Sci-Fi",
            "director": "66c5900a4fa1c7e9019d5678",
            "cast": [
                "66c5900a4fa1c7e9019d9101",
                "66c5900a4fa1c7e9019d9102", "66c5900a4fa1c7e9019d9102", "66c5900a4fa1c7e9019d9102", "66c5900a4fa1c7e9019d9102", "66c5900a4fa1c7e9019d9102"
            ],
            "writers": [
                "66c5900a4fa1c7e9019d9103"
            ],
            "duration": 148,
            "availableOn": ["Netflix", "Amazon Prime"],
            "country": "USA",
            "language": "English"
        }
    }

    const mockReviews = [
        {
            _id: "1",
            user: "John Doe",
            date: "2024-01-15",
            rating: 5,
            text: "Mind-bending masterpiece! Christopher Nolan outdid himself.",
        },
        {
            _id: "2",
            user: "Sarah Johnson",
            date: "2024-01-10",
            rating: 4,
            text: "Great movie but can be confusing at times.",
        },
        {
            _id: "3",
            user: "Me (You)",
            date: "2024-01-20",
            rating: 5,
            text: "I loved it. Best sci-fi I’ve watched in years!",
        },
    ];

    const { id } = useParams();
    console.log("movie_id: ", id);
    const [reviews, setReviews] = useState([]);
    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);
    const [movie, setMovie] = useState(mockmovie.movie);

    useEffect(() => {
        axiosInstance.get(`/movies/${id}`)
            .then(res => res.data)
            .then(data => {
                (data?.movie)
                // setMovie(data.movie);
            })
        // setTimeout(() => {
        //     setMovie({})
        // }, 1000);
    }, [id]);

    useEffect(() => {
        axiosInstance.get(`/reviews/${id}`)
            .then(res => setReviews(res.data));
    }, [id]);

    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % movie.images.length);
        }, 10000); // 10s
        return () => clearInterval(interval);
    }, [movie.images.length]);

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post(`/reviews/${movie._id}`, { text, rating })
            .then(res => setReviews(prev => [res.data, ...prev]));
    };


    if (!movie) return <LoaderOverlay />;
    return (
        <>
            <section className="bg-[image:var(--bg-url)] bg-no-repeat  bg-bottom bg-cover"
                style={{ '--bg-url': `url(${movie?.images?.[index]?.url || '/328-300x300.jpg'})` }}
            >
                <div className='h-[40vh] md:h-[70vh] flex flex-row items-end gap-4 max-w-4xl mx-auto px-8'>
                    <img src={movie?.poster?.url} alt={`${movie?.title} poster`} className="w-32 md:w-64 object-cover rounded-lg shadow h-2/4 md:h-3/4 " />
                    <div className="align-bottom -bottom-24">
                        <h1 className="text-3xl md:text-5xl font-bold text-amber-950 dark:text-amber-200">{movie.title} {movie.releaseDate && (<span className="text-lg">
                            {new Date(movie.releaseDate).getFullYear()}
                        </span>)}</h1>

                        {movie.rating && (<p className="mt-2 text-yellow-600 font-semibold">
                            ⭐ {movie.rating}/10
                        </p>)}
                    </div>
                </div>

            </section>

            <section className='p-8 pt-2 custom-top-fade'>
                <div className="max-w-4xl mx-auto space-y-6">
                    {movie.genres && (
                        <div className="flex flex-wrap gap-2">
                            {movie.genres?.map((g) => (
                                <span
                                    key={g}
                                    className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-600 rounded-full"
                                >
                                    {g}
                                </span>
                            ))}
                        </div>
                    )}
                    <p className="text-lg leading-relaxed">{movie.description}</p>
                </div>
            </section>

            <section className="p-8 pt-2 max-w-4xl mx-auto space-y-6">
                <h3 className="text-xl font-semibold">Reviews</h3>

                {/* add review form */}
                <form onSubmit={handleReviewSubmit} className="space-y-2">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full rounded p-2 border"
                        placeholder="Write your review..."
                    />
                    <div className="flex gap-2 items-center">
                        {/* rating stars */}
                        {/* map 1..5 buttons, setRating on click */}
                    </div>
                    <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
                        Submit
                    </button>
                </form>

                {/* reviews list */}
                <div className="space-y-4">
                    {mockReviews.map((r) => (
                        <ReviewCard key={r._id} review={r} />
                    ))}
                </div>
            </section>


            <section className="p-8 pt-2">
                <div className='max-w-4xl mx-auto space-y-6'>
                    <h2 className="font-semibold text-xl mb-2">Director</h2>
                    <p>{movie.director?.name || "not available"}</p>
                </div>
                <div>
                    <h2 className="font-semibold text-xl mb-2 text-center">Cast</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {movie.cast?.map((person) => (
                            <PersonCard
                                // key={person?._id} 
                                person={person}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className='p-8 pt-2'>
                {movie.images?.length > 0 && (
                    <div className='max-w-4xl mx-auto space-y-6'>
                        <h2 className="font-semibold text-xl mb-2">Images</h2>
                        <ScrollableCarousel>
                            {movie.images.map((img) => (
                                <img
                                    //key={img.public_id}
                                    src={img.url}
                                    alt="Movie still"
                                    className="rounded-lg object-cover h-32 flex-none"
                                />
                            ))}
                        </ScrollableCarousel>
                    </div>
                )}
            </section>

            {/* Trailer
                    {movie.trailerUrl && (
                        <div>
                            <h2 className="font-semibold text-xl mb-2">Trailer</h2>
                            <iframe
                                src={movie.trailerUrl}
                                title="Trailer"
                                className="w-full aspect-video rounded-lg shadow"
                                allowFullScreen
                            />
                        </div>
                    )} */}
        </>
    )
}

export default MovieDetail