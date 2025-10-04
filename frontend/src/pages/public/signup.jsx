import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axios_instance';
import CurrentUser from '../../components/current_user';
import toast from 'react-hot-toast';
import { setUser } from '../../store/user_slice';

const Signup = () => {
    const { isLoggedIn } = useSelector((s) => s.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setSignupData((prev) => ({
            ...prev,
            [name]: value.trim(),
        }));
    };

    const validateForm = () => {
        if (!signupData.name || !signupData.email || !signupData.password) {
            return "All fields are required";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(signupData.email)) {
            return "Please enter a valid email address";
        }
        if (signupData.password.length < 6) {
            return "Password must be at least 6 characters";
        }
        if (signupData.password !== signupData.confirmPassword) {
            return "Passwords do not match";
        }
        return null;
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);
            setError("");
            const res = await axiosInstance.post(`/auth/signup`, signupData);
            if (res.data?.user) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message || "Signup successful!");
                navigate("/", { replace: true });
            }
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-dvh flex flex-row-reverse justify-center-safe w-screen px-[1rem] md:px-12 md:py-12 md:pe-0 bg-gradient-to-tr from-indigo-800 to-pink-600 overflow-hidden">
            {isLoggedIn && (
                <div className="absolute w-full inset-0 bg-black/50 flex items-center justify-center z-50">
                    <CurrentUser />
                </div>
            )}

            <div className="relative flex md:w-[65%] items-center justify-center p-8 bg-emerald-50 dark:bg-indigo-950 md:rounded-s-3xl shadow-2xl z-10">
                <form className="w-full max-w-sm space-y-6" onSubmit={submitHandler}>
                    <fieldset className="space-y-2">
                        <legend className="w-full text-center text-4xl font-bold mb-6">
                            Si<span className="text-indigo-500">g</span>nUp
                        </legend>

                        <label htmlFor="name" className="text-lg font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Type your Name"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={changeHandler}
                        />

                        <label htmlFor="email" className="text-lg font-medium">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Type your Email ID"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={changeHandler}
                        />

                        <label htmlFor="password" className="text-lg font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Type your password"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={changeHandler}
                        />

                        <label htmlFor="confirmPassword" className="text-lg font-medium">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Re-type your password"
                            className="w-full border rounded-lg mb-6 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={changeHandler}
                        />

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 rounded-lg text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-700 hover:bg-indigo-800"
                                }`}
                        >
                            {loading ? "Signing up..." : "Signup"}
                        </button>
                    </fieldset>

                    <p className="text-center">
                        Have an account?{" "}
                        <Link
                            to={"/login"}
                            className="text-blue-500 hover:text-blue-600 underline underline-offset-4"
                        >
                            Login
                        </Link>
                    </p>
                </form>
                <img
                    className="absolute h-16 bottom-0 mb-4"
                    src="/images/just_rated_logo_new3.svg"
                    alt="logo"
                />
            </div>

            <div className="relative hidden md:flex flex-1 flex-col justify-center items-center">
                <img
                    className="absolute h-screen right-[-50%] opacity-50 z-0"
                    src="/images/star_logo_2_blur.svg"
                    alt="logo"
                />
                <img
                    className="absolute h-screen bottom-[-50%] opacity-50"
                    src="/images/star_logo_2_blur.svg"
                    alt="logo"
                />
                <img
                    className="absolute h-screen top-[-50%] opacity-50"
                    src="/images/star_logo_2_blur.svg"
                    alt="logo"
                />

                <p className="px-10 text-3xl font-bold text-white text-center z-10">
                    "SignUp to rate, review, and explore movies in our collection"
                </p>
            </div>
        </div>
    );
};

export default Signup;