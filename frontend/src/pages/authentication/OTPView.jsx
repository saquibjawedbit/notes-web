import React from "react";
import { useEffect, useState } from "react";

export function OTPView() {
    const otp = ["", "", "", ""];

    const inputRefs = Array(otp.length)
        .fill(0)
        .map(() => React.useRef());

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value.length === 1 && index < otp.length - 1) {
            inputRefs[index + 1].current.focus();
        }
        else if (value.length === 0 && index > 0) {
            inputRefs[index - 1].current.focus();
        }
        else if (value.length > 1) {
            e.target.value = value[0];
            if (index < otp.length - 1) inputRefs[index + 1].current.focus();
        }
        otp[index] = value[0];

        if (index == otp.length - 1 && value.length != 0) {
            console.log(otp);
        }
    }

    function Timer() {
        const [seconds, setSeconds] = useState(30); // Set initial time (30 seconds)
        const [isActive, setIsActive] = useState(true); // Track if the timer is running

        useEffect(() => {
            let interval;
            if (isActive && seconds > 0) {
                interval = setInterval(() => {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }, 1000); // Update every 1000ms (1 second)
            } else if (seconds === 0) {
                clearInterval(interval); // Stop the timer once it reaches 0
                setIsActive(false);
            }

            return () => clearInterval(interval); // Clean up interval on component unmount
        }, [isActive]); // Re-run useEffect when `isActive` or `seconds` changes

        return (<h3 className="text-sm">Didn't receive an OTP ? 00:{seconds} </h3>);
    }

    return (
        <div className="flex flex-col items-center gap-6 ">
            <h3 className="text-sm">Enter the OTP sent to your Email</h3>
            <form className="flex flex-row gap-6 justify-center">
                {otp.map((value, index) => <input
                    key={index}
                    ref={inputRefs[index]}
                    type="number"
                    max={'9'}
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