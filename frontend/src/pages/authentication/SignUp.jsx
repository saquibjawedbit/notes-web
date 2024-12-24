import { useEffect, useState } from "react";
import { OTPView } from ".//common/OTPView";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../context/useAuth.jsx';
import ReactLoading from 'react-loading';

export function SignUp() {
    const location = useLocation();

    const [otpScreen, setOtpScreen] = useState(false);
    const [credential, setCredential] = useState({
        emailId: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {setUser} = useAuth();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredential((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    useEffect(()=>{
        const sendOTP = async () => {
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/resend-otp`, { userId: location.state.userId });
            }
            catch (error) {
                console.log(error.response);
                setError(error.response.data.message);
            }
        };

        if(location.state) {

            console.log(location.state);
        
            setUserId(location.state.userId);
            setOtpScreen(location.state.otpScreen);

            sendOTP();
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        if (credential.password !== credential.confirmPassword) {
            setError("Password and Confirm Password should be the same");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/register`, credential);
            const data = response.data.data.user._id;
            setUserId(data);
            setError("");
            setOtpScreen(true);
        }
        catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setIsLoading(false);
        }
    };

    const onOTPSubmit = async (otp) => {
        try {
            const otpDoc = {
                otp: otp,
                userId: userId,
            };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/verify`, otpDoc);
            console.log(response);
            const user = response.data.data.user;
            setUser(user);
            navigate("/notes");
        }
        catch (error) {
            console.log(error);
        }
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
                                htmlFor="emailId"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="emailId"
                                placeholder="Email"
                                value={credential.emailId}
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
                            disabled={isLoading}
                            className={`text-xl text-white bg-black rounded-lg w-full py-2 mt-4 relative ${isLoading ? 'opacity-70' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <ReactLoading type="cube" color="#00000" height={20} width={20} />
                                    </div>
                                    <span className="opacity-0">Create Account</span>
                                </>
                            ) : (
                                'Create Account'
                            )}
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
                <OTPView userId={userId} onSubmit={onOTPSubmit}/>
            )}
        </>
    );
}
