import React, {useState} from 'react';

function AdminPage() {
    const [subject, setSubject] = useState({
        image: null,
        name: '',
        grade: '',
        chapters: [
            {
                name: '',
                notes: [
                    {
                        pdfFile: null,
                        name: '',
                        image: null,
                        description: '',
                        price: ''
                    }
                ]
            }
        ]
    });

    const handleInputChange = (e, chapterIndex, noteIndex) => {
        const { name, value, files } = e.target;
        const updatedSubject = { ...subject };

        if (chapterIndex !== undefined && noteIndex !== undefined) {
            updatedSubject.chapters[chapterIndex].notes[noteIndex][name] = files ? files[0] : value;
        } else if (chapterIndex !== undefined) {
            updatedSubject.chapters[chapterIndex][name] = value;
        } else {
            updatedSubject[name] = files ? files[0] : value;
        }

        setSubject(updatedSubject);
    };

    const addChapter = () => {
        setSubject({
            ...subject,
            chapters: [
                ...subject.chapters,
                {
                    name: '',
                    notes: [
                        {
                            pdfFile: null,
                            name: '',
                            image: null,
                            description: '',
                            price: ''
                        }
                    ]
                }
            ]
        });
    };

    const addNote = (chapterIndex) => {
        const updatedChapters = [...subject.chapters];
        updatedChapters[chapterIndex].notes.push({
            pdfFile: null,
            name: '',
            image: null,
            description: '',
            price: ''
        });

        setSubject({ ...subject, chapters: updatedChapters });
    };

    const removeNote = (chapterIndex, noteIndex) => {
        const updatedChapters = [...subject.chapters];
        updatedChapters[chapterIndex].notes.splice(noteIndex, 1);
        setSubject({ ...subject, chapters: updatedChapters });
    };

    const removeChapter = (chapterIndex) => {
        const updatedChapters = [...subject.chapters];
        updatedChapters.splice(chapterIndex, 1);
        setSubject({ ...subject, chapters: updatedChapters });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(subject);
    };

    return (   
            <div className={`w-4/5 p-8 ml-4`}>
                <h1 className="text-3xl font-bold mb-6">Create Subject</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-lg">Image:</label>
                        <input type="file" name="image" onChange={handleInputChange} className="mt-1 block w-full" />
                    </div>
                    <div>
                        <label className="block text-lg">Name:</label>
                        <input type="text" name="name" value={subject.name} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-lg">Grade:</label>
                        <input type="text" name="grade" value={subject.grade} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    {subject.chapters.map((chapter, chapterIndex) => (
                        <div key={chapterIndex} className="border p-4 rounded-md">
                            <h2 className="text-xl font-semibold mb-2">Chapter {chapterIndex + 1}</h2>
                            <div>
                                <label className="block text-lg">Chapter Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={chapter.name}
                                    onChange={(e) => handleInputChange(e, chapterIndex)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            {chapter.notes.map((note, noteIndex) => (
                                <div key={noteIndex} className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Note {noteIndex + 1}</h3>
                                    <div>
                                        <label className="block text-lg">PDF File:</label>
                                        <input
                                            type="file"
                                            name="pdfFile"
                                            onChange={(e) => handleInputChange(e, chapterIndex, noteIndex)}
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg">Note Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={note.name}
                                            onChange={(e) => handleInputChange(e, chapterIndex, noteIndex)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg">Image:</label>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={(e) => handleInputChange(e, chapterIndex, noteIndex)}
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg">Description:</label>
                                        <input
                                            type="text"
                                            name="description"
                                            value={note.description}
                                            onChange={(e) => handleInputChange(e, chapterIndex, noteIndex)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg">Price:</label>
                                        <input
                                            type="text"
                                            name="price"
                                            value={note.price}
                                            onChange={(e) => handleInputChange(e, chapterIndex, noteIndex)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button className='bg-black text-white font-bold px-4 py-2 mt-4 rounded-md hover:bg-slate-800'>Upload Note</button>
                                        <button type="button" onClick={() => removeNote(chapterIndex, noteIndex)} className="bg-red-600 text-white font-bold px-4 py-2 mt-4 rounded-md hover:bg-red-950">
                                            Remove Note
                                        </button>
                                    </div>
                                </div>
                            ))}
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => addNote(chapterIndex)} className="bg-black text-white font-bold px-4 py-2 mt-4 rounded-md hover:bg-slate-800">
                                        Add Note
                                    </button>
                                    <button type="button" onClick={() => removeChapter(chapterIndex)} className="bg-red-600 text-white font-bold px-4 py-2 mt-4 rounded-md hover:bg-red-950">
                                        Remove Chapter
                                    </button>
                                </div>
                        </div>
                    ))}
                    <div className='flex gap-4'>
                        <button type="button" onClick={addChapter} className="bg-black text-white font-bold px-4 py-2 mt-4 rounded-md hover:bg-slate-800">
                            Add Chapter
                        </button>
                        
                    
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-black text-white font-bold px-4 w-64 py-2 mt-4 rounded-md hover:bg-slate-800">
                                Submit
                        </button>
                    </div>
                </form>
            </div>
    );
}

export default AdminPage;