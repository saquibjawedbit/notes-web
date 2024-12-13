import React, { useState } from "react";
import { OTPView } from ".//common/OTPView";
import { Link } from "react-router";

export function SignUp() {
    const [otpScreen, setOtpScreen] = useState(false);
    const [credential, setCredential] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredential((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (credential.password !== credential.confirmPassword) {
            setError("Password and Confirm Password should be the same");
            return;
        }

        setError("");
        setOtpScreen(true);
    };

    return (
        <>
            <h2 className="text-2xl md:text-3xl font-bold">Create Account</h2>
            {!otpScreen ? (
                <div>
                    <form
                        className="flex flex-col items-center gap-1"
                        onSubmit={onSubmit}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={credential.email}
                                onChange={handleChange}
                                required
                                className="p-2 border border-gray-300 rounded-lg w-56 sm:w-80 text-sm md:text-lg placeholder:text-sm"
                            />
                        </div>
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
                        


                        {error && (
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="text-xl text-white bg-black rounded-lg w-full py-2 mt-4"
                        >
                            Create Account
                        </button>
                    </form>
                    <div className="text-xs md:text-sm mt-2">
                        <p>
                            Already have an account?
                            <Link className="text-blue-600" to='/login'>
                                {" "}
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            ) : (
                <OTPView />
            )}
        </>
    );
}
