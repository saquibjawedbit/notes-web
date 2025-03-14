import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../../context/useAuth.jsx';
import ReactLoading from 'react-loading';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';

export function Login() {
    const [credential, setCredential] = useState({
        emailId: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user, loading, setUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredential((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    async function onSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        

        try {
            const respone  = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/login`, credential);
            const user = respone.data.data.user;
            setUser(user);
            
            if(user.verified === false) {
                navigate('/signup', {state: {userId: user._id, otpScreen: true}});
            }
            else {
                navigate('/notes');
            }      
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-[400px] flex items-center justify-center bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-black p-8 rounded-xl shadow-lg border border-amber-500/20">
                <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-yellow-500 to-amber-300 bg-clip-text text-transparent">
                    Welcome Back
                </h2>
                <div>
                    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mb-4">
                                <label htmlFor="emailId" className="block text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-gray-500" />
                                    </div>
                                    <input
                                        type="email"
                                        id="emailId"
                                        placeholder="Enter your email"
                                        onChange={handleChange}
                                        value={credential.emailId}
                                        required
                                        className="appearance-none relative block w-full pl-10 px-3 py-2 border border-gray-600 bg-gray-800 placeholder-gray-400 text-gray-200 rounded-lg focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-500" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Enter your password"
                                        value={credential.password}
                                        minLength={6}
                                        onChange={handleChange}
                                        required
                                        className="appearance-none relative block w-full pl-10 px-3 py-2 border border-gray-600 bg-gray-800 placeholder-gray-400 text-gray-200 rounded-lg focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                    >
                                        {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                    Remember me
                                </label>
                            </div>
                            <Link
                                to="/forgotPassword"
                                className="text-sm font-medium text-amber-500 hover:text-amber-400"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {error && (
                            <div className="rounded-md bg-red-50 p-4">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gradient-to-r from-yellow-500 to-amber-300 hover:from-yellow-600 hover:to-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300"
                        >
                            {isLoading ? (
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <ReactLoading type="spin" color="#000000" height={20} width={20} />
                                </div>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{' '}
                            <Link className="font-medium text-amber-500 hover:text-amber-400" to="/signup">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}