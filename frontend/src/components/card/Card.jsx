import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import { ItemVeiw } from "./ItemView";

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
    const [buyView, setBuyView] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

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
        <>
            <div className="w-4/5 md:w-2/3">
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

                <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                        {noteList.map((notes) => (
                            <div key={notes.note._id}>
                                {buyView && <ItemVeiw item={notes.note} onBack={() => setBuyView(false)}/>}
                                <div
                                    onClick={() => setBuyView(!buyView)}
                                    className='bg-white py-4 rounded-xl shadow-lg hover:shadow-xl cursor-pointer lg:px-24 font-semibold mb-2'
                                >
                                    <div className='flex justify-between px-8'>
                                        <h4>{notes.note.title}</h4>
                                        <img 
                                            className='w-6 h-6' 
                                            src={notes.isPurchased ? "/check.svg" : "/lock.svg"} 
                                            alt={notes.isPurchased ? "Purchased" : "Locked"}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}