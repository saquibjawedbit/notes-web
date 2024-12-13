import './App.css'
import { ShopingWidget } from '../../components/BoxDetail/ShopingWidget/ShopingWidget';
import ReactPlayer from 'react-player';
import { CallToActionButton } from '../../components/buttons/CallActionButton';
import {CarousalElement} from '../../components/BoxDetail/CarousalElement'



function App() {

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


  return <div>
    <section className='flex flex-col gap-y-36 lg:flex-row  justify-center h-auto w-full max-h-full py-32 lg:px-20 px-4'>
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
  </section>
  <section className='w-full h-full flex gap-8 md:gap-6 justify-center items-center flex-col sm:flex-row px-16'>
        {data.map((value) => <CarousalElement key={value.id} img={value.image} title={value.title} description={value.desc} />)}
    </section>
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
