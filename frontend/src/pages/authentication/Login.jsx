import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../../context/useAuth.jsx';
import ReactLoading from 'react-loading';


export function Login() {
    const [credential, setCredential] = useState({
        emailId: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user, loading, setUser } = useAuth();

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


    return <>
        <h2 className="text-2xl md:text-3xl font-bold">Login</h2>
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
                {error && (
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`text-xl text-white bg-black rounded-lg w-full py-2 relative ${isLoading ? 'opacity-70' : ''}`}
                > 
                    {isLoading ? (
                        <>
                            <div className="absolute left-0 top-0 w-full">
                               <ReactLoading type="cube" color="#00000" height={20} width={20} />
                            <span className="opacity-0" >Login</span>
                            </div>
                        </>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
            <div className="text-xs md:text-sm mt-2">
                <p>Don't have an account.<Link className="text-blue-600" to='/signup'>  Create one ?</Link></p>
            </div>
        </div>

    </>;





}