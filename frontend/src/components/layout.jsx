import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import Pageloader from './pageloader'

const Layout = () => {
    return (
        <>
            <Header />
            <main style={{ backgroundColor: "rgba(100,100,100, 0.5)", minHeight: "90vh" }}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout