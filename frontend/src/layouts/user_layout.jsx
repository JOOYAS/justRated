import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
import { useSelector } from 'react-redux'

const UserLayout = () => {
    return (
        <>
            <Header />
            <main className='w-full min-h-[90vh] overflow-hidden mt-[72px]'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default UserLayout