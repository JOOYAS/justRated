import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setUser } from '../../store/user_slice'
import axiosInstance from '../../../utils/axios_instance'
import CurrentUser from '../../components/current_user'
import toast from 'react-hot-toast'

const Login = () => {
    const { isLoggedIn } = useSelector((s) => s.user);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const submitHandler = (event) => {
        event.preventDefault()
        // console.log(loginData);
        axiosInstance.post(`/auth/login`, loginData)
            .then(res => {
                toast.success(res.data.message);
                dispatch(setUser(res.data.user))

            })
            .catch(err => {
                console.log(err);
            })
    }

    const changeHandler = (event) => {
        const tempData = { ...loginData }
        tempData[event.target.name] = event.target.value.trim()
        setLoginData(tempData)
    }
    return (
        <div className="relative min-h-dvh flex justify-center-safe w-screen px-[1rem] md:px-12 md:py-12 md:ps-0 bg-gradient-to-br from-indigo-800 to-pink-600 overflow-hidden">
            {isLoggedIn && (
                <div className="absolute w-full inset-0 bg-black/50 flex items-center justify-center z-50">
                    <CurrentUser />
                </div>
            )}
            <div className="relative flex p-6 md:w-[65%] items-center justify-center bg-emerald-50 dark:bg-indigo-950 md:rounded-e-4xl md:shadow-2xl">
                <form className="w-full max-w-sm space-y-6" onSubmit={submitHandler}>
                    <fieldset className="space-y-2">
                        <legend className="w-full text-center text-4xl font-bold mb-6">L<span className='text-indigo-500'>o</span>gin</legend>
                        <label htmlFor="email" className="text-lg font-medium">Email</label>
                        <input type="text" name="email" id='email' placeholder="Type your Email ID"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={changeHandler} />

                        <label htmlFor="password" className="text-lg font-medium">Password</label>
                        <input type="password" id="password" name="password" placeholder="Type your password"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={changeHandler} />

                        <p className="text-red-500 text-sm mb-12">{null}</p>

                        <button type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">Login</button>
                    </fieldset>

                    <p className='text-center'>Not a user? <Link to={'/signup'} className='text-indigo-500 hover:text-indigo-400 underline underline-offset-4'>signup</Link></p>

                </form>
                <img className="absolute h-16 bottom-0 mb-4" src="/just_rated_logo_new3.svg" alt="logo" />
            </div>


            <div className="relative hidden md:flex flex-1 flex-col justify-center items-center">
                <img className='absolute h-screen right-[-50%] opacity-50' src='/star_logo_2_blur.svg' alt='logo' />
                <img className='absolute h-screen bottom-[-50%] opacity-50' src='/star_logo_2_blur.svg' alt='logo' />
                <img className='absolute h-screen top-[-50%] opacity-50' src='/star_logo_2_blur.svg' alt='logo' />


                <p className='px-10 text-3xl font-bold text-center text-amber-50 z-10'>"Welcome back — your next movie awaits."</p>
            </div>
        </div>
  )
}

export default Login