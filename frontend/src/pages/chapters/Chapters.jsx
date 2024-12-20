import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'

export default function Chapters() {
  const { subject, chapter } = useParams();
  const [chapterList, setChapterList] = useState([]);

  useEffect(()=> {
    const loadData = async () => {
      try {
        const respone = await axios.get(`/api/v1/subjects/${subject}/${chapter}`);
        const chapterList = respone.data.data.chapters;
        setChapterList(chapterList);
      }
      catch(e) {
        console.log(e);
      }
    }

    loadData();
  }, [])

  function Card({index, name, len}) {
    return <>
    <Link to={name} className='flex flex-col bg-white items-center justify-start px-24 py-12 w-2/3 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl'>
          <div className='flex justify-between w-full px-8 items-center'>
            <div className="flex flex-col">
              <h3 className='font-bold text-3xl'>Module {index+1}</h3>
              <h4 className='font-semibold text-xl'>{name}</h4>
            </div>
            <h3 className='text-xl'>{len}</h3>
          </div>
        </Link>
    </>;
  }

  return (
    <div className="bg-slate-100 h-screen w-full py-8 flex flex-col items-center">
      <div className='text-5xl font-bold ml-24 self-start'>{chapter} Notes</div>
      <div className="flex flex-col w-full items-center gap-6 mt-12">
        {chapterList.map((ch, index) => <Card key={ch._id} index={index} name={ch.name} len={chapterList.length}/>)}
      </div>
    </div>
  )
}
