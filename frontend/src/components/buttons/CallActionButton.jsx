import { Link } from "react-router";

export function CallToActionButton(props) {
    return <Link className='bg-black text-white text-center font-bold px-12 py-4 rounded-3xl hover:bg-gray-900 transition duration-300 hover:scale-105 flex-1 max-w-48' to={props.to}>
          {props.title}
    </Link>;
}