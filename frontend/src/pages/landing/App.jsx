import './App.css'
import {Link, useNavigate} from 'react-router-dom';
import ReactPlayer from 'react-player';
import { CallToActionButton } from '../../components/buttons/CallActionButton';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaChalkboardTeacher, FaMobileAlt, FaStar, FaQuoteLeft } from 'react-icons/fa';
import React from 'react';

function App() {

  const navigate = useNavigate();

  const features = [
    {
      icon: <FaGraduationCap className="text-4xl" />,
      title: "Expert Teachers",
      description: "Learn from experienced educators who make complex topics easy to understand"
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Interactive Learning",
      description: "Engage with peers and teachers in an interactive learning environment"
    },
    {
      icon: <FaChalkboardTeacher className="text-4xl" />,
      title: "Personalized Attention",
      description: "Get individual attention and doubt resolution from our expert mentors"
    },
    {
      icon: <FaMobileAlt className="text-4xl" />,
      title: "Learn Anywhere",
      description: "Access your courses anytime, anywhere with our mobile-friendly platform"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Physics Student",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "The interactive learning approach and detailed explanations have helped me understand complex physics concepts easily.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Chemistry Student",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "The quality of content and teaching methods are exceptional. My grades have improved significantly!",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Science Student",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      text: "The platform makes learning enjoyable. The teachers are knowledgeable and always ready to help.",
      rating: 4
    }
  ];

  return (
    <div className="container mx-auto px-4 bg-black text-white mt-16">
      <section className='flex flex-col gap-y-16 lg:flex-row justify-center items-stretch h-auto w-full max-h-full py-32 lg:px-20 px-4'>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='flex flex-col w-full lg:w-1/2 gap-8 text-center lg:text-start mt-16'
        >
          <h1 className='text-5xl sm:text-6xl font-bold bg-gradient-to-r from-yellow-500 to-amber-300 bg-clip-text text-transparent'>
            HR Science Quest<br />Learn Space
          </h1>
          <h2 className='text-2xl sm:text-2xl text-gray-300 font-semibold'>
            Learn, Collabrate, and Excel, with our solution.
          </h2>
          <div className='flex flex-col lg:flex-row gap-6 mt-6 items-center lg:justify-start'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <CallToActionButton title={"Get Started"} to={'/notes'} />
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/notes')}
              className='bg-black bg-gradient-to-r 
                        from-yellow-500 to-amber-300 bg-clip-text text-transparent border-2 border-amber-500 font-bold px-12 py-4 rounded-3xl hover:bg-gray-900 transition duration-300 shadow-lg flex-1 max-w-48'
            >
              Explore
            </motion.button>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='w-full lg:w-1/2 flex justify-center items-center lg:items-start'
        >
          <img src="/landing.png" className='w-full max-h-96 object-contain hover:scale-105 transition-transform duration-300' alt="hero" />
        </motion.div>
      </section>

      {/* New Features Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-24 px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-amber-300 bg-clip-text text-transparent mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover the features that make our platform the perfect choice for your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-amber-500/10 border border-amber-500/20 transition-all duration-300"
            >
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto border border-amber-500/30">
                {React.cloneElement(feature.icon, { className: "text-4xl text-amber-400" })}
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-amber-300">{feature.title}</h3>
              <p className="text-gray-400 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='w-full h-full flex flex-col text-center lg:text-start lg:flex-row gap-6 justify-center px-8 md:px-24 mt-36 mb-16 bg-gray-900 rounded-2xl shadow-xl p-8 border border-amber-500/20'
      >
        <div className="flex-1 rounded-xl overflow-hidden shadow-2xl">
          <ReactPlayer url="https://www.youtube.com/watch?v=R4IiubxBU9w&t" width={"100%"} controls />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h2 className='text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-300 bg-clip-text text-transparent'>
            High Quality Contents
          </h2>
          <p className='text-gray-400 mb-auto leading-relaxed'>
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

      {/* New Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-24 px-8 bg-gray-900 rounded-2xl shadow-lg my-16 border border-amber-500/20"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-amber-300 bg-clip-text text-transparent mb-4">
            What Our Students Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from our students about their learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-black p-6 rounded-xl shadow-md hover:shadow-amber-500/10 transition-all duration-300 border border-amber-500/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-amber-400" />
                ))}
              </div>
              <div className="relative">
                <FaQuoteLeft className="text-amber-500/30 text-4xl absolute -top-2 -left-2 opacity-50" />
                <p className="text-gray-300 relative z-10 pl-6">
                  "{testimonial.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default App;
