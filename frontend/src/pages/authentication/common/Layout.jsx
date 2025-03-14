import React from "react";
import { Outlet } from "react-router";

export function Layout() {
    return <>
        <div className="bg-black w-screen h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">HR Science Quest</h1>
                <div className="flex flex-col sm:p-12 p-8 bg-gray-900 rounded-2xl items-center gap-4 shadow-lg border border-amber-700/30">
                    <Outlet />
                </div>
            </div>
        </div>
    </>;
}
