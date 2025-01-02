import { useEffect, useState } from "react";
import { OTPView } from ".//common/OTPView";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../context/useAuth.jsx';
import ReactLoading from 'react-loading';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();

    const {setUser} = useAuth();

    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        setPasswordStrength(strength);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredential((prev) => ({
            ...prev,
            [id]: value,
        }));
        if (id === 'password') {
            checkPasswordStrength(value);
        }
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
            setUserId(location.state.userId);
            setOtpScreen(location.state.otpScreen);

            sendOTP();
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        if (!acceptTerms) {
            setError("Please accept the terms and conditions");
            setIsLoading(false);
            return;
        }

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
        <div className="h-[400px] flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Create Account
                </h2>
                {!otpScreen ? (
                    <div>
                        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="mb-4">
                                    <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="emailId"
                                        placeholder="Email"
                                        value={credential.emailId}
                                        onChange={handleChange}
                                        required
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            placeholder="Password"
                                            value={credential.password}
                                            onChange={handleChange}
                                            minLength={6}
                                            required
                                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex gap-1">
                                            {[...Array(4)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`h-1 w-full rounded-full ${
                                                        index < passwordStrength
                                                            ? passwordStrength === 1
                                                                ? 'bg-red-500'
                                                                : passwordStrength === 2
                                                                ? 'bg-yellow-500'
                                                                : passwordStrength === 3
                                                                ? 'bg-blue-500'
                                                                : 'bg-green-500'
                                                            : 'bg-gray-200'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {passwordStrength === 0 && 'Enter password'}
                                            {passwordStrength === 1 && 'Weak'}
                                            {passwordStrength === 2 && 'Fair'}
                                            {passwordStrength === 3 && 'Good'}
                                            {passwordStrength === 4 && 'Strong'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-4">
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
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                    I accept the{' '}
                                    <a href="/terms" className="text-blue-600 hover:text-blue-500">
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>

                            {error && (
                                <div className="rounded-md bg-red-50 p-4">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {isLoading ? (
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <ReactLoading type="spin" color="#ffffff" height={20} width={20} />
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>

                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link className="font-medium text-blue-600 hover:text-blue-500" to="/login">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                ) : (
                    <OTPView userId={userId} onSubmit={onOTPSubmit} />
                )}
            </div>
        </div>
    );
}
