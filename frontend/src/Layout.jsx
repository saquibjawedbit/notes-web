import { NavBar } from "./components/navbar/NavBar";
import { Footer } from "./components/footer/Footer";
import { Outlet } from "react-router";

export function Layout() {
    return <div className="min-h-screen flex flex-col justify-between bg-black text-amber-100">
        <NavBar/>
        <div className="flex-grow">
                <Outlet />
        </div>
        <Footer/>
    </div>;
}