import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';

export function OTPView({userId, onSubmit}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const otp = ["", "", "", ""];

    const inputRefs = Array(otp.length)
        .fill(0)
        .map(() => React.createRef());

    const handleChange = async (e, index) => {
        const value = e.target.value;
        if (value.length === 1 && index < otp.length - 1) {
            inputRefs[index + 1].current.focus();
        }
        else if ((value.length === 0) && index > 0) {
            inputRefs[index - 1].current.focus();
        }
        else if (value.length > 1) {
            e.target.value = value[0];
            if (index < otp.length - 1) inputRefs[index + 1].current.focus();
        }
        otp[index] = value[0];

        if (index == otp.length - 1 && value.length != 0) {
            setIsLoading(true);
            setError("");
            try {
                await onSubmit(otp.join(""));
            } catch (err) {
                setError(err.response?.data?.message || "Invalid OTP");
                // Clear OTP fields on error
                otp.forEach((_, i) => {
                    if (inputRefs[i].current) {
                        inputRefs[i].current.value = "";
                    }
                });
                inputRefs[0].current.focus();
            } finally {
                setIsLoading(false);
            }
        }
    }

    const resendOtp = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/resend-otp`, { userId: userId });
        }
        catch (error) {
            console.log(error.response.data.message);
        }
    };


    function Timer({onClick}) {
        const [seconds, setSeconds] = useState(30); // Set initial time (30 seconds)
        let isActive = true; // Track if the timer is running
        
        useEffect(() => {
            let interval = null;
            if (isActive && seconds > 0) {
                interval = setInterval(() => {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }, 1000); // Update every 1000ms (1 second)
            } else if (seconds === 0) {
                clearInterval(interval); // Stop the timer once it reaches 0
                isActive = !isActive;
            }

            return () => clearInterval(interval); // Clean up interval on component unmount
        }, [seconds]); // Re-run useEffect when `isActive` or `seconds` changes

        const resendOtp = () => {
            setSeconds(30);
            isActive = true;
            if(isActive)    {
                onClick();
            }
        }


        return (<h3 className="text-sm font-light">Didn't receive an OTP ? { (seconds !== 0) ? (<span className='font-semibold'>00:{seconds.toString().padStart(2, '0')} </span>) : (<button className="font-semibold" onClick={resendOtp}>Resend</button>)} </h3>);
    }

    return (
        <div className="flex flex-col items-center gap-6">
            <h3 className="text-sm">Enter the OTP sent to your Email</h3>
            <form className="flex flex-col items-center gap-4">
                <div className="flex flex-row gap-6 justify-center">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            ref={inputRefs[index]}
                            type="number"
                            max={"9"}
                            onChange={(e) => handleChange(e, index)}
                            onWheel={(e) => e.currentTarget.blur()}
                            className="w-14 h-14 focus:border-black border-2 text-center rounded-lg text-2xl font-bold"
                            disabled={isLoading}
                            required 
                        />
                    ))}
                </div>
                
                {isLoading && (
                    <div className="w-full flex justify-center mt-2">
                        <ReactLoading type="bars" color="#000000" height={30} width={30} />
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mt-2">
                        {error}
                    </div>
                )}
            </form>
            <Timer onClick={resendOtp}/>
        </div>
    );

}