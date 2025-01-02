import './App.css'
import ReactPlayer from 'react-player';
import { CallToActionButton } from '../../components/buttons/CallActionButton';
import { CarousalElement } from '../../components/BoxDetail/CarousalElement';
import { motion } from 'framer-motion';

function App() {

  const data = [
    {
      id: 0,
      image: '/l2.png',
      title: 'Daily live classes',
      desc: 'Chat with educators, ask questions, answer live polls, and get your doubts cleared - all while the class is going on'
    },
    {
      id: 1,
      image: './l1.png' ,
      title: 'Daily live classes',
      desc: 'Chat with educators, ask questions, answer live polls, and get your doubts cleared - all while the class is going on'
    },
    {
      id: 2,
      image: './l3.png',
      title: 'Daily live classes',
      desc: 'Chat with educators, ask questions, answer live polls, and get your doubts cleared - all while the class is going on'
    }
  ];

  return (
    <div className="container mx-auto px-4 bg-gradient-to-b from-white via-blue-50 to-white mt-32">
      <section className='flex flex-col gap-y-36 lg:flex-row justify-center items-stretch h-auto w-full max-h-full py-32 lg:px-20 px-4'>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='flex flex-col w-full lg:w-1/2 gap-8 text-center lg:text-start'
        >
          <h1 className='text-5xl sm:text-6xl text-black font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text'>
            HR Science Quest<br />Learn Space
          </h1>
          <h2 className='text-2xl sm:text-2xl text-gray-700 font-semibold'>
            Learn, Collabrate, and Excel, with our solution.
          </h2>
          <div className='flex flex-col lg:flex-row gap-6 mt-6 items-center lg:justify-start'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <CallToActionButton title={"Get Started"} to={'/notes'} />
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-white text-black border-2 border-black font-bold px-12 py-4 rounded-3xl hover:bg-gray-100 transition duration-300 shadow-lg flex-1 max-w-48'
            >
              Explore
            </motion.button>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='w-full lg:w-1/2 flex justify-center items-center'
        >
          <img src="/hero_4.png" className='w-full max-h-96 object-contain hover:scale-105 transition-transform duration-300' alt="hero" />
        </motion.div>
      </section>

      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='w-full h-full flex gap-8 md:gap-6 justify-center items-center flex-col sm:flex-row px-16 py-20'
      >
        {data.map((value, index) => (
          <motion.div
            key={value.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <CarousalElement img={value.image} title={value.title} description={value.desc} />
          </motion.div>
        ))}
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='w-full h-full flex flex-col text-center lg:text-start lg:flex-row gap-6 justify-center px-8 md:px-24 mt-36 mb-16 bg-white rounded-2xl shadow-xl p-8'
      >
        <div className="flex-1 rounded-xl overflow-hidden shadow-2xl">
          <ReactPlayer url="https://www.youtube.com/watch?v=R4IiubxBU9w&t" width={"100%"} controls />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h2 className='text-3xl text-black font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text'>
            High Quality Contents
          </h2>
          <p className='text-slate-600 mb-auto leading-relaxed'>
            Welcome to your ultimate destination for mastering physics and chemistry! Our channel is dedicated to providing high-quality, easy-to-understand tuition for students of all levels. Dive into the fascinating worlds of physics and chemistry as we break down complex concepts into simple, engaging explanations. Whether you are preparing for exams, tackling tricky problems, or simply nurturing your curiosity, our concise yet comprehensive videos are designed to help you excel. Join us on this educational journey to explore the mysteries of the universe, from atomic structures to the laws of motion, with clear visuals and expert guidance!
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex w-48 place-self-center lg:place-self-start"
          >
            <CallToActionButton title={"Learn"} />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default App;
