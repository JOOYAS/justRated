import { useState } from "react";

const AdminSearchBar = ({ onSearch, classNames = "" }) => {
    const [query, setQuery] = useState("");
    const [type, setType] = useState("movies");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch?.({ query, type });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex items-center w-full max-w-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm h-10'
        >
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-full bg-transparent text-sm text-gray-600 dark:text-gray-300 outline-none px-2 border-r border-gray-300 dark:border-gray-700"
            >
                <option value="movies">Movies</option>
                <option value="users">Users</option>
                <option value="persons">Persons</option>
            </select>

            <input
                type="text"
                placeholder={`Search ${type}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 h-full px-2 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none text-sm"
            />

            <button
                type="submit"
                className="h-full px-3 text-gray-500 hover:text-amber-500 text-2xl flex items-center justify-center"
            >
                ⌕
            </button>
        </form>
    );
};

export default AdminSearchBar;