import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from  'axios';
import { useAuth } from "../../context/useAuth.jsx";

export function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState("JEE");
    const [subjects, setSubjects] = useState([]);
    const {user, loading} = useAuth();

    // console.log("value changes");

    useEffect(() => {
        if(user != null) setCategory(user.class);
    }, [user]);


    useEffect(() => {
       const loadData = async () => {
            try {
                const respone = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/subjects/${category}`);
                const subjects = respone.data.data;
                setSubjects(subjects);
            }
            catch(e) {
                console.log(e);
            }
       };
       loadData();
    }, [category]);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const onDropDownClick = (index) => {
        if (index === 0) setCategory("JEE");
        else if (index === 1) setCategory("NEET");
        else if (index === 2) setCategory("XII");
        else if (index === 3) setCategory("XI");
        else if (index === 4) setCategory("X");
        else setCategory("IX");

        toggleDropdown();
    }

    function DropDownButton() {
        return <div className="flex">
            <div className="relative inline-block">
                {/* Button to open/close the dropdown */}
                <button
                    onClick={toggleDropdown}
                    className="flex justify-between bg-black text-white font-semibold px-4 py-2 rounded w-24"
                >
                    {category}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                    // strokeWidth="2" // Thicker stroke for a bolder appearance
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.585l3.71-4.355a.75.75 0 111.14.976l-4 4.7a.75.75 0 01-1.14 0l-4-4.7a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {/* Dropdown content */}
                {(isOpen && !loading && (user.class)) && (
                    <div className="absolute right-0  mt-2 w-48 bg-white shadow-md rounded">
                        <button
                            onClick={() => (onDropDownClick(0))}
                            className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            JEE
                        </button>
                        <button
                            onClick={() =>(onDropDownClick(1))}
                            className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            NEET
                        </button>
                        <button
                            onClick={() => (onDropDownClick(2))}
                            className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            XII
                        </button>
                        <button
                            onClick={() => (onDropDownClick(3))}
                            className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            XI
                        </button>
                        <button
                            onClick={() =>( onDropDownClick(4))}
                            className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            X
                        </button>
                        <button
                            onClick={() => (onDropDownClick(5))}
                            className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            IX
                        </button>
                    </div>
                )}
            </div>
        </div>;
    }

    function Subject({ title, chapter, icon }) {
        return (<Link to = {`${category}/${title}`} className="flex flex-col items-center pt-4 gap-4 shadow-lg w-56 h-80 hover:shadow-2xl transition duration-300 rounded-lg">
            <img src={icon} className="w-40 h-40" alt="" />
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-lg text-slate-600">{chapter} Chapters</p>
        </Link>);
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
        return <div className="fixed flex justify-center items-center inset-0 h-screen bg-black bg-opacity-90">
            <div className="flex flex-col justify-center items-center bg-white px-4 md:px-24 py-8 rounded-xl gap-4">
                <h2 className="text-xl md:text-2xl font-bold">Please select your Class</h2>
                <div className="flex">
                    <div className="relative inline-block">
                        {/* Button to open/close the dropdown */}
                        <button
                            onClick={toggleDropdown}
                            className="flex justify-between bg-black text-white font-semibold px-4 py-2 rounded w-24"
                        >
                            {category}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                            // strokeWidth="2" // Thicker stroke for a bolder appearance
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.585l3.71-4.355a.75.75 0 111.14.976l-4 4.7a.75.75 0 01-1.14 0l-4-4.7a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {/* Dropdown content */}
                        {isOpen && (
                            <div className="absolute mt-2 w-48 bg-white shadow-md rounded">
                                <button
                                    onClick={() => onDropDownClick(0)}
                                    className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    JEE
                                </button>
                                <button
                                    onClick={() => onDropDownClick(1)}
                                    className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    NEET
                                </button>
                                <button
                                    onClick={() => onDropDownClick(2)}
                                    className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    XII
                                </button>
                                <button
                                    onClick={() => onDropDownClick(3)}
                                    className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    XI
                                </button>
                                <button
                                    onClick={() => onDropDownClick(4)}
                                    className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    X
                                </button>
                                <button
                                    onClick={() => onDropDownClick(5)}
                                    className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    IX
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <button className="bg-black w-full h-12 text-white rounded-lg font-bold" onClick={updateClass}> Submit</button>
            </div>
        </div>
    }

    return <div className='bg-slate-100 pb-12 h-full w-full'>
        <div className="flex justify-between px-8 md:px-16 py-4">
            <div className="flex flex-col gap-4">
                <h1 className="font-bold text-2xl text-black">Study Materials</h1>
                <h3 className="text-lg text-slate-900">Select Your Subject and Start Learning</h3>
            </div>
            <DropDownButton />
        </div>
        {!category && <AskSubject />}
        <div className="mt-12 flex items-start justify-center min-w-screen">
            <div className="flex bg-white h-fit max-w-screen-lg md:min-w-[720px] min-h-[500px] py-12 px-32 justify-between items-center flex-wrap gap-4 rounded-3xl">
                {subjects.length != 0 && subjects.map((element) => <Subject key={element._id} title={element.name} chapter={element.chaptersCount} icon={element.thumbnail} />)}
            </div>
        </div>
    </div>
}

