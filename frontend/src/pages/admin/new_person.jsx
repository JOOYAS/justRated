import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../../utils/axios_instance"

const AddPerson = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        bio: "",
        roles: "",
        photo: null
    })

    const handleChange = (e) => {
        const { name, value, type, files } = e.target
        setForm(prev => ({
            ...prev,
            [name]: type === "file" ? files[0] : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        Object.entries(form).forEach(([k, v]) => formData.append(k, v))

        axiosInstance.post("/person", formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then(res => {
                if (res.data?.person?._id) {
                    navigate(`/su/person/${res.data.person._id}`, { state: { editMode: true } })
                }
            })
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Add New Person</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                    <textarea name="bio" value={form.bio} onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800"
                        rows={4} required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Roles (comma separated)</label>
                    <input type="text" name="roles" value={form.roles} onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Photo</label>
                    <input className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 cursor-pointer bg-gray-50 dark:bg-gray-800"
                        type="file" name="photo" accept="image/*" onChange={handleChange} required />
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

export default AddPerson