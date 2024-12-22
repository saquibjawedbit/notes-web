import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import {Card} from '../../components/card/Card.jsx'
import axios from 'axios';

export default function Chapters() {
  const { subject, chapter } = useParams();
  const [chapterList, setChapterList] = useState([]);
 

  useEffect(()=> {
    const loadData = async () => {
      try {
        const respone = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/subjects/${subject}/${chapter}`);
        const chapterList = respone.data.data.chapters;
        setChapterList(chapterList);
      }
      catch(e) {
        console.log(e);
      }
    }

    loadData();
  }, [])



  return (
    <div className="bg-slate-100 min-h-screen w-full py-8 flex flex-col items-center">
      <div className='text-5xl font-bold  ml-6 md:ml-24 self-start'>{chapter} Notes</div>
      <div className="flex flex-col w-full items-center gap-6 mt-12">
        {chapterList.map((ch, index) => <Card key={ch._id} index={index} name={ch.name} len={chapterList.length} subject={subject} chapter={chapter}/>)}
      </div>
    </div>
  )
}
