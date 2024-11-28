import './App.css'
import { NavBar } from './components/navbar/NavBar';
import {LandingSection} from './components/home/LandingSection'
import { CarousalSection } from './components/BoxDetail/CarousalSection';
import { ShopingWidget } from './components/BoxDetail/ShopingWidget/ShopingWidget';
import ReactPlayer from 'react-player';
import { CallToActionButton } from './components/home/calltoaction-button/CallActionButton';
import { Footer } from './components/footer/Footer';



function App() {

  return <div>
    <LandingSection/>
    <CarousalSection/>
    <section className='w-full h-full flex flex-col text-center lg:text-start lg:flex-row gap-6 justify-center px-8 md:px-24 mt-36'>
        <div className="flex-1">
          <ReactPlayer url="https://www.youtube.com/watch?v=R4IiubxBU9w&t" width={"100%"} controls />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h2 className='text-3xl text-black font-bold'>
            High Quality Contents
          </h2>
          <p className='text-slate-600 mb-auto'>"Welcome to your ultimate destination for mastering physics and chemistry! Our channel is dedicated to providing high-quality, easy-to-understand tuition for students of all levels. Dive into the fascinating worlds of physics and chemistry as we break down complex concepts into simple, engaging explanations. Whether you're preparing for exams, tackling tricky problems, or simply nurturing your curiosity, our concise yet comprehensive videos are designed to help you excel. Join us on this educational journey to explore the mysteries of the universe, from atomic structures to the laws of motion, with clear visuals and expert guidance!"</p>
          <div className="flex w-48 place-self-center lg:place-self-start">
            <CallToActionButton title={"Learn"}/>
          </div>
        </div>
    </section>
    <section className='w-full h-full container'>
      <div className="flex container mx-auto justify-center flex-wrap gap-16 my-36">
        <ShopingWidget/>
        <ShopingWidget/>
        <ShopingWidget/>
        <ShopingWidget/>

      </div>
    </section>
  </div>
}

export default App
