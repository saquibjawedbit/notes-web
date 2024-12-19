import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { OTPView } from "./common/OTPView";
import axios from "axios";

export function Login() {
    const [credential, setCredential] = useState({
        emailId: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredential((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const [OtpScreen, setOtpScreen] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("/api/v1/users/login", credential);
            console.log(response);
            setOtpScreen(true);
        }
        catch (error) {
            console.log(error);
        }
    }


    return <>
        <h2 className="text-2xl md:text-3xl font-bold">Login</h2>
        {
            (!OtpScreen) ? 
        <div>
            <form className="flex flex-col items-center gap-2" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="emailId"
                        placeholder="Email"
                        onChange={handleChange}
                        value={credential.emailId}
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
                        value={credential.password}
                        minLength={6}
                        onChange={handleChange}
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