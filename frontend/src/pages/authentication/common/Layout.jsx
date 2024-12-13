import React from "react";
import { Outlet } from "react-router";

export function Layout() {
    return <>
        <div className="bg-slate-100 w-screen h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">School Buddy</h1>
                <div className="flex flex-col sm:p-12 p-8 bg-white rounded-2xl items-center gap-4 shadow-lg">
                    <Outlet />
                </div>
            </div>
        </div>
    </>;
}
