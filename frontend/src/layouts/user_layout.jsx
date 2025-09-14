import { Outlet } from 'react-router-dom'
import { lazy } from 'react'

const Header = lazy(() => import('../components/header'));
const Footer = lazy(() => import('../components/footer'));

const UserLayout = () => {
    return (
        <>
            <Header />
            <main className='w-full min-h-[90vh] overflow-hidden mt-[72px]'>
                <div className="mx-auto md:px-96 text-center fixed inset-0 -z-10 bg-amber-50 dark:bg-neutral-800 bg-[url('/bbblurry2.svg')]  bg-top bg-cover bg-no-repeat">
                </div>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default UserLayout