import React from 'react'
import { useNavigate } from 'react-router-dom'

const PersonCard = ({ person }) => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center gap-3 p-3 bg-indigo-900/25 rounded-lg shadow hover:shadow-md transition" onClick={(person) => navigate(`/person/${person?._id || "67uyg987967969898790"}`)}>
            <img src={person.photo || "https://i.pravatar.cc/150?img=6"} alt={`photo of ${person.name}`} className="size-16 md:size-24 rounded-full object-cover overflow-hidden" />
            <h3 className="font-medium text-xl">{person.name || "jackie chan"}</h3>
        </div>
    )
}

export default PersonCard