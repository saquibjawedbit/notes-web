import { useState, useEffect } from "react";
import axios from "axios";

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

    useEffect(() => {
        const loadData = async () => {
            try {
                
                const respone = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/subjects/${subject}/${chapter}/${name}`);
                const chapterList = respone.data.data;
                setNoteList(chapterList);
            }
            catch (e) {
                console.log(e);
            }
        }

        if (open) {
            loadData();
        }
    }, [open])

    function ItemVeiw({ item }) {

        return <div className="fixed inset-0 h-screen justify-center items-center flex bg-white bg-opacity-50">
            <img src="/back.svg" alt="Back" className="w-8 h-8 fixed top-16 left-24 cursor-pointer" onClick={() => setBuyView(false)}/>
            <div className="flex flex-row justify-center gap-4 bg-white px-4 py-4 shadow-xl">
                <img className="w-56 h-72 object-contain bg-black" src={item.thumbnail} alt="Thumbnail" />
                <div className="flex flex-col h-72 w-72">
                    <div className="flex flex-col gap-2 text-wrap overflow-hidden">
                        <h1 className="font-bold text-2xl">{item.title} </h1>
                        <h2 className="text-xl font-bold">Rs.{item.price}</h2>
                        <p>{item.description}</p>
                    </div>
                    <button className="bg-black rounded-sm text-white font-bold w-56 py-3 mt-auto text-2xl">BUY</button>
                </div>
            </div>
        </div>;
    }

    return (
        <>
            <div className="w-2/3">
                <div
                    onClick={() => setOpen(!open)}
                    className='flex flex-col bg-white items-center justify-start px-24 py-12 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl'
                >
                    <div className='flex justify-between w-full px-8 items-center'>
                        <div className="flex flex-col">
                            <h3 className='font-bold text-3xl'>Module {index + 1}</h3>
                            <h4 className='font-semibold text-xl'>{name}</h4>
                        </div>
                        <h3 className='text-xl'>{len}</h3>
                    </div>
                </div>

                <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                        {noteList.map((notes) => {
                            return <div key={notes.note._id}>
                                {buyView && <ItemVeiw item={notes.note}/>}
                                <div
                                    onClick={() => setBuyView(!buyView)}
                                    className='bg-white py-4 rounded-xl shadow-lg hover:shadow-xl cursor-pointer px-24 font-semibold mb-2'
                                >
                                    <div className='flex justify-between'>
                                        <h4>{notes.note.title}</h4>
                                        <img className='w-6 h-6' src={notes.isPurchased ? "/check.svg" : "/lock.svg"} />
                                    </div>
                                </div>
                            </div>}


                        )}
                    </div>
                </div>
            </div></>
    );
}