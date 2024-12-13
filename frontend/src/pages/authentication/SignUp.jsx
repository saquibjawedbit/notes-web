import React, {useState} from "react";
import { OTPView } from "./OTPView";

export function SignUp() {

    const [OtpScreen, setOtpScreen] = useState(false);

    const onSubmit = () => {
        
    }

    return (
    <>
        <h2 className="text-2xl md:text-3xl font-bold">Create Account</h2>
        {
            (!OtpScreen) ? 
        <div>
            <form className="flex flex-col items-center gap-1">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        
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
                        minLength={6}
                       
                        required
                        className="w-56 sm:w-80 p-2 border border-gray-300 rounded-lg text-sm md:text-lg placeholder:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="confirm_password"
                        id="password"
                        placeholder="Confirm Password"
                        minLength={6}
                        required
                        className="w-56 sm:w-80 p-2 border border-gray-300 rounded-lg text-sm md:text-lg placeholder:text-sm"
                    />
                </div>
            
                <button type="submit" className="text-xl text-white bg-black rounded-lg w-full py-2 mt-4"> Create Account </button>
            </form>
            <div className="text-xs md:text-sm mt-2">
                <p>Already have an account.<span className="text-blue-600 cursor-pointer">  Login ?</span></p>
            </div>
        </div> : <OTPView/>
        }
    </>
    );
}