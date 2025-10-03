import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axiosInstance from "../../../utils/axios_instance"
import LoaderOverlay from "../../components/loader_overlay"
import ScrollableCarousel from "../../components/scroll_carousel"
import CriticReviewCard from "../../components/critic_review_card"

const ViewOrEditMovie = ({ editByDefault = false }) => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [editMode, setEditMode] = useState(editByDefault)
    const [form, setForm] = useState({})
    const [posterPreview, setPosterPreview] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [criticReviews, setCriticReviews] = useState([]);
    const [showAddReview, setShowAddReview] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/movies/${id}`)
            .then(res => setMovie(res.data.movie))
            .catch(err => console.error(err))
    }, [id])

    useEffect(() => {
        if (movie) {
            setForm(movie)
            setPosterPreview(movie.poster?.url || null)
            setImagesPreview(movie.images || [])
        }
    }, [movie])

    useEffect(() => {
        const fetchCriticReviews = async () => {
            try {
                const res = await axiosInstance.get(`movies/${id}/reviews`);
                if (res?.data?.success) {
                    console.log(res.data?.critics);

                    setCriticReviews(res.data?.critics);
                }
            } catch (err) {
                console.error('Failed to load critic reviews:', err);
            }
        };

        fetchCriticReviews();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target
        if (type === "checkbox") {
            setForm(prev => ({ ...prev, [name]: checked }))
        } else if (type === "file") {
            if (name === "posterImg") {
                setForm(prev => ({ ...prev, posterImg: files[0] }))
                setPosterPreview(URL.createObjectURL(files[0]))
            } else if (name === "images") {
                setForm(prev => ({ ...prev, images: Array.from(files) })) // <-- convert
                setImagesPreview(Array.from(files).map(f => ({ url: URL.createObjectURL(f) })))
            }
        } else {
            setForm(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        Object.keys(form).forEach(k => {
            if (form[k]) {
                if (Array.isArray(form[k])) {
                    form[k].forEach(val => formData.append(k, val))
                } else {
                    formData.append(k, form[k])
                }
            }
        })
        try {
            // formData.getAll("images").forEach(f => console.log(f.name, f.size));

            const res = await axiosInstance.patch(`/movies/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setMovie(res.data.movie)
            setEditMode(false)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="relative">
            {!movie ? <div className="absolute h-full w-full"><LoaderOverlay /></div> : null}
            <div className="p-4 md:p-8 max-w-3xl mx-auto">

                <div className="flex justify-center items-center mb-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-amber-500 mx-auto">{movie?.title}{movie?.releaseDate && (<span className="text-2xl text-amber-600">
                        ({new Date(movie?.releaseDate).getFullYear()})
                    </span>)}</h1>
                    {!editMode && (
                        <button
                            className="size-12 p-2 text-2xl rounded-full border-2 bg-amber-200/50 border-amber-500 dark:text-white font-medium hover:bg-amber-600 transition-colors duration-200"
                            onClick={() => setEditMode(true)}
                            title="edit movie details"
                            aria-label="edit movie details"
                        >
                            🖊
                        </button>
                    )}
                </div>

                {editMode ? (
                    <form onSubmit={handleSave} className="space-y-6">
                        {/* --- Basic Info --- */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <Input label="Title" name="title" value={form.title || ""} onChange={handleChange} />
                            <Input type="date" label="Release Date" name="releaseDate" value={form.releaseDate?.slice(0, 10) || ""} onChange={handleChange} />
                            <Input label="Genres (comma separated)" name="genres" value={form.genres || ""} onChange={handleChange} />
                            <Input type="number" step="0.1" min="0" max="10" label="Rating" name="rating" value={form.rating || ""} onChange={handleChange} />
                        </div>

                        {/* Flags */}
                        <div className="flex gap-6 w-fit mx-auto">
                            <Checkbox label="Featured Now" name="featuredNow" checked={form.featuredNow || false} onChange={handleChange} />
                            <Checkbox label="In Theatres" name="currentlyOnTheatres" checked={form.currentlyOnTheatres || false} onChange={handleChange} />
                        </div>

                        {/* Poster + Images */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <FileInput label="Poster" name="posterImg" onChange={handleChange} preview={posterPreview} />
                            <FileInput label="Images" props={"multiple"} name="images" multiple onChange={handleChange} previewList={imagesPreview} />
                        </div>

                        {/* Description + Trailer */}
                        <Textarea label="Description" name="description" value={form.description || ""} onChange={handleChange} />
                        <Input label="Trailer URL" name="trailerUrl" value={form.trailerUrl || ""} onChange={handleChange} />

                        {/* People */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <Input label="Director" name="director" value={form.director?.map(c => c._id).join(", ") || ""} onChange={handleChange} />
                            <Input label="Writers (comma separated)" name="writers" value={form.writers?.map(c => c._id).join(", ") || ""} onChange={handleChange} />
                            <Input label="Cast (comma separated)" name="cast" value={form.cast?.map(c => c._id).join(", ") || ""} onChange={handleChange} />
                        </div>

                        {/* Meta */}
                        {/* Meta */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <Input label="Tags (comma separated)" name="tags" value={form.tags || ""} onChange={handleChange} />
                            <Input label="Global Collection" name="globalCollection" value={form.globalCollection || ""} onChange={handleChange} />
                            <Input label="Duration (mins)" name="duration" value={form.duration || ""} onChange={handleChange} />
                            <Input label="Available On" name="availableOn" value={form.availableOn || ""} onChange={handleChange} />
                            <Input label="Country" name="country" value={form.country || ""} onChange={handleChange} />
                            <Input label="Language" name="language" value={form.language || ""} onChange={handleChange} />
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-4xl">
                                Save Changes
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setForm(movie)
                                    setEditMode(false)
                                    setPosterPreview(movie.poster?.url || null)
                                    setImagesPreview(movie.images || [])
                                }}
                                className="px-4 py-2 bg-red-400 text-gray-200 rounded-4xl hover:bg-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        {/* Poster */}
                        <div className="flex items-end gap-4">
                                {posterPreview && <img src={posterPreview} alt={movie?.title} className="h-96 rounded-lg shadow" />}
                            <div><p className="">Release Date: {movie?.releaseDate?.slice(0, 10)}</p>
                                {movie?.genres && <p className="italic">{movie?.genres}</p>}

                                {movie?.rating && <p className="font-bold">{movie?.rating}/10</p>}

                            </div>

                        </div>


                        <div className="flex gap-4">
                            {movie?.featuredNow && <p className="bg-green-600 rounded-4xl px-2">Featured</p>}
                            {movie?.currentlyOnTheatres && <p className="bg-indigo-600 rounded-4xl px-2">Running on Theatres</p>}

                        </div>
                        {movie?.description && <p>{movie?.description}</p>}

                        {movie?.trailerUrl && <a className="text-blue-500 underline" href={movie?.trailerUrl}>Watch Trailer</a>}

                        <div>
                                {movie?.director?.length && <p><b>Director:</b> {movie?.director?.map(c => c.name).join(", ")}</p>}
                                {movie?.writers?.length && <p><b>Writers:</b> {movie?.writers?.map(c => c.name).join(", ")}</p>}
                                {movie?.cast?.length && <p><b>Cast:</b> {form.cast?.map(c => c.name).join(", ")}</p>}
                        </div>

                        <div>
                            {movie?.tags && <p><b>Tags:</b> {movie?.tags}</p>}
                            {movie?.globalCollection && <p><b>Collection:</b> {movie?.globalCollection}</p>}
                            {movie?.duration && <p><b>Duration:</b> {movie?.duration} mins</p>}
                            {movie?.availbleOn && <p><b>Available On:</b> {movie?.availbleOn}</p>}
                            {movie?.country && <p><b>Country:</b> {movie?.country}</p>}
                            {movie?.language && <p><b>Language:</b> {movie?.language}</p>}
                        </div>

                        {imagesPreview?.length > 0 && (
                            <ScrollableCarousel>
                                {imagesPreview.map((img, i) => (
                                    <img key={i} src={img.url} alt="extra" className="rounded-lg object-cover h-64" loading="lazy" />
                                ))}
                            </ScrollableCarousel>
                        )}
                    </div>
                )}
            </div>

            <div className="p-4 md:p-8 max-w-3xl mx-auto mt-12">
                <div className="relative mb-6">
                    <h2 className="text-2xl font-bold text-center">Critic Reviews</h2>
                    <div className="absolute right-0 top-0">
                        <button
                            onClick={() => setShowAddReview(!showAddReview)}
                            className={`${showAddReview ? "hidden" : "flex"} px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition`}
                        >
                            Add Critic Review
                        </button>
                    </div>
                </div>

                {showAddReview ? (
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = {
                                movie: movie._id,
                                critic: e.target.critic.value,
                                rating: Number(e.target.rating.value),
                                comment: e.target.comment.value,
                            };
                            try {
                                const res = await axiosInstance.post('/reviews/critic', formData);
                                if (res.data.success) {
                                    setCriticReviews([...criticReviews, res.data.review]);
                                    setShowAddReview(false);
                                }
                            } catch (err) {
                                console.error('Failed to submit review:', err);
                            }
                        }}
                        className="space-y-4"
                    >
                        <Input name="critic" placeholder="Critic Name" required />
                        <Input name="rating" type="number" min="1" max="10" placeholder="Rating (1–10)" required className="w-full px-4 py-2 border rounded-md" />
                        <Textarea name="comment" placeholder="Review by Critic..." required rows={4} className="w-full px-4 py-2 border rounded-md" />
                        <div className="flex gap-2 mt-4">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-4xl"
                            >
                                Submit Review
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setForm({})
                                    setShowAddReview(false)
                                }}
                                className="px-4 py-2 bg-red-400 text-gray-200 rounded-4xl hover:bg-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        {criticReviews?.length > 0 ? (
                            criticReviews?.map((review) => (
                                <CriticReviewCard critic={review} />
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 italic">No critic reviews available yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

/* --- Small reusable input components --- */
const Input = ({ label, ...props }) => (
    <div>
        <label className="block text-sm mb-1">{label}</label>
        <input {...props} className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800" />
    </div>
)

const Textarea = ({ label, ...props }) => (
    <div>
        <label className="block text-sm mb-1">{label}</label>
        <textarea {...props} className="w-full p-2 min-h-[100px] border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800" />
    </div>
)

const Checkbox = ({ label, ...props }) => (
    <label className="flex items-center gap-2">
        <input type="checkbox" {...props} className="cursor-pointer accent-indigo-600 size-8" />
        {label}
    </label>
)

const FileInput = ({ label, preview, previewList, ...props }) => (
    <div>
        <label className="block text-sm mb-1">{label}</label>
        <input type="file" accept="image/*"  {...props} className="w-full border p-2 cursor-pointer border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800" />
        {preview && <img src={preview} alt="preview" className="mt-2 w-32 rounded" />}
        {previewList && previewList.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
                {previewList.map((img, i) => (
                    <img key={i} src={img.url} alt="preview" className="w-20 rounded" />
                ))}
            </div>
        )}
    </div>
)

export default ViewOrEditMovie