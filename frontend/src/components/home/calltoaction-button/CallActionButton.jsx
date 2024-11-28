import React from "react";

export function CallToActionButton(props) {
    return <button className='bg-black text-white font-bold px-12 py-4 rounded-3xl hover:bg-gray-900 transition duration-300 hover:scale-105 flex-1 max-w-48'>
          {props.title}
    </button>;
}