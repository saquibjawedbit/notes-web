import { Axios } from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { Link, Navigate } from "react-router";
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
         <nav className="w-1/5 bg-black text-white h-screen p-4 fixed">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <ul>
                <li className="mb-2"><Link to="create-subject" href="#" className="hover:font-bold text-xl font-semibold">Create Subject</Link></li>
                <li><Link to="subjects" href="#" className="hover:font-bold text-xl font-semibold">Edit Subject</Link></li>
            </ul>
        </nav>
        <Outlet/>
    </div>
}