import React from "react";
import { useEffect, useState } from "react";

export function OTPView({onSubmit}) {
    const otp = ["", "", "", ""];

    const inputRefs = Array(otp.length)
        .fill(0)
        .map(() => React.createRef());

    const handleChange = (e, index) => {

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
            onSubmit(otp);
        }
    }


    function Timer() {
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
        }


        return (<h3 className="text-sm font-light">Didn't receive an OTP ? { (seconds !== 0) ? (<span className='font-semibold'>00:{seconds.toString().padStart(2, '0')} </span>) : (<button className="font-semibold" onClick={resendOtp}>Resend</button>)} </h3>);
    }

    return (
        <div className="flex flex-col items-center gap-6 ">
            <h3 className="text-sm">Enter the OTP sent to your Email</h3>
            <form className="flex flex-row gap-6 justify-center">
                {otp.map((value, index) => <input
                    key={index}
                    ref={inputRefs[index]}
                    type="number"
                    max={"9"}
                    onChange={(e) => handleChange(e, index)}
                    onWheel={(e) => e.currentTarget.blur()} // Disable spinner
                    className="w-14 h-14 focus:border-black border-2 text-center rounded-lg text-2xl font-bold"
                    required />
                )}
              
            </form>
            <Timer />
        </div>
    );

}