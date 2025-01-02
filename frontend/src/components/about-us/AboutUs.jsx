import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export function AboutUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        alert('Form submitted successfully!');
    };

    return (
        <div className="w-full min-h-screen flex flex-col pt-32 text-black">
            {/* Hero Section */}
            <div className="px-16 flex flex-col lg:flex-row items-center justify-between mb-16">
                <div className="flex flex-col flex-1 gap-8">
                    <h2 className="text-4xl font-bold bg-gradient-to-r 
                                          from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        About Us
                    </h2>
                    <p className='text-lg leading-relaxed'>
                        Welcome to your ultimate destination for mastering physics and chemistry! Our channel is dedicated
                        to providing high-quality, easy-to-understand tuition for students of all levels.
                        Dive into the fascinating worlds of physics and chemistry as we break down complex concepts into simple,
                        engaging explanations. Whether you're preparing for exams, tackling tricky problems,
                        or simply nurturing your curiosity, our concise yet comprehensive videos are designed to help you excel.
                        Join us on this educational journey to explore the mysteries of the universe,
                        from atomic structures to the laws of motion, with clear visuals and expert guidance!
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-2xl hover:text-blue-600"><FaFacebook /></a>
                        <a href="#" className="text-2xl hover:text-blue-400"><FaTwitter /></a>
                        <a href="#" className="text-2xl hover:text-pink-600"><FaInstagram /></a>
                        <a href="#" className="text-2xl hover:text-red-600"><FaYoutube /></a>
                    </div>
                </div>
                <div className="flex-1">
                    <img className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300" 
                         src="https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                         alt="About Us" />
                </div>
            </div>


        </div>
    );
}