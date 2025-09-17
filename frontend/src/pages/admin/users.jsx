import { useEffect, useState } from "react"
import axiosInstance from "../../../utils/axios_instance"

const mockUsers = [
    { _id: "u1", name: "Alice", role: "admin" },
    { _id: "u2", name: "Bob", role: "user" },
]

const AdminUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axiosInstance.get('/user')
            .then(res => {
                console.log(res);

                setUsers(res.data?.users)
            })
            .catch(err => {
                console.error(err)
                setUsers(mockUsers)
            })
    }, [])

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Manage Users</h2>
            <ul>
                {users.map(u => (
                    <li key={u._id} className={`flex justify-between items-center p-2 border-b ${u.role === "admin" ? "bg-green-200/35 rounded-xl" : ""}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <img
                                src={!u?.profile?.url ? `https://ui-avatars.com/api/?name=${u?.name}` : u?.profile?.url}
                                alt={u.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {u.name} {u.role === "admin" ? `(${u.role})` : ""}
                            </span>
                        </div>

                        <button className={`px-2 py-1 text-white rounded cursor-pointer ${u.role === "admin" ? "cursor-not-allowed bg-neutral-500" : " bg-red-500"}`} disabled={u.role === "admin"}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminUsers