import React, { cloneElement, useState } from "react";
import { OTPView } from "./common/OTPView";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ForgotPassword() {
    const [OtpScreen, setOtpScreen] = useState(false);
    const [error, setError] = useState("");
    const [reset, setReset] = useState(false);
    const [userId, setUserId] = useState("");

    const [credential, setCredential] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredential((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    

    const onSubmit = async (e) => {
        e.preventDefault();
        if (credential.password !== credential.confirmPassword) {
            setError("Password and Confirm Password should be the same");
            return;
        }

        try {
            if(!reset) {
                const response = await axios
                    .post("/api/v1/users/forget-password", { emailId: credential.email });
                let userId = response.data.data.id;
                setUserId(userId);
                setOtpScreen(true);
                setError("");
            
            }
            else {
                const response = await axios
                      .post("/api/v1/users/reset-password", { userId, newPassword: credential.password });
                navigate('/login');   
            }
        }
        catch(e) {
            console.log(e.response);
            setError(e.response.data.message);
        }
    };

    const onOTPSubmit = async (otp) => {
        try {
            console.log(userId, otp);
            const response = await axios
                      .post("/api/v1/users/verify", {userId, otp});
            setOtpScreen(false);
            setReset(true);
        }
        catch(e) {
            console.log(e.response);
            setError(e.response.data.message);
        }
    }

    return <>
        <h2 className="text-2xl md:text-3xl font-bold">Forgot Password ?</h2>
        {
            (!OtpScreen) ?
                <div>
                    <form className="flex flex-col items-center gap-2" onSubmit={onSubmit}>
                        {!reset && <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Registered Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Registered Email"
                                onChange={handleChange}
                                required
                                className="p-2 border border-gray-300 rounded-lg w-56 sm:w-80 text-sm md:text-lg placeholder:text-sm"
                            />
                        </div>
                        }
                        {reset && <div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={credential.password}
                                    onChange={handleChange}
                                    minLength={6}
                                    required
                                    className="w-56 sm:w-80 p-2 border border-gray-300 rounded-lg text-sm md:text-lg placeholder:text-sm"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={credential.confirmPassword}
                                    onChange={handleChange}
                                    minLength={6}
                                    required
                                    className="w-56 sm:w-80 p-2 border border-gray-300 rounded-lg text-sm md:text-lg placeholder:text-sm"
                                />
                            </div>
                        </div>}
                        {error && (
                            <p className="text-red-500 text-sm mt-2 sm:w-full w-60">{error}</p>
                        )}
                        <button type="submit" className="text-xl text-white bg-black rounded-lg w-full py-2 mt-4"> Reset </button>
                    </form>
                    <div className="text-xs md:text-sm mt-2">
                        <p>Don't have an account.<Link className="text-blue-600" to='/signup'>  Create one ?</Link></p>
                    </div>
                </div> : <OTPView onSubmit={onOTPSubmit} />
        }

    </>;
}