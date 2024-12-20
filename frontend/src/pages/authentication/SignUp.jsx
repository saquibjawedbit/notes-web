import { useEffect, useState } from "react";
import { OTPView } from ".//common/OTPView";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

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

    const navigate = useNavigate();

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
                await axios.post("/api/v1/users/resend-otp", { userId: location.state.userId });
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
        if (credential.password !== credential.confirmPassword) {
            setError("Password and Confirm Password should be the same");
            return;
        }

        try {
            const response = await axios.post("/api/v1/users/register", credential);
            const data = response.data.data.user._id;
            setUserId(data);
            setError("");
            setOtpScreen(true);
        }
        catch (error) {
            setError(error.response.data.message);
        }
    };

    const onOTPSubmit = async (otp) => {
        try {
            const otpDoc = {
                otp: otp,
                userId: userId,
            };

            await axios.post("/api/v1/users/verify", otpDoc);
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
                <OTPView userId={userId} onSubmit={onOTPSubmit}/>
            )}
        </>
    );
}
