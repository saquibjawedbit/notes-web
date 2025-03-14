import { Link } from 'react-router-dom';

export function CallToActionButton({ title, to = "#", onClick }) {
    const buttonClasses = "text-black bg-gradient-to-r from-yellow-500 to-amber-300 font-bold px-12 py-4 rounded-3xl hover:from-yellow-600 hover:to-amber-400 transition duration-300 shadow-lg";
    
    return onClick ? (
        <button onClick={onClick} className={buttonClasses}>
            {title}
        </button>
    ) : (
        <Link to={to} className={buttonClasses}>
            {title}
        </Link>
    );
}