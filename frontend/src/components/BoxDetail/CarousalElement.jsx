import React from "react";

export function CarousalElement(props) {
    return (
        <div className="flex flex-col max-w-96 gap-2 md:gap-6 items-center sm:items-start">
            <h3 className="text-2xl text-black font-bold sm:order-2">{props.title}</h3>
            <p className="text-slate-600 sm:order-3">{props.description}</p>
            <img src={props.img} alt={props.title} className='sm:order-1 w-96 h-60 object-contain'/>
        </div>
    );
}   