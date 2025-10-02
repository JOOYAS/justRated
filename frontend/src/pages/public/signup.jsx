import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axios_instance';
import CurrentUser from '../../components/current_user';
import toast from 'react-hot-toast';

const Signup = () => {
    const { isLoggedIn } = useSelector((s) => s.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [signupData, setSignupData] = useState({
        email: "",
        password: ""
    })

    const submitHandler = (event) => {
        event.preventDefault()
        console.log(signupData);
        axiosInstance.post(`/auth/signup`, signupData)
            .then(res => res.data)
            .then(data => {
                // console.log(data?.user)
                if (data?.user) {
                    dispatch(setUser(data.user));
                    toast.success(res.data.message);
                }
                navigate("/", { replace: true })
            })
            .catch(err => {
                console.log(err);

            })
    }

    const changeHandler = (event) => {
        const tempData = { ...signupData }
        tempData[event.target.name] = event.target.value.trim()
        setSignupData(tempData)
    }


    return (
        <div className="relative min-h-dvh flex flex-row-reverse justify-center-safe w-screen px-[1rem] md:px-12 md:py-12 md:pe-0 bg-gradient-to-tr from-indigo-800 to-pink-600 overflow-hidden">
            {isLoggedIn && (
                <div className="absolute w-full inset-0 bg-black/50 flex items-center justify-center z-50">
                    <CurrentUser />
                </div>
            )}
            <div className="relative flex md:w-[65%] items-center justify-center p-8 bg-emerald-50 dark:bg-indigo-950  md:rounded-s-3xl shadow-2xl z-10">
                <form className="w-full max-w-sm space-y-6" onSubmit={submitHandler}>
                    <fieldset className="space-y-2">
                        <legend className="w-full text-center text-4xl font-bold mb-6">Si<span className='text-indigo-500'>g</span>nUp</legend>

                        <label htmlFor="name" className="text-lg font-medium">Name</label>
                        <input type="text" id="name" name="name" placeholder="Type your Name"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={changeHandler} />

                        <label htmlFor="email" className="text-lg font-medium">Email</label>
                        <input type="text" name="email" id='email' placeholder="Type your Email ID"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={changeHandler} />

                        <label htmlFor="password" className="text-lg font-medium">Password</label>
                        <input type="password" id="password" name="password" placeholder="Type your password"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={changeHandler} />

                        <p className="text-red-500 text-sm mb-12">{error}</p>

                        <button type="submit"
                            className="w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800">Signup</button>
                    </fieldset>

                    <p className='text-center'>have an account? <Link to={'/login'} className='text-blue-500 hover:text-blue-600 underline underline-offset-4'>login</Link></p>
                </form>
                <img className="absolute h-16 bottom-0 mb-4" src="/images/just_rated_logo_new3.svg" alt="logo" />
            </div>


            <div className="relative hidden md:flex flex-1 flex-col justify-center items-center">
                <img className='absolute h-screen right-[-50%] opacity-50 z-0' src='/images/star_logo_2_blur.svg' alt='logo' />
                <img className='absolute h-screen bottom-[-50%] opacity-50' src='/images/star_logo_2_blur.svg' alt='logo' />
                <img className='absolute h-screen top-[-50%] opacity-50' src='/images/star_logo_2_blur.svg' alt='logo' />

                <p className='px-10 text-3xl font-bold text-white text-center z-10'>"Signin to rate, review, and explore every movie in our collection"</p>
            </div>
        </div>
    )
}

export default Signup