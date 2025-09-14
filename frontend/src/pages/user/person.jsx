import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../../components/movie_card";
import ScrollableCarousel from "../../components/scroll_carousel";
import axiosInstance from "../../../utils/axios_instance";
import LoaderOverlay from "../../components/loader_overlay";

const mockPerson = {
    _id: "p1",
    name: "Christopher Nolan",
    bio: "British-American filmmaker known for directing mind-bending films.",
    photo: { url: "https://i.pravatar.cc/150?img=8", public_id: "mock" },
    roles: ["Director", "Writer"]
};

const mockMovies = [
    { _id: "m1", title: "Inception", poster: "https://picsum.photos/200/300?1" },
    { _id: "m2", title: "Interstellar", poster: "https://picsum.photos/200/300?2" },
    { _id: "m3", title: "Oppenheimer", poster: "https://picsum.photos/200/300?3" },
];

export default function PersonDetail() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        try {
            axiosInstance.get(`/person/${id}`)
                .then(res => res.data)
                .then(data => {
                    // setPerson(data?.person);
                    // setMovies(data?.movies);

                    setLoading(false);

                })
        } catch (err) {
            console.log("person fetch :", err.message)
        }
    }, [id]);

    useEffect(() => {
        setPerson(mockPerson);
        setMovies(mockMovies);
        setLoading(false)
    }, [])

    if (loading) return <LoaderOverlay />;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Person Header */}
            <div className="flex flex-col md:flex-row gap-6 md:items-end p-6">
                <img
                    src={person?.photo.url}
                    alt={person.name}
                    className="w-52 h-64 object-cover rounded-xl shadow bg-amber-600/15 hover:border-2 border-amber-200"
                />
                <div>
                    <h1 className="text-3xl font-bold">{person.name}</h1>
                    <div className="flex gap-2 mt-3">
                        {person?.roles.map((role) => (
                            <span
                                key={role}
                                className="px-3 py-1 text-sm bg-blue-500/25 rounded-full border-2 border-amber-100"
                            >
                                {role}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-xl p-6">{person.bio}</p>

            <h2 className='font-bold text-2xl text-amber-950 dark:text-amber-50 py-6'>{`Movies of ${person.name}`}</h2>
            <ScrollableCarousel>
                {movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </ScrollableCarousel>
        </div>
    );
}
