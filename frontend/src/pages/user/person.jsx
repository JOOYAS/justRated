import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../../components/moviecard";
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
    { _id: "m1", name: "Inception", poster: "https://picsum.photos/200/300?1" },
    { _id: "m2", name: "Interstellar", poster: "https://picsum.photos/200/300?2" },
    { _id: "m3", name: "Oppenheimer", poster: "https://picsum.photos/200/300?3" },
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

    console.log(person);

    // if (loading) return <LoaderOverlay />;

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Person Header */}
            <div className="flex flex-col md:flex-row gap-6 md:items-end">
                <img
                    src={person?.photo.url}
                    alt={person.name}
                    className="w-40 h-52 object-cover rounded-xl shadow"
                />
                <div>
                    <h1 className="text-3xl font-bold">{person.name}</h1>
                    <div className="flex gap-2 mt-3">
                        {person?.roles.map((role) => (
                            <span
                                key={role}
                                className="px-3 py-1 text-sm bg-blue-500/10 text-blue-700 rounded-full border-2 border-amber-100"
                            >
                                {role}
                            </span>
                        ))}
                    </div>
                    <p className="text-xl mt-2">{person.bio}</p>

                </div>
            </div>

            <h2 className='text-center font-bold text-2xl text-amber-950 dark:text-amber-50 py-6'>{`Movies of ${person.name}`}</h2>
            <ScrollableCarousel>
                {movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </ScrollableCarousel>
        </div>
    );
}
