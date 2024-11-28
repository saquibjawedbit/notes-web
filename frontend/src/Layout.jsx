import React from "react";
import { NavBar } from "./components/navbar/NavBar";
import { Footer } from "./components/footer/Footer";
import { Outlet } from "react-router";

export function Layout() {
    return <>
        <NavBar/>
            <Outlet />
        <Footer/>
    </>;
}