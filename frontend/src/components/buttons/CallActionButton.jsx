import { Link } from "react-router";

export function CallToActionButton(props) {
    return <Link 
        className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center font-bold px-12 py-4 rounded-3xl hover:from-blue-700 hover:to-indigo-800 transition duration-300 hover:scale-105 flex-1 max-w-48 shadow-lg shadow-blue-500/20' 
        to={props.to}
    >
        {props.title}
    </Link>;
}