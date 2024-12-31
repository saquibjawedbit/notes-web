import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import {Card} from '../../components/card/Card.jsx'
import axios from 'axios';
import ReactLoading from 'react-loading';

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
    <div className="bg-slate-100 min-h-screen w-full py-8 flex flex-col items-center">
      <div className='text-5xl font-bold ml-6 md:ml-24 self-start'>{chapter} Notes</div>
      <div className="flex flex-col w-full items-center gap-6 mt-12">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <ReactLoading type="bars" color="#000000" height={50} width={50} />
            <p className="text-gray-600">Loading chapters...</p>
          </div>
        ) : chapterList.length === 0 ? (
          <div className="text-gray-500">No chapters found</div>
        ) : (
          chapterList.map((ch, index) => (
            <Card 
              key={ch._id} 
              index={index} 
              name={ch.name} 
              len={chapterList.length} 
              subject={subject} 
              chapter={chapter}
            />
          ))
        )}
      </div>
    </div>
  );
}
