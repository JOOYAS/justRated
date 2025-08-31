import { useEffect, useState } from "react";
const ThemeToggle = () => {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        const saved = localStorage.getItem("theme")
        if (saved) {
            setTheme(saved)
            document.documentElement.classList.toggle("dark", saved === "dark")
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            setTheme(prefersDark ? "dark" : "light")
            document.documentElement.classList.toggle("dark", prefersDark)
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
        document.documentElement.classList.toggle("dark", newTheme === "dark")
        localStorage.setItem("theme", newTheme)
    }
    return (
        <button
            onClick={toggleTheme}
            className="group w-full p-4 flex justify-between bg-neutral-950/15 hover:bg-blue-300/50"
        >
            <span>Theme</span>
            <span
                className={`rounded-full size-fit leading-5 p-1 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                    }`}
            >
                {theme === "dark" ? "🌙" : "☀️"}
            </span>
        </button>
    );
}

export default ThemeToggle;