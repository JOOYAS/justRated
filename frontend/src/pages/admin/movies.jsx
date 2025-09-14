import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ScrollableCarousel from '../../components/scroll_carousel';
import AdminMovieCard from '../../components/admin/adm_movie_card';

const AdminMovies = () => {
    const mockMovies = [
        {
            _id: "1",
            title: "Echoes of Tomorrow",
            rating: 8.3,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "2",
            title: "Neon Horizon",
            rating: 7.9,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "3",
            title: "Shadows in Silence",
            rating: 8.6,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "4",
            title: "Crimson Legacy",
            rating: 7.2,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "5",
            title: "Fragments of Lightssssssssssssss",
            rating: 8.8,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "6",
            title: "Silent Storm",
            rating: 6.9,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "7",
            title: "Beyond the Abyss",
            rating: 8.1,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "8",
            title: "Glass Empire",
            rating: 7.5,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "9",
            title: "Midnight Veil",
            rating: 8.0,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
        {
            _id: "10",
            title: "Rise of Dawn",
            rating: 8.4,
            poster: { url: "https://picsum.photos/300/400?random=1", public_id: "just_rated/wbvr7yyyx0k53ghbtit2" },
        },
    ];

    const navigate = useNavigate();


    return (
        <div className="">
            <section className='md:px-20 min-h-96 pt-10 flex-col gap-4 overflow-hidden'>
                <div className="w-full mx-4 py-16 flex justify-center items-center bg-indigo-900/75 text-white rounded-xl">
                    <Link to={'/su/movies/new'} className='py-2 px-4 border-2 border-white dark:border-neutral-900 rounded-2xl hover:bg-black/15'>＋ Add Movie</Link>
                </div>
                <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6 z-20'>Featured today</h2>
                <ScrollableCarousel>
                    {mockMovies.map((movie) => (
                        <AdminMovieCard key={movie._id} movie={movie} />
                    ))}
                </ScrollableCarousel>


                <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Top 10</h2>
                <ScrollableCarousel>
                    {mockMovies.map((movie) => (
                        <AdminMovieCard key={movie._id} movie={movie} />
                    ))}
                </ScrollableCarousel>

                <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Currently on Theaters</h2>
                <ScrollableCarousel>
                    {mockMovies.map((movie) => (
                        <AdminMovieCard key={movie._id} movie={movie} />
                    ))}
                </ScrollableCarousel>

                <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Indian specials</h2>
                <ScrollableCarousel>
                    {mockMovies.map((movie) => (
                        <AdminMovieCard key={movie._id} movie={movie} />
                    ))}
                </ScrollableCarousel>

                <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Animations</h2>
                <ScrollableCarousel>
                    {mockMovies.map((movie) => (
                        <AdminMovieCard key={movie._id} movie={movie} />
                    ))}
                </ScrollableCarousel>

                <h2 className='text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-6'>Musical movies</h2>
                <ScrollableCarousel>
                    {mockMovies.map((movie) => (
                        <AdminMovieCard key={movie._id} movie={movie} />
                    ))}
                </ScrollableCarousel>
            </section>
        </div>

    )
}

export default AdminMovies
// const mockMovies = [
//     { _id: "m1", title: "Mock A", year: 2024 },
//     { _id: "m2", title: "Mock B", year: 2023 },
// ]

// const AdminMovies = () => {
//     return (
//         <div className="p-6">
//             <h2 className="text-3xl font-bold text-amber-500 mb-6">Manage Movies</h2>
//             <table className="w-full border">
//                 <thead>
//                     <tr className="bg-amber-100 dark:bg-amber-900">
//                         <th className="p-2">Title</th>
//                         <th>Year</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {mockMovies.map(m => (
//                         <tr key={m._id} className="border-t">
//                             <td className="p-2">{m.title}</td>
//                             <td>{m.year}</td>
//                             <td>
//                                 <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2">Edit</button>
//                                 <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default AdminMovies;