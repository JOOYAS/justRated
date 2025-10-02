import React from 'react'
import { useNavigate } from 'react-router-dom'
import LazyImage from './lazy_image'

const PersonCard = ({ person }) => {
    const navigate = useNavigate()

    return (
        <div
            className="group flex items-center gap-4 p-1 md:p-2 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/person/${person?._id || "67uyg987967969898790"}`)}
        >
            {/* photo */}
            <LazyImage
                publicId={person?.photo?.public_id}
                alt={`${person?.name}'s photo`}
                className="w-16 h-20 md:w-24 md:h-30 rounded-xl object-cover border-4 border-amber-500/30 group-hover:border-amber-500 transition"
            />

            {/* Info */}
            <div className="flex flex-col justify-center">
                <h3 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-white">
                    {person?.name || "Jackie Chan"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">View profile</p>
            </div>
        </div>
    )
}

export default PersonCard