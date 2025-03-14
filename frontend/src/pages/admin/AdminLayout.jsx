import { Axios } from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth.jsx";
import ReactLoading from "react-loading";

export default function AdminLayout() {

    useEffect(()=>{
        const loadData = async () => {
        }
        loadData();
    }, []);

    const {user, admin, loading} = useAuth();

    if(loading) {
         return <div className='flex items-center justify-center h-[600px]'>
            <ReactLoading type={'cubes'} color={'#000000'} height={'8%'} width={'8%'} />
        </div>
    }

    if(!user || !admin) {
        return <Navigate to="/"/>;
    }


    return <div className="flex">
        <div className='w-1/5 h-screen'></div>
         <nav className="w-1/5 bg-gray-900 text-white h-screen p-4 fixed left-0 top-0 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-6 border-b pb-2">Admin Panel</h1>
            <ul className="space-y-4">
                <li className="mb-2"><Link to="dashboard" className="hover:bg-gray-700 hover:font-bold py-2 px-3 rounded block text-lg font-medium transition-all">Dashboard</Link></li>
                <li className="mb-2"><Link to="create-subject" className="hover:bg-gray-700 hover:font-bold py-2 px-3 rounded block text-lg font-medium transition-all">Create Subject</Link></li>
                <li className="mb-2"><Link to="subjects" className="hover:bg-gray-700 hover:font-bold py-2 px-3 rounded block text-lg font-medium transition-all">Edit Subjects</Link></li>
                <li className="mb-2"><Link to="testimonials" className="hover:bg-gray-700 hover:font-bold py-2 px-3 rounded block text-lg font-medium transition-all">Testimonials</Link></li>
                <li className="mb-2"><Link to="users" className="hover:bg-gray-700 hover:font-bold py-2 px-3 rounded block text-lg font-medium transition-all">Landing Page Management</Link></li>
                <li className="mt-8"><Link to="/" className="hover:bg-red-700 bg-red-600 py-2 px-3 rounded block text-center font-medium">Exit Admin</Link></li>
            </ul>
        </nav>
        <div className="w-4/5 p-6 ml-auto">
            <Outlet/>
        </div>
    </div>
}