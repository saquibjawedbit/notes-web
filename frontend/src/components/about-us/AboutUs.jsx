import React, { useState } from "react";


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


    return <>
        <div className="w-full min-h-screen flex  flex-col py-8 lg:flex-row items-center text-black px-16 justify-between gap-8">
            <div className="flex flex-col flex-1 gap-8">
                <h2 className="text-4xl font-bold">
                    About Us
                </h2>
                <p className='text-lg'>
                    Welcome to your ultimate destination for mastering physics and chemistry! Our channel is dedicated
                    to providing high-quality, easy-to-understand tuition for students of all levels.
                    Dive into the fascinating worlds of physics and chemistry as we break down complex concepts into simple,
                    engaging explanations. Whether you're preparing for exams, tackling tricky problems,
                    or simply nurturing your curiosity, our concise yet comprehensive videos are designed to help you excel.
                    Join us on this educational journey to explore the mysteries of the universe,
                    from atomic structures to the laws of motion, with clear visuals and expert guidance!
                </p>
            </div>
            <div className="flex-1">
                <img className="rounded-2xl" src="https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image" />
            </div>

        </div>
    </>
}