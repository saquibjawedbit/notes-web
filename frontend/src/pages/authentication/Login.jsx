import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { OTPView } from "./common/OTPView";

export function Login() {
    const credential = {
        email: "",
        password: "",
    }

    const [OtpScreen, setOtpScreen] = useState(false);

    function onSubmit(e) {
        e.preventDefault();
        setOtpScreen(true);
    }


    return <>
        <h2 className="text-2xl md:text-3xl font-bold">Login</h2>
        {
            (!OtpScreen) ? 
        <div>
            <form className="flex flex-col items-center gap-2" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => {
                            credential.email = e.target.value;
                        }}
                        required
                        className="p-2 border border-gray-300 rounded-lg w-56 sm:w-80 text-sm md:text-lg placeholder:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        minLength={6}
                        onChange={(e) => {
                            credential.password = e.target.value
                        }}
                        required
                        className="w-56 sm:w-80 p-2 border border-gray-300 rounded-lg text-sm md:text-lg placeholder:text-sm"
                    />
                </div>
                <div className="self-end text-xs mb-2">
                    <Link to='/forgotPassword'>Forgot Password ?</Link>
                </div>
                <button type="submit" className="text-xl text-white bg-black rounded-lg w-full py-2"> Login </button>
            </form>
            <div className="text-xs md:text-sm mt-2">
                <p>Don't have an account.<Link className="text-blue-600" to='/signup'>  Create one ?</Link></p>
            </div>
        </div> : <OTPView/>
        }

    </>;





}