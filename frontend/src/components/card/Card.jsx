import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import { NotesBar } from "./NotesBar.jsx";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from 'framer-motion';

/**
   * Card component that displays a module card and its notes.
   *
   * @param {Object} props - The component props.
   * @param {number} props.index - The index of the module.
   * @param {string} props.name - The name of the module.
   * @param {number} props.len - The length or number of notes in the module.
   *
   * @returns {JSX.Element} The rendered Card component.
   */
export function Card({ index, name, len, subject, chapter }) {
    const [open, setOpen] = useState(false);
    const [noteList, setNoteList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const loadData = useCallback(async () => {
        if (!noteList.length && !isLoading) {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/subjects/${subject}/${chapter}/${name}`
                );
                setNoteList(response.data.data);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }, [subject, chapter, name, noteList.length]);

    // Load data on hover
    const handleMouseEnter = () => {
        setIsHovered(true);
        loadData();
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl mx-auto"
        >
            <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
                          border border-gray-100'
            >
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setOpen(!open)}
                    className='flex flex-col bg-gradient-to-r from-white to-blue-50/30 items-center 
                             justify-start lg:px-24 py-12 rounded-xl cursor-pointer relative'
                >
                    <div className='flex justify-between w-full px-8 items-center'>
                        <div className="flex flex-col gap-2">
                            <motion.h3 
                                className='font-bold text-2xl sm:text-3xl bg-gradient-to-r 
                                          from-blue-600 to-purple-600 bg-clip-text text-transparent'
                            >
                                Module {index + 1}
                            </motion.h3>
                            <motion.h4 className='font-semibold text-lg sm:text-xl text-gray-700'>
                                {name}
                            </motion.h4>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className='text-xl font-bold text-gray-900'>{len}</span>
                            <span className='text-sm text-gray-500'>Notes</span>
                        </div>
                    </div>

                    {/* Loading indicator */}
                    <AnimatePresence>
                        {isLoading && isHovered && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                                <ReactLoading type="bubbles" color="#4F46E5" height={24} width={24} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Expand indicator */}
                    <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        className="absolute bottom-4 right-4"
                    >
                        <svg 
                            className="w-5 h-5 text-gray-400" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 bg-gradient-to-r from-blue-50/50 to-purple-50/50 
                                 rounded-xl overflow-hidden shadow-inner"
                    >
                        <motion.div 
                            className="p-4 space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {noteList.map((notes) => (
                                <motion.div 
                                    key={notes._id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                >
                                    <NotesBar 
                                        notes={notes} 
                                        onClick={() => navigate(`/item/${notes._id}`, { state: notes })}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}