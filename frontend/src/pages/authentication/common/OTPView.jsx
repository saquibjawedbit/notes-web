import React, { useState, useRef, useEffect } from 'react';
import ReactLoading from 'react-loading';

export function OTPView({ userId, onSubmit }) {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef([]);

    // Focus on first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, event) => {
        const value = event.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(0, 1);
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, event) => {
        // Move to previous input on backspace if current input is empty
        if (event.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const otpValue = otp.join('');
        try {
            await onSubmit(otpValue);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="text-center">
            <h3 className="text-xl font-semibold text-amber-300 mb-6">Enter Verification Code</h3>
            <p className="text-gray-400 mb-6">We've sent a code to your email</p>

            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="flex justify-center space-x-3 mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-14 text-center text-xl font-semibold bg-gray-800 border border-amber-500/30 rounded-lg text-amber-300 focus:outline-none focus:border-amber-400 focus:ring focus:ring-amber-500/20"
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={isLoading || otp.some(digit => !digit)}
                    className={`flex justify-center py-2 px-6 border border-transparent text-sm font-medium rounded-md text-black bg-gradient-to-r from-yellow-500 to-amber-300 hover:from-yellow-600 hover:to-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 ${isLoading || otp.some(digit => !digit) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? (
                        <ReactLoading type="spin" color="#000000" height={20} width={20} />
                    ) : (
                        'Verify'
                    )}
                </button>
            </form>

            <p className="mt-6 text-gray-400">
                Didn't receive a code? <button className="text-amber-500 hover:text-amber-400">Resend</button>
            </p>
        </div>
    );
}