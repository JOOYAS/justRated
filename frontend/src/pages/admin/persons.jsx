import React from 'react'
import { Link } from 'react-router-dom'

const Persons = () => {
    return (
        <section className='md:px-20 min-h-96 pt-10 flex-col gap-4 overflow-hidden'>
            <div className="md:w-full mx-4 py-16 flex justify-center items-center bg-indigo-900/75 text-white rounded-xl">
                <Link to={'/su/persons/new'} className='py-2 px-4 border-2 border-white rounded-2xl hover:bg-black/15'>＋ Add Person</Link>
            </div>
            <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6 z-20'>Persons</h2>

        </section>
    )
}

export default Persons
