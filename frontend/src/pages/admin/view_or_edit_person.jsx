import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import LoaderOverlay from "../../components/loader_overlay"
import axiosInstance from "../../../utils/axios_instance"

const ViewOrEditPerson = ({ editByDefault = false }) => {
    const { id } = useParams()
    const [person, setPerson] = useState(null)
    const [editMode, setEditMode] = useState(editByDefault)
    const [form, setForm] = useState({})
    const [photoPreview, setPhotoPreview] = useState(null)

    useEffect(() => {
        axiosInstance.get(`/person/${id}`)
            .then(res => setPerson(res.data.person))
            .catch(err => console.error(err))
    }, [id])

    useEffect(() => {
        if (person) {
            setForm(person)
            setPhotoPreview(person.photo?.url || null)
        }
    }, [person])

    const handleChange = (e) => {
        const { name, value, type, files } = e.target
        if (type === "file") {
            setForm(prev => ({ ...prev, photo: files[0] }))
            setPhotoPreview(URL.createObjectURL(files[0]))
        } else {
            setForm(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        Object.entries(form).forEach(([k, v]) => {
            if (Array.isArray(v)) {
                v.forEach(val => formData.append(k, val))
            } else {
                formData.append(k, v)
            }
        })

        try {
            const res = await axiosInstance.patch(`/person/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setPerson(res.data.person)
            setEditMode(false)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="relative">
            {!person ? <div className="absolute h-full w-full"><LoaderOverlay /></div> : null}
            <div className="p-4 md:p-8 max-w-3xl mx-auto">
                <div className="flex justify-center items-center mb-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-indigo-500 mx-auto">{person?.name}</h1>
                    {!editMode && (
                        <button
                            className="size-12 p-2 text-2xl rounded-full border-2 bg-indigo-200/50 border-indigo-500 dark:text-white font-medium hover:bg-indigo-600 transition-colors duration-200"
                            onClick={() => setEditMode(true)}
                            title="edit person details"
                            aria-label="edit person details"
                        >
                            🖊
                        </button>
                    )}
                </div>

                {editMode ? (
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <Input label="Name" name="name" value={form.name || ""} onChange={handleChange} required />
                            <Input label="Roles (comma separated)" name="roles" value={form.roles || ""} onChange={handleChange} required />
                        </div>

                        <Textarea label="Bio" name="bio" value={form.bio || ""} onChange={handleChange} required />

                        <FileInput label="Photo" name="photo" onChange={handleChange} preview={photoPreview} />

                        <div className="flex gap-2 mt-4">
                            <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setForm(person)
                                    setEditMode(false)
                                    setPhotoPreview(person.photo?.url || null)
                                }}
                                className="px-4 py-2 bg-gray-500 text-gray-200 rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        {photoPreview && <img src={photoPreview} alt={person?.name} className="h-96 rounded-lg shadow mx-auto" />}
                        <p><b>Roles:</b> {person?.roles}</p>
                        <p><b>Bio:</b> {person?.bio}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

/* --- Reusable Components --- */
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

const FileInput = ({ label, preview, ...props }) => (
    <div>
        <label className="block text-sm mb-1">{label}</label>
        <input type="file" accept="image/*" {...props} className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 cursor-pointer bg-gray-50 dark:bg-gray-800" />
        {preview && <img src={preview} alt="preview" className="mt-2 h-48 rounded-lg object-cover" />}
    </div>
)

export default ViewOrEditPerson