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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'
            >
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setOpen(!open)}
                    className='flex flex-col bg-white items-center justify-start lg:px-24 py-12 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl relative'
                >
                    <div className='flex justify-between w-full px-8 items-center'>
                        <div className="flex flex-col">
                            <h3 className='font-bold text-2xl sm:text-3xl'>Module {index + 1}</h3>
                            <h4 className='font-semibold text-lg sm:text-xl'>{name}</h4>
                        </div>
                        <h3 className='text-xl'>{len}</h3>
                    </div>

                    {/* Loading indicator */}
                    {isLoading && isHovered && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <ReactLoading type="spin" color="#000000" height={20} width={20} />
                        </div>
                    )}
                </div>
            </motion.div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 bg-gray-50 rounded-xl overflow-hidden"
                    >
                        <div className="overflow-hidden">
                            {noteList.map((notes) => (
                                <div key={notes._id}>
                                    <NotesBar 
                                        notes={notes} 
                                        onClick={() => navigate(`/item/${notes._id}`, { state: notes })}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}