import React from "react";
import { CarousalElement } from './CarousalElement';

export function CarousalSection() {
    
  const data = [
    {
      id: 0,
      image: './l1.svg',
      title: 'Daily live classes',
      desc: 'Chat with educators, ask questions, answer live polls, and get your doubts cleared - all while the class is going on'
    },
    {
      id: 1,
      image: './l2.svg',
      title: 'Daily live classes',
      desc: 'Chat with educators, ask questions, answer live polls, and get your doubts cleared - all while the class is going on'
    },
    {
      id: 2,
      image: './l3.svg',
      title: 'Daily live classes',
      desc: 'Chat with educators, ask questions, answer live polls, and get your doubts cleared - all while the class is going on'
    }
  ];

    return (
    <section className='w-full h-full flex gap-8 md:gap-6 justify-center items-center flex-col sm:flex-row px-16'>
        {data.map((value) => <CarousalElement key={value.id} img={value.image} title={value.title} description={value.desc} />)}
    </section>
    );
}