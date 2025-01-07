import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../../context/useAuth.jsx";
import ReactLoading from 'react-loading';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const subjectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function Home() {
    const [category, setCategory] = useState("");
    const [subjects, setSubjects] = useState([]);
    const {user, loading, setUser} = useAuth();
    const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);

    useEffect(() => {
        if(user != null) setCategory(user.class);
    }, [user]);

    useEffect(() => {
        if(category === "") return;
       const loadData = async () => {
            setIsLoadingSubjects(true);
            try {
                const respone = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/subjects/${category}`);
                const subjects = respone.data.data;
                setSubjects(subjects);
            }
            catch(e) {
                console.log(e);
            }
            finally {
                setIsLoadingSubjects(false);
            }
       };
       loadData();
       updateClass();
    }, [category]);

    const onDropDownClick = (index) => {
        if (index === 0) setCategory("JEE");
        else if (index === 1) setCategory("NEET");
        else if (index === 2) setCategory("XII");
        else if (index === 3) setCategory("XI");
        else if (index === 4) setCategory("X");
        else setCategory("IX");
    }

    function DropDownButton() {
        const [isOpen, setIsOpen] = useState(false);

        const toggleDropdown = () => {
            setIsOpen(!isOpen);
        }

        return (
            <motion.div 
                className="flex"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleDropdown}
                        className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 
                                 text-white font-semibold px-6 py-2 rounded-full w-32 shadow-lg"
                    >
                        <span>{category}</span>
                        <motion.svg
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.585l3.71-4.355a.75.75 0 111.14.976l-4 4.7a.75.75 0 01-1.14 0l-4-4.7a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </motion.svg>
                    </motion.button>

                    <AnimatePresence>
                        {(isOpen && !loading && (user?.class)) && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100"
                                style={{ zIndex: 1000 }}
                            >
                                {["JEE", "NEET", "XII", "XI", "X", "IX"].map((item, index) => (
                                    <motion.button
                                        key={item}
                                        whileHover={{ backgroundColor: "#f3f4f6" }}
                                        onClick={() => onDropDownClick(index)}
                                        className="flex w-full px-4 py-3 text-gray-700 hover:bg-gray-50 
                                                 first:rounded-t-xl last:rounded-b-xl border-b last:border-none
                                                 transition-colors duration-200"
                                    >
                                        {item}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        );
    }

    function Subject({ title, chapter, icon }) {
        return (
            <motion.div
                variants={subjectVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
            >
                <Link 
                    to={`${category}/${title}`} 
                    className="block h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                             transition-all duration-300 transform"
                >
                    <div className="p-6 flex flex-col items-center gap-4">
                        <motion.div
                            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                            transition={{ duration: 0.5 }}
                            className="relative w-40 h-40"
                        >
                            <motion.img 
                                src={icon} 
                                alt={title}
                                className="w-full h-full object-contain"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
                            <p className="text-gray-600">{chapter} Chapters</p>
                        </div>
                    </div>
                </Link>
            </motion.div>
        );
    }

    const updateClass = async () => {
        try {
            await axios
              .patch(`${import.meta.env.VITE_API_URL}/api/v1/users/update-account`,{
                "class" : category,
              });
            setUser((prev) => ({...prev, class: category}));
        }
        catch(e) {
            console.log(e);
        }
    }   

    function AskSubject() {
        const [isModalMounted, setIsModalMounted] = useState(false);
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        
        useEffect(() => {
            const timer = setTimeout(() => setIsModalMounted(true), 300);
            return () => clearTimeout(timer);
        }, []);

        const handleDropdownSelect = (index) => {
            const grades = ["JEE", "NEET", "XII", "XI", "X", "IX"];
            setCategory(grades[index]);
            setIsDropdownOpen(false);
        };

        function DropdownSelect() {
            return (
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex justify-between items-center w-full bg-gradient-to-r from-blue-600 to-purple-600 
                                 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg 
                                 transition-all duration-300"
                    >
                        <span className="text-lg">{category === "" ? "Select your Grade" : category}</span>
                        <motion.svg
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.585l3.71-4.355a.75.75 0 111.14.976l-4 4.7a.75.75 0 01-1.14 0l-4-4.7a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </motion.svg>
                    </motion.button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                            >
                                {["JEE", "NEET", "XII", "XI", "X", "IX"].map((item, index) => (
                                    <motion.button
                                        key={item}
                                        whileHover={{ backgroundColor: "#f3f4f6" }}
                                        onClick={() => handleDropdownSelect(index)}
                                        className="flex w-full px-6 py-3 text-gray-700 hover:bg-gray-50 
                                                 border-b last:border-none transition-colors duration-200"
                                    >
                                        {item}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            );
        }

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed flex justify-center items-center inset-0 h-screen bg-black/60 backdrop-blur-sm z-50"
            >
                <motion.div
                    initial={!isModalMounted ? { scale: 0.5, opacity: 0 } : false}
                    animate={!isModalMounted ? { scale: 1, opacity: 1 } : false}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                            Welcome to HR Science Quest
                        </h2>
                        <p className="text-gray-600">Please select your class to continue</p>
                    </div>

                    <div className="space-y-6">
                        <DropdownSelect />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={updateClass}
                            disabled={category === ""}
                            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                                     font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg 
                                     transition-all duration-300 text-lg
                                     ${category === "" ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Continue
                        </motion.button>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        You can change this later in your profile settings
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white pt-24 pb-12"
        >
            {/* Header Section */}
            <motion.div 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <motion.div 
                        className="space-y-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1 
                            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                            variants={subjectVariants}
                        >
                            Study Materials
                        </motion.h1>
                        <motion.p 
                            className="text-gray-600 text-lg"
                            variants={subjectVariants}
                        >
                            Select Your Subject and Start Learning
                        </motion.p>
                    </motion.div>
                    <DropDownButton />
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div 
                    className="bg-white rounded-2xl shadow-lg p-8 relative min-h-[500px]"
                    variants={subjectVariants}
                >
                    {isLoadingSubjects ? (
                        <motion.div 
                            className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="flex flex-col items-center gap-4">
                                <ReactLoading type="bubbles" color="#4F46E5" height={64} width={64} />
                                <p className="text-gray-600 text-lg font-medium">Loading subjects...</p>
                            </div>
                        </motion.div>
                    ) : subjects.length === 0 ? (
                        <motion.div 
                            className="flex flex-col items-center justify-center h-[400px] text-center"
                            variants={subjectVariants}
                        >
                            <img src="/empty-state.png" alt="No subjects" className="w-48 h-48 mb-4 opacity-50" />
                            <h3 className="text-xl font-semibold text-gray-700">No subjects found</h3>
                            <p className="text-gray-500">Please try selecting a different category</p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                        >
                            {subjects.map((element) => (
                                <Subject 
                                    key={element._id} 
                                    title={element.name} 
                                    chapter={element.chaptersCount} 
                                    icon={element.thumbnail} 
                                />
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>

            {/* Class Selection Modal */}
            <AnimatePresence>
                {user && !user.class && <AskSubject />}
            </AnimatePresence>
        </motion.div>
    );
}

