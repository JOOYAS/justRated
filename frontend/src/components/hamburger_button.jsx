const Hamburger = ({ open, setOpen }) => {

    return (
        <button
            data-dropdown-toggle //a custom attribute to ign9ore click when needed
            onClick={(e) => {
                setOpen(!open)
            }}
            className="md:hidden size-12 text-4xl rounded-lg hover:border-2 border-amber-800 text-amber-700
                       dark:text-white"
        >
            ☰
        </button>
    )
}

export default Hamburger;