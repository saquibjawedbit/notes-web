import { Axios } from "axios";
import { useEffect } from "react";
import {Outlet } from "react-router";
import { Link } from "react-router";

export default function AdminLayout() {

    useEffect(()=>{
        const loadData = async () => {
            
        }
        loadData();
    }, []);


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