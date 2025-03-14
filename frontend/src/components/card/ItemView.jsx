import React from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function ItemVeiw() {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state;

    const payNow = async () => {
        try {
      
          // Create order via backend
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/payment/create-order`, {
            noteId: item._id,
          });

          const orderData = response.data.data;
          
          const options = {
            key: orderData.key_id, // Replace with your Razorpay key_id
            amount: orderData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: orderData.currency,
            name: orderData.name,
            description: orderData.description,
            handler: async (response) => {
              try {
                  response.noteId = item._id;
                  response.amount = orderData.amount;
                  await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/payment/verify-payment`, response);
                  window.location.reload();        
              }
              catch(error) {
                console.log(error);
                  alert('Error during payment verification:', error);
              }
            },
            order_id: orderData.id, // This is the order_id created in the backend
            prefill: {
              email: user.email,
            },
            theme: {
              color: '#F59E0B'  // Changed to amber color
            },
          };
          const rzp = new Razorpay(options);
          rzp.open();
        } catch (error) {
          console.error('Error during payment:', error);
        }
      };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 min-h-screen flex items-center justify-center z-50"
            style={{
                background: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9))',
                backdropFilter: 'blur(8px)'
            }}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative max-w-5xl w-[95%] mx-4 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-amber-700/20"
            >
                {/* Header with back button */}
                <motion.div 
                    className="absolute top-4 left-4 z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-black p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors border border-amber-700/20"
                    >
                        <img src="/back.svg" alt="Back" className="w-6 h-6 invert" />
                    </button>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Left side - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg border border-amber-700/20">
                            <motion.img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Right side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col justify-between"
                    >
                        <div className="space-y-6">
                            <motion.h1 
                                className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {item.title}
                            </motion.h1>

                            <div className="space-y-2">
                                <motion.div 
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="text-3xl font-bold text-amber-500">₹{item.price}</span>
                                    <span className="text-sm text-amber-100/70 bg-amber-900/30 px-2 py-1 rounded-full">
                                        One-time payment
                                    </span>
                                </motion.div>

                                <motion.p 
                                    className="text-gray-300 leading-relaxed text-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {item.description}
                                </motion.p>
                            </div>

                            {/* Features or Benefits */}
                            <motion.div 
                                className="space-y-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h3 className="font-semibold text-lg text-amber-200">What you'll get:</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Lifetime access to content
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        High-quality study materials
                                    </li>
                                    
                                </ul>
                            </motion.div>
                        </div>

                        <motion.button
                            className="mt-8 w-full py-4 rounded-xl text-black text-xl font-bold
                                     bg-gradient-to-r from-amber-400 to-yellow-600 
                                     hover:from-amber-500 hover:to-yellow-700
                                     shadow-lg hover:shadow-xl
                                     transition-all duration-300"
                            onClick={(e) => {e.preventDefault(); payNow();}}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Purchase Now
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export { ItemVeiw };