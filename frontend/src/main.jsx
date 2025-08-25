import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import ErrorPage from "./pages/public/errorPage";
import LoaderOverlay from "./components/loader_overlay";
import UserLayout from "./layouts/user_layout";
import Login from "./pages/public/login";
import { Provider } from "react-redux";

import store from './store';
import AuthInitializer from "./components/authcheck";
import PrivateRoute from "./components/private_route";
import AdminLayout from "./layouts/admin_layout";

const Home = lazy(() => import('./pages/user/home'));
const PersonDetail = lazy(() => import("./pages/user/person"));
const Profile = lazy(() => import("./pages/user/profile"));
const MovieDetail = lazy(() => import("./pages/user/movie_detail"));
const Signup = lazy(() => import("./pages/public/signup"));
const About = lazy(() => import("./pages/public/about"));
const Movies = lazy(() => import("./pages/user/movies_list"));

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
                // loader: loadRootData,

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
                                {/* <Watchlist /> */}
                            </Suspense>
                    },
                    {
                        path: "/about",
                        element:
                            <Suspense fallback={<LoaderOverlay />}>
                                <About />
                            </Suspense>
                    },
                    {
                        path: "/profile",
                        element: <Profile />
                    },
                ]
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
                // ,
                children: [
                    {
                        path: "dashboard",
                        // element: <Dashboard />
                    },
                    {
                        path: "search", // find movies,persons,users, review  and links to see
                        // element: <SuSearch />
                    },
                    {
                        path: "movies/new",
                        // element: <NewMovie />
                    },
                    {
                        path: "movies/:id",// view movie , update movie
                        // element: <MovieforAdmin />
                    },
                    {
                        path: "person/new", //person is not user. its like cast oor director
                        // element: <NewPerson />
                    },
                    {
                        path: "person/:id",// view and edit person details
                        // element: </AdminViewPerson />
                    },
                    {
                        path: "users",
                        // element: <UserListforAdmin />
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
        <RouterProvider
            router={router}
            fallbackElement={<LoaderOverlay />}
        />
    </Provider>
);





// function wait(time) {
//     return new Promise(resolve => {
//         setTimeout(resolve, time)
//     });
// }