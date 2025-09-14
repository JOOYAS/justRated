import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../../utils/axios_instance'
import { setUser } from '../../store/user_slice'

const Profile = () => {
    const [user, setUserDetails] = useState()
    const [isEditing, setIsEditing] = useState(false)
    const [preview, setPreview] = useState(null)
    const userId = useSelector(state => state.user._id)
    const dispatch = useDispatch();


    useEffect(() => {
        axiosInstance.get('/auth/me')
            .then(res => setUserDetails(
                res.data?.userData
            ))
            .catch(() => { })

    }, [userId])

    const [formData, setFormData] = useState({ name: "", email: "" })
    const [file, setFile] = useState(null)

    useEffect(() => {
        if (user)
            setFormData({ name: user.name, email: user.email })
    }, [user])

    const handleFileChange = (e) => {
        const f = e.target.files[0]
        if (f) {
            setFile(f)
            setPreview(URL.createObjectURL(f))
        }
    }

    const handleSave = async () => {
        try {
            const data = new FormData()

            if (formData.name !== user.name) data.append("name", formData.name)
            if (formData.email !== user.email) data.append("email", formData.email)
            if (file) data.append("profile", file)

            if ([...data.keys()].length === 0) {
                setIsEditing(false) // nothing changed
                return
            }

            console.log(data)
            const res = await axiosInstance.patch("/auth/me", data, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            dispatch(setUser(res?.data?.tokenData)) //on Store
            setUserDetails(res?.data?.userData)
            setIsEditing(false)
            setPreview(null)
            setFile(null)

        } catch (err) {
            console.error(err)
        }
    }


    return (
        <div className="max-w-xl mx-auto p-2">
            <h2 className="text-3xl font-bold text-amber-500 dark:text-amber-300 mt-8 text-center">
                Profile
            </h2>

            <div className="flex flex-col">
                {isEditing ? (
                    <div className=''>
                        <label className="">
                            <img
                                src={preview || user?.profile?.url || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.b2eHgoNfj9xct2Py0r5F0gHaHa%3Fpid%3DApi&f=1&ipt=086b3189562c28166f84ed1a7bd9f59ddff228ae0ccfe4fc0a86c54a1191efec&ipo=images"}
                                alt="profile"
                                className="cursor-pointer rounded-full size-48 mx-auto object-cover ring-4 ring-amber-500/20 shadow-md"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                        <div>
                            <input
                                type="text"
                                defaultValue={user?.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full my-4 p-3 rounded-xl border dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                            />
                            <input
                                type="email"
                                defaultValue={user?.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full mb-6 p-3 rounded-xl border dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                            />

                            <div className="flex gap-3 w-full">
                                <button
                                    className="flex-1 px-2 py-1 rounded-xl bg-gray-500 text-white font-medium hover:bg-gray-600 border-4 border-transparent hover:border-amber-100 hover:shadow-xl transition-colors duration-200"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 px-5 py-2.5 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 border-4 border-transparent  hover:border-amber-100 hover:shadow-xl transition-colors duration-200"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                    </div>
                ) : (
                        <div className='relative flex justify-center items-center gap-4 md:gap-12 my-6 md:m-6'>
                            <div className='size-32 rounded-full overflow-hidden  ring-8 ring-amber-500 shadow-md hover:rotate-12 duration-300'>
                                {
                                    user?.profile
                                        ? <img
                                            src={user?.profile?.url || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.b2eHgoNfj9xct2Py0r5F0gHaHa%3Fpid%3DApi&f=1&ipt=086b3189562c28166f84ed1a7bd9f59ddff228ae0ccfe4fc0a86c54a1191efec&ipo=images"}
                                            alt="profile"
                                            className="object-cover h-full"
                                        />
                                        : <span className="">{user?.name.charAt(0).toUpperCase()}</span>
                                }
                            </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1">{user?.name}</h3>
                                <p className="text-gray-500 font-semibold dark:text-gray-300">{user?.email}</p>
                            <button
                                className="absolute top-0 right-0 px-2 py-1 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors duration-200"
                                onClick={() => setIsEditing(true)}
                            >
                                🖊
                            </button>
                        </div>

                    </div>
                )}
            </div>
            <section className="">
                <h2 className="text-3xl font-bold text-amber-500 dark:text-amber-300 mt-8 text-center">Stats</h2>
                <div className="grid grid-cols-2 gap-6 p-4 ">
                    <div className="p-4 rounded-2xl bg-gray-50/15 shadow-sm text-center">
                        <p className="text-3xl font-bold">12</p>
                        <span className="">Reviews</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50/15 shadow-sm text-center">
                        <p className="text-3xl font-bold">34</p>
                        <span className="">Watchlist</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50/15 shadow-sm text-center">
                        <p className="text-3xl font-bold">4.1</p>
                        <span className="">Avg Rating</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50/15 shadow-sm text-center">
                        <p className="text-3xl font-bold">Drama</p>
                        <span className="">Fav Genre</span>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Profile