import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import LoaderOverlay from '../../components/loader_overlay';
import PersonCard from '../../components/personcard';
import ScrollableCarousel from '../../components/scroll_carousel';
import axiosInstance from '../../../utils/axios_instance';
import ReviewCard from '../../components/review_card';
import { useSelector } from 'react-redux';
import CriticReviewCard from '../../components/critic_review_card';
import LazyImage from '../../components/lazy_image';

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

    const mockReviewsRes = {
        success: true,
        count: 2,
        reviews: [
            {
                _id: "r1",
                movie: "688f295321d9a1af990e6c9c",
                user: { _id: "u1", name: "Alice" },
                rating: 7,
                review: "6rdytfyu giuo y9uouiyoiyiu 00lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                createdAt: "2025-08-20T09:10:36.065Z",
            },
            {
                _id: "r2",
                movie: "688f295321d9a1af990e6c9c",
                user: { _id: "688b3d3ef419409a97cb9067", name: "Me (chacha2)" },
                rating: 4,
                review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                createdAt: "2025-08-21T11:45:12.065Z",
            },
        ],
        critics: [
            {
                _id: "r3",
                movie: "688f295321d9a1af990e6c9c",
                critic: "times",
                rating: 7,
                review: "incididunt ut labore et dolore magna aliqua.",
                createdAt: "2025-08-20T09:10:36.065Z",
        },
            {
                _id: "r4",
                movie: "688f295321d9a1af990e6c9c",
                critic: "indian express",
                rating: 9,
                review: ";Lorem ipsum dolor sit amet, consectetur",
                createdAt: "2025-08-21T11:45:12.065Z",
            },
        ],
    };

    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [CriticReviews, setCriticReviews] = useState([])
    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);
    const [movie, setMovie] = useState({});
    const userData = useSelector(s => s.user);

    useEffect(() => {
        axiosInstance.get(`/movies/${id}`)
            .then(res => {
                setMovie(res.data?.movie)
            })
            .catch(err => {
                console.error(err)
                setMovie(mockReviewsRes.movie)
            })
    }, [id]);

    useEffect(() => {
        const fetchReviews = () => {
            axiosInstance.get(`/movies/${id}/reviews`)
                .then(res => {
                    setReviews(res.data?.reviews)
                    setCriticReviews(res.data?.critics)
                })
                .catch(err => {
                    console.log(err);
                    setReviews(mockReviewsRes.reviews)
                    setCriticReviews(mockReviewsRes.critics)
                });
        };

        fetchReviews();
    }, [id, reviews.length]); // Use reviews.length instead of entire reviews array


    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % movie?.images?.length);
        }, 10000); // 10s
        return () => clearInterval(interval);
    }, [movie?.images?.length]);

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post(`/reviews`, { movie: id, comment: text, rating })
            .then(res => {
                setReviews(prev => [res.data, ...prev]);
                setText("");
            });
    };

    if (!movie) return <LoaderOverlay />;
    return (
        <>
            {!movie ? <LoaderOverlay /> :

                <div>
                    <section className="relative h-[40vh] md:h-[70vh] overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            <img
                                src={movie?.images?.[index]?.url || '/sample_placeholder.png'}
                                alt="Background"
                                className="absolute w-full h-full object-cover animate-bg-move"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </div>

                        <div className='relative z-10 h-[40vh] md:h-[70vh] flex flex-row items-end gap-4 max-w-4xl mx-auto px-4 pb-6'>
                            <LazyImage publicId={movie?.poster?.public_id} alt={`${movie?.title} poster`} className={"w-32 md:w-64 object-cover rounded-lg shadow h-2/3 md:h-3/4 bg-indigo-700/15"} />
                            {/* <img
                        src={movie?.poster?.url}
                        alt={`${movie?.title} poster`}
                        className="w-32 md:w-64 object-cover rounded-lg shadow h-2/3 md:h-3/4 bg-indigo-700/15"
                    /> */}
                            <div className="text-white">
                                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
                                    {movie.title}
                                    {movie.releaseDate && (
                                        <span className="text-lg ml-2">
                                            {new Date(movie.releaseDate).getFullYear()}
                                        </span>
                                    )}
                                </h1>
                                {movie.rating && (
                                    <p className="mt-2 text-yellow-400 text-2xl font-semibold">
                                        ⭐ {movie.rating}/10
                                    </p>
                                )}
                                <div className='flex gap-4'>
                                    <button className='px-3 py-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg border-transparent border-4  hover:border-amber-100 hover:shadow-xl'>Add to Watchlist</button>
                                    <button className='px-3 py-2 rounded-2xl bg-amber-600/30 text-black dark:text-white font-semibold shadow-lg border-4 border-amber-600  hover:border-amber-100 hover:shadow-xl'>Mark as Watched</button>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className='z-20 p-4 pt-2 bg-amber-50 dark:bg-neutral-800'>
                        <div className="max-w-4xl mx-auto space-y-6">
                            {movie.genres && (
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres?.map((g) => (
                                        <span
                                            key={g}
                                            className="px-2 py-1 text-xl bg-gray-200 dark:bg-gray-600 rounded-full"
                                        >
                                            {g}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <p className="text-lg leading-relaxed">{movie.description}</p>
                            <div className='max-w-4xl mx-auto flex justify-around items-center'>
                                <h2 className="font-semibold text-xl mb-0">Director :</h2>
                                {movie?.director ? <PersonCard person={movie.director} /> : <span className='text-red-600'>no info</span>}
                            </div>
                        </div>
                    </section>

                    <section className="p-4 pt-2 bg-amber-50 dark:bg-neutral-800">
                        <div className='max-w-4xl mx-auto space-y-6'>

                            {CriticReviews.length !== 0 ?
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {CriticReviews.map((c) => (
                                        <CriticReviewCard key={c._id} critic={c} />
                                    ))}
                                </div>
                                : <div className='text-center text-red-600'>Critic Reviews Are Not available</div>
                            }


                            <form onSubmit={handleReviewSubmit} className="space-y-2 flex flex-col justify-center">
                                <div className="w-full justify-center flex gap-2 items-center text-6xl">
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <button
                                            type="button"
                                            key={num}
                                            onClick={() => setRating(num)}
                                            className={num <= rating ? "text-yellow-400" : "text-gray-400"}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                                <div className='flex items-center gap-2'>
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="w-full p-2 border bg-white dark:bg-amber-50/15 border-gray-300 dark:border-gray-600 rounded-xl"
                                        placeholder="Write your review..."
                                    />
                                    <button type="submit" className="inline-block px-4 md:px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg border-transparent border-4  hover:border-amber-100 hover:shadow-xl active:from-orange-700 transition-transform duration-200">
                                        Post
                                    </button>
                                </div>

                            </form>

                            {/* reviews list */}{ }
                            <div className="space-y-4">
                                {
                                    reviews.length !== 0 ?
                                        reviews?.map((r) => {
                                            // console.log("review  =====", r)
                                            // console.log("store", r.user?._id, "api", userData);
                                            return (
                                                <ReviewCard
                                                    key={r._id}
                                                    review={{
                                                        ...r,
                                                        rating: Math.round(r.rating),
                                                    }}
                                                    isMine={r.user?._id === userData.info._id}
                                                />


                                            )
                                        })
                                        : <div className='text-center text-red-600'>Reviews Are Not available</div>
                                }
                            </div>
                        </div>
                    </section>


                    <section className="p-8 pt-2 bg-amber-50 dark:bg-neutral-800">
                        <div className='max-w-4xl mx-auto space-y-6'>
                            <h2 className="font-semibold text-2xl mb-2 text-center">Cast</h2>

                            {movie?.cast == null || movie?.cast?.length === 0 ? (
                                <div className='text-center text-red-600'>Cast details Not available</div>
                            ) : (
                                movie.cast.map((person) =>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <PersonCard
                                            key={person?._id}
                                            person={person}
                                        />
                                    </div>
                                )
                            )}


                        </div>

                    </section>
                    <section className='flex justify-center bg-amber-50 dark:bg-neutral-800 py-6'>
                        {movie?.images?.length > 0 ? (
                            <div className='max-w-4xl  space-y-6'>
                                <h2 className="font-semibold text-2xl text-center  mb-2 ">Images</h2>
                                <ScrollableCarousel>
                                    {movie.images.map((img) => (
                                        <LazyImage key={img.public_id} publicId={img.public_id} alt={"movie still"} className={"rounded-lg object-cover h-32 flex-none"} />
                                        // <img
                                        //     key={img.public_id}
                                        //     src={img.url}
                                        //     alt="Movie still"
                                        //     className="rounded-lg object-cover h-32 flex-none"
                                        // />
                                    ))}
                                </ScrollableCarousel>
                            </div>
                        ) : <div className="text-center text-red-500">No images available</div>
                        }
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
                </div>
            }
        </>
    )
}

export default MovieDetail