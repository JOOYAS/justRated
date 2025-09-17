import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from './store';


import ErrorPage from "./pages/public/errorPage";
import LoaderOverlay from "./components/loader_overlay";
import UserLayout from "./layouts/user_layout";
import Login from "./pages/public/login";
import AuthInitializer from "./components/authcheck";
import PrivateRoute from "./components/private_route";
import Persons from "./pages/admin/persons";

const AdminLayout = lazy(() => import("./layouts/admin_layout"));
const AdminDashboard = lazy(() => import("./pages/admin/dashboard"));
const AdminMovies = lazy(() => import("./pages/admin/movies"));
const AdminUsers = lazy(() => import("./pages/admin/users"));
const AdminReviews = lazy(() => import("./pages/admin/reviews"));
const NewMovie = lazy(() => import("./pages/admin/new_movie"));
const ViewOrEditMovie = lazy(() => import("./pages/admin/view_or_edit_movie"));

const Home = lazy(() => import('./pages/user/home'));
const PersonDetail = lazy(() => import("./pages/user/person"));
const Profile = lazy(() => import("./pages/user/profile"));
const MovieDetail = lazy(() => import("./pages/user/movie_detail"));
const Signup = lazy(() => import("./pages/public/signup"));
const About = lazy(() => import("./pages/public/about"));
const Movies = lazy(() => import("./pages/user/movies_list"));
const Watchlist = lazy(() => import("./pages/user/watchlist"));

let router = createBrowserRouter([
    {
        path: "",
        element: <AuthInitializer />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: //protected
                    <PrivateRoute allowedRoles={["user", "admin"]} >
                        <UserLayout />
                    </PrivateRoute>,

                children: [
                    {
                        path: "/",
                        element: <Home />
                    },
                    {
                        path: "/movies",
                        element:
                            <Suspense fallback={<LoaderOverlay />}>
                                <Movies />
                            </Suspense>,
                    },
                    {
                        path: "/movies/:id",
                        element:
                            <Suspense fallback={<LoaderOverlay />}>
                                <MovieDetail />
                            </Suspense>
                    },
                    {
                        path: "/person/:id",
                        element:
                            <Suspense fallback={<LoaderOverlay />}>
                                <PersonDetail />
                            </Suspense>
                    },
                    {
                        path: "/watchlist",
                        element:
                            <Suspense fallback={<LoaderOverlay />}>
                                <Watchlist />
                            </Suspense>
                    },
                    {
                        path: "/profile",
                        element: <Profile />
                    },
                ]
            },
            {
                path: "/about",
                element:
                    <Suspense fallback={<LoaderOverlay />}>
                        <About />
                    </Suspense>
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "/su", // for Admin, Protected
                element:
                    <PrivateRoute allowedRoles={["admin"]}>
                        <AdminLayout />
                    </PrivateRoute>,
                children: [
                    {
                        path: "/su",
                        element: <AdminDashboard />
                    },
                    {
                        path: "movies",
                        element: <AdminMovies />
                    },
                    {
                        path: "movies/new",
                        element: <NewMovie />
                    },
                    {
                        path: "movies/:id",// view movie , update movie
                        element: <ViewOrEditMovie />
                    },
                    {
                        path: "reviews",
                        element: <AdminReviews />
                    },
                    {
                        path: "persons", //person is not user. its like cast oor director
                        element: <Persons />
                    },
                    {
                        path: "persons/new", //person is not user. its like cast oor director
                        // element: <NewPerson />
                    },
                    {
                        path: "person/:id",// view and edit person details
                        // element: </AdminViewPerson />
                    },
                    {
                        path: "users",
                        element: <AdminUsers />
                    },
                    {
                        path: "users/:id",
                    // element: <UserDataforAdmin />
                    }
                ]
            },
        ],
    }
]);

ReactDOM.createRoot(root).render(
    <Provider store={store}>
        <div className="text-gray-950 dark:text-neutral-100">
            <RouterProvider
            router={router}
            fallbackElement={<LoaderOverlay />}
            />   
        </div>   
    </Provider>
);





// function wait(time) {
//     return new Promise(resolve => {
//         setTimeout(resolve, time)
//     });
// }