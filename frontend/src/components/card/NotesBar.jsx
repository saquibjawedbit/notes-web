import React from "react"
import { useAuth } from "../../context/useAuth.jsx";
import { useNavigate } from "react-router";
import { motion } from 'framer-motion';

export function NotesBar({ notes, onClick }) {
    const { user } = useAuth();
    const purchasedPdfSet = new Set(user.purchasedPdf);
    const isPurchased = purchasedPdfSet.has(notes._id);
    const navigate = useNavigate();

    const openPdf = () => {
        if(isPurchased && notes) {
            navigate(`/pdf/${notes._id}`);
        }
        else {
            onClick();
        }
    }

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="bg-gray-900 p-4 rounded-lg shadow-md border border-amber-700/20 hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer"
            onClick={openPdf}
        >
            <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                    <img src={notes.thumbnail} alt="" className="w-16 h-16 rounded-lg object-cover" />
                    <motion.div 
                        className={`absolute -top-2 -right-2 p-1.5 rounded-full ${
                            isPurchased ? 'bg-amber-500' : 'bg-gray-600'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isPurchased ? (
                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        )}
                    </motion.div>
                </div>
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-amber-400">{notes.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{notes.description}</p>
                </div>
                <div className="flex-shrink-0">
                    {!isPurchased && (
                        <span className="text-amber-500 font-semibold">₹{notes.price}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}