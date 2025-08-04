import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'; // Import ReactDOM
import Home from "./pages/home";
import Layout from "./components/layout";
import Login from "./pages/login";
import Signup from "./pages/signup";
import About from "./pages/about";
import ErrorPage from "./pages/errorPage";
// import LayoutUI from "./components/layout_ui";
// import PrivateRoute from "./components/private_routes";

let router = createBrowserRouter([
    {   //these are protected routes
        path: "/",
        element:
            // (<ProtectedRoute >
            <Layout />
        // </ProtectedRoute>)
        ,
        // loader: loadRootData,
        children: [
            {
                path: "/",
                element: <Home />
            },
        ],
        errorElement: <ErrorPage />
    },
    {
        path: "/user",
        // element: null,//todo : change it into just empty div ,a loggedIn verify
        children: [
            {
                path: "",
                // element: (
                //     <ProtectedRoute >
                //         <ProfilePage />
                //     </ProtectedRoute>),
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />
            }
        ],
        errorElement: <ErrorPage />
    },
    {
        path: "/about",
        element: <About />,
        errorElement: <ErrorPage />
    },
    {
        path: "/su", // for Admin
        // element: ,
        errorElement: <ErrorPage />
    },
])

ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />
);
