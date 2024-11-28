import React from "react";
import { CallToActionButton } from "./calltoaction-button/CallActionButton";

export  function LandingSection() {
    return (<section className='flex flex-col gap-y-36 lg:flex-row  justify-center h-auto w-full max-h-full py-32 lg:px-20 px-4'>
    <div className='flex flex-col w-full lg:w-1/2 gap-8 text-center lg:text-start'>
      <h1 className='text-5xl sm:text-6xl text-black font-bold'>SchoolBuddy<br />The happier workspace</h1>
      <h2 className='text-2xl sm:text-2xl text-black font-semibold'>Learn, Collabrate, and Excel, with our solution.</h2>
      <div className='flex flex-col lg:flex-row gap-6 mt-6 items-center lg:justify-start'>
        <CallToActionButton title={"Get Started"}/>
        <button className='bg-white text-black border-2 border-black  font-bold px-12 py-4 rounded-3xl hover:bg-gray-100 transition duration-300 hover:scale-105 flex-1 max-w-48'>
          Explore
        </button>
      </div>
    </div>
    <div className='w-full lg:w-1/2'>
      <video autoPlay loop muted playsInline>
        <source src="/hero-illustration.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </section>);
}