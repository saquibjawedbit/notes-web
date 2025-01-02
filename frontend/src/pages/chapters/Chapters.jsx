import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { Card } from '../../components/card/Card.jsx'
import axios from 'axios';
import ReactLoading from 'react-loading';
import { motion } from 'framer-motion';

export default function Chapters() {
  const { subject, chapter } = useParams();
  const [chapterList, setChapterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const respone = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/subjects/${subject}/${chapter}`);
        const chapterList = respone.data.data.chapters;
        setChapterList(chapterList);
      }
      catch(e) {
        console.log(e);
      }
      finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [subject, chapter]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-12 px-4 sm:px-8"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <motion.h1 
          className='text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-2'
        >
          {chapter} Notes
        </motion.h1>
        <motion.p 
          className="text-gray-600 text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Explore comprehensive study materials for {chapter}
        </motion.p>

        <motion.div 
          className="grid gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {isLoading ? (
            <motion.div 
              className="flex flex-col items-center gap-4 p-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ReactLoading type="bubbles" color="#4F46E5" height={80} width={80} />
              <p className="text-gray-600 text-lg">Loading your study materials...</p>
            </motion.div>
          ) : chapterList.length === 0 ? (
            <motion.div 
              className="text-center py-12 bg-white rounded-2xl shadow-sm"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <img src="/empty-state.svg" alt="No content" className="w-48 h-48 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No chapters found for this subject</p>
            </motion.div>
          ) : (
            chapterList.map((ch, index) => (
              <Card 
                key={ch._id} 
                index={index} 
                name={ch.name} 
                len={ch.notes.length}
                subject={subject} 
                chapter={chapter}
              />
            ))
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
