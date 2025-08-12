import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'; // Import ReactDOM
import ErrorPage from "./pages/public/errorPage";
import Layout from "./components/layout";
import Home from "./pages/home";
import Person from "./pages/person";
const Profile = lazy(() => import("./pages/profile"));
const MovieDetail = lazy(() => import("./pages/movie_detail"));
const Login = lazy(() => import("./pages/public/login"));
const Signup = lazy(() => import("./pages/public/signup"));
const About = lazy(() => import("./pages/about"));
const Movies = lazy(() => import("./pages/movies_list"));
// import LayoutUI from "./components/layout_ui";
// import PrivateRoute from "./components/private_routes";

let router = createBrowserRouter([
    {
        path: "",
        // element: null,//todo : change it into just empty div ,a loggedIn verify
        children: [
            {
                path: "/",
                element: <Layout />,//should be protected
                // loader: loadRootData,
                children: [
                    {
                        path: "/",
                        element: <Home />
                    },
                    {
                        path: "/movies",
                        element:
                            <Suspense fallback={null}>
                                <Movies />
                            </Suspense>,
                        children: [

                        ]
                    },
                    {
                        path: "/movies/:id",
                        element:
                            <Suspense fallback={null}>
                                <MovieDetail />
                            </Suspense>
                    },
                    {
                        path: "/person/:id",
                        element:
                            <Suspense fallback={null}>
                                <Person />
                            </Suspense>
                    },
                    {
                        path: "/watchlist",
                        element:
                            <Suspense fallback={null}>
                                {/* <Watchlist /> */}
                            </Suspense>
                    },
                    {
                        path: "/about",
                        element:
                            <Suspense fallback={null}>
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
                // element: 
                // // (<ProtectedRoute >
                // // <AdminLayout />
                // // </ProtectedRoute>)
                // ,
                children: [
                    {
                        path: "dashboard",
                        // element: <Dashboard />
                    },
                    {
                        path: "search", // find movies,persons,users, review  and links to see
                        // element: <SearchforAdmin />
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
                    }
                ]
            },
            // {
            //     path: "",
            //     // element: (
            //     //     <ProtectedRoute >
            //     //         <ProfilePage />
            //     //     </ProtectedRoute>),
            // },
        ],
        errorElement: <ErrorPage />
    }

])

ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />
);
function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    });
}