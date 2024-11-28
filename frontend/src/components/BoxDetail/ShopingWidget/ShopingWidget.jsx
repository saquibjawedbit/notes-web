import React from "react";

export function ShopingWidget() {
    return (<div className='flex flex-col w-72 h-[512px] px-6 py-8 rounded-xl bg-gray-100 gap-2 justify-center hover:cursor-pointer hover:shadow-2xl transition-shadow duration-300'>
          <img src='./items.png' className='max-h-72'/>
          <div className="flex flex-col text-black gap-2">
            <div className="flex items-center justify-between">
              <h2 className='text-4xl font-bold'>₹ 75</h2>
              <div className="flex h-6 justify-center items-center px-4 rounded-lg bg-red-600 text-white font-bold">
                <h4>40% OFF</h4>
              </div>
            </div>
            <h3 className='text-2xl font-semibold'>Physics: JEE Main Complete Note</h3>
             <p className="truncate text-slate-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p> 
          </div>
        </div>);
}