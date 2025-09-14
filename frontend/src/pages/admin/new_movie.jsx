import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../../utils/axios_instance"

const NewMovie = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        title: "",
        releaseDate: "",
        genres: "",
        rating: "",
        featuredNow: false,
        currentlyOnTheatres: false,
        posterImg: null,
        description: ""
    })

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : (type === "file" ? files[0] : value)
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        Object.entries(form).forEach(([k, v]) => formData.append(k, v))

        axiosInstance.post("/movies", formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then(res => {
                if (res.data?.movie?._id) {
                    navigate(`/su/movies/${res.data.movie._id}`, { state: { editMode: true } })
                }
            })
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Add New Movie</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                    <input type="text" name="title" value={form.title} onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Release Date</label>
                    <input type="date" name="releaseDate" value={form.releaseDate} onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Genres (comma separated)</label>
                    <input type="text" name="genres" value={form.genres} onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                    <input type="number" name="rating" value={form.rating} onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800"
                        step="0.1" min="0" max="10" />
                </div>

                <div className="flex items-center gap-6 mx-auto w-fit">
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <input className="cursor-pointer accent-indigo-600 size-8" type="checkbox" name="featuredNow" checked={form.featuredNow} onChange={handleChange} />
                        Featured Now
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <input className="cursor-pointer accent-indigo-600 size-8" type="checkbox" name="currentlyOnTheatres" checked={form.currentlyOnTheatres} onChange={handleChange} />
                        In Theatres
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Poster</label>
                    <input className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 cursor-pointer bg-gray-50 dark:bg-gray-800"
                        type="file" name="posterImg" accept="image/*" onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-sm mb-1">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800"
                        rows={4}
                    />
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow transition">
                        Save & Continue →
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewMovie