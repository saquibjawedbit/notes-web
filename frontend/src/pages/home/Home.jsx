import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState("JEE");
    const navigate = useNavigate();
    
    let user;


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your API endpoint
                const response = await axios.get('/api/v1/users/me');

                user = response.response;

                console.log("User:", user);
                
            } catch {
                navigate('/login');
            }
        };
    
        fetchData();
    }, []);


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

    const subjects = {
        XII: [
            {
                name: "Chemistry",
                chapter: 12,
                icon: "./chemistry.svg",
            },
            {
                name: "Physics",
                chapter: 10,
                icon: "./physics.svg",
            },
            {
                name: "Math",
                chapter: 8,
                icon: './math.svg',
            },
        ],

        JEE:
            [
                {
                    name: "Chemistry",
                    chapter: 12,
                    icon: "./chemistry.svg",
                },
                {
                    name: "Physics",
                    chapter: 10,
                    icon: "./physics.svg",
                },
                {
                    name: "Math",
                    chapter: 8,
                    icon: './math.svg',
                },
            ],
        NEET:
            [
                {
                    name: "Chemistry",
                    chapter: 12,
                    icon: "./chemistry.svg",
                },
                {
                    name: "Physics",
                    chapter: 10,
                    icon: "./physics.svg",
                },
                {
                    name: "Math",
                    chapter: 8,
                    icon: './math.svg',
                },
                {
                    name: "Biology",
                    chapter: 8,
                    icon: './biology.svg',
                },
            ],
        X:
            [
                {
                    name: "Chemistry",
                    chapter: 12,
                    icon: "./chemistry.svg",
                },
                {
                    name: "Physics",
                    chapter: 10,
                    icon: "./physics.svg",
                },
                {
                    name: "Math",
                    chapter: 8,
                    icon: './math.svg',
                },
            ],
        XI:
            [
                {
                    name: "Chemistry",
                    chapter: 12,
                    icon: "./chemistry.svg",
                },
                {
                    name: "Physics",
                    chapter: 10,
                    icon: "./physics.svg",
                },
                {
                    name: "Math",
                    chapter: 8,
                    icon: './math.svg',
                },
            ],
        IX:
            [
                {
                    name: "Chemistry",
                    chapter: 12,
                    icon: "./chemistry.svg",
                },
                {
                    name: "Physics",
                    chapter: 10,
                    icon: "./physics.svg",
                },
                {
                    name: "Math",
                    chapter: 8,
                    icon: './math.svg',
                },
            ],

    };

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
                {isOpen && (
                    <div className="absolute right-0  mt-2 w-48 bg-white shadow-md rounded">
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
        </div>;
    }

    function Subject({ title, chapter, icon }) {
        return (<div className="flex flex-col items-center pt-4 gap-4 shadow-lg w-48 h-80 hover:shadow-2xl transition duration-300 rounded-lg">
            <img src={icon} className="w-40 h-40" alt="" />
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-lg text-slate-600">{chapter} Chapters</p>
        </div>);
    }

    return <div className='bg-slate-100 pb-12'
    >   <div className="flex justify-between px-8 md:px-16 py-4">
            <div className="flex flex-col gap-4">
                <h1 className="font-bold text-2xl text-black">Study Materials</h1>
                <h3 className="text-lg text-slate-900">Select Your Subject and Start Learning</h3>
            </div>
            <DropDownButton />
        </div>
        <div className="mt-12 flex items-start justify-center min-w-screen">
            <div className="flex bg-white h-fit w-3/4 py-8 px-8 justify-around flex-wrap gap-4">
                {category == "JEE" && subjects.JEE.map((element) => <Subject key={element.chapter} title={element.name} chapter={element.chapter} icon={element.icon} />)}
                {category == "NEET" && subjects.NEET.map((element) => <Subject key={element.chapter} title={element.name} chapter={element.chapter} icon={element.icon} />)}
                {category == "X" && subjects.X.map((element) => <Subject key={element.chapter} title={element.name} chapter={element.chapter} icon={element.icon} />)}
                {category == "XI" && subjects.XI.map((element) => <Subject key={element.chapter} title={element.name} chapter={element.chapter} icon={element.icon} />)}
                {category == "XII" && subjects.XII.map((element) => <Subject key={element.chapter} title={element.name} chapter={element.chapter} icon={element.icon} />)}
                {category == "IX" && subjects.IX.map((element) => <Subject key={element.chapter} title={element.name} chapter={element.chapter} icon={element.icon} />)}
            </div>
        </div>
    </div>
}

