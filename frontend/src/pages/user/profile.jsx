import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../../utils/axios_instance'

const Profile = () => {
    const [user, setUserDetails] = useState()
    const userId = useSelector(state => state.user._id)

    useEffect(() => {
        axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`)
            .then(res => setUserDetails())
            .catch((error) => console.log(error))// keep mock if fails
    }, [])
    return (
        <div className="max-w-md mx-auto p-6 text-center">
            <h2 className="text-3xl font-bold text-amber-500 dark:text-amber-300 mb-6">
                Profile
            </h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                <p className="text-xl font-semibold">{user.name}</p>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                <button className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-white">
                    Edit Profile
                </button>
            </div>
        </div>
    )
}

export default Profile