import React from "react"
import { useAuth } from "../../context/useAuth.jsx";
import { useNavigate } from "react-router";

function NotesBar({onClick, notes}) {

    const {user} = useAuth();

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
        <div onClick={openPdf}
            className={
                'bg-white py-4 rounded-xl shadow-lg ' +
                'hover:shadow-xl cursor-pointer lg:px-24 ' +
                'font-semibold mb-2'
            }>
            <div className='flex justify-between px-8'>
                <h4>{notes.title}</h4>
                <img
                    className='w-6 h-6'
                    src={isPurchased ? "/check.svg" : "/lock.svg"}
                    alt={isPurchased ? "Purchased" : "Locked"}
                />
            </div>
        </div>
    );
}

export {NotesBar};