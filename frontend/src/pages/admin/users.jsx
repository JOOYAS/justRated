const mockUsers = [
    { _id: "u1", name: "Alice", role: "admin" },
    { _id: "u2", name: "Bob", role: "user" },
]

const AdminUsers = () => {
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Manage Users</h2>
            <ul>
                {mockUsers.map(u => (
                    <li key={u._id} className="flex justify-between p-2 border-b">
                        <span>{u.name} ({u.role})</span>
                        <button className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminUsers