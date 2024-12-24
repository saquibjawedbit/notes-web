import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ReactLoading from 'react-loading';

function AdminPage() {
    const navigate = useNavigate();
    const [subject, setSubject] = useState({
        thumbnail: null,
        name: '',
        grade: '',
        chapters: [
            {
                name: '',
                notes: [
                    {
                        pdfFile: null,
                        title: '',       // Changed from 'name' to 'title'
                        thumbnail: null,
                        description: '',
                        price: ''
                    }
                ]
            }
        ]
    });

    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e, chapterIndex, noteIndex) => {
        const { name, value, type, files } = e.target;
        const updatedSubject = { ...subject };

        if (chapterIndex !== undefined && noteIndex !== undefined) {
            // Special handling for price field
            if (name === 'price') {
                updatedSubject.chapters[chapterIndex].notes[noteIndex][name] = value.replace(/[^0-9]/g, '');
            } else {
                updatedSubject.chapters[chapterIndex].notes[noteIndex][name] = type === 'file' ? files[0] : value;
            }
        } else if (chapterIndex !== undefined) {
            updatedSubject.chapters[chapterIndex][name] = value;
        } else {
            updatedSubject[name] = type === 'file' ? files[0] : value;
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
                            title: '',          // Changed from 'name' to 'title'
                            thumbnail: null,
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
            title: '',          // Changed from 'name' to 'title'
            thumbnail: null,
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




    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const nSubject = { ...subject };
            
            for (const chapter of nSubject.chapters) {
                const noteIds = [];
                for (const note of chapter.notes) {
                    // Uploading Notes
                    const formData = new FormData();
                    // Make sure all required fields are added to formData
                    formData.append('pdfFile', note.pdfFile);
                    formData.append('thumbnail', note.thumbnail);
                    formData.append('title', note.title);
                    formData.append('description', note.description);
                    formData.append('price', note.price);
                    
                    const result = await axios.post(
                        `${import.meta.env.VITE_API_URL}/api/v1/dashboard/upload-notes`, 
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    );
                    const noteId = result.data.data;
                    noteIds.push(noteId);
                }
                chapter.notes = noteIds;
            }
            
            // Upload The Subject
            const subjectFormData = new FormData();
            subjectFormData.append('thumbnail', subject.thumbnail);
            subjectFormData.append('name', subject.name);
            subjectFormData.append('grade', subject.grade);
            // Send chapters as a string but in a way that can be parsed as JSON
            subjectFormData.append('chapters', JSON.stringify(nSubject.chapters));

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/dashboard/create-subject`,
                subjectFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            setShowSuccess(true);
        } catch (error) {
            console.error('Error uploading data:', error);
            setErrorMessage(error.response?.data?.message || 'Failed to create subject');
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    // Fix the SuccessScreen component
    const SuccessScreen = () => {
        return (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <div className="bg-white p-6 rounded-lg flex flex-col items-center gap-4">
                    <h2 className='text-2xl'>Subject created Successfully</h2>
                    <button 
                        onClick={() => {
                            setShowSuccess(false);
                            // Reset form to initial state
                            setSubject({
                                thumbnail: null,
                                name: '',
                                grade: '',
                                chapters: [
                                    {
                                        name: '',
                                        notes: [
                                            {
                                                pdfFile: null,
                                                title: '',
                                                thumbnail: null,
                                                description: '',
                                                price: ''
                                            }
                                        ]
                                    }
                                ]
                            });
                            // Force page refresh
                            window.location.reload();
                        }} 
                        className='bg-black py-2 px-4 text-white text-lg rounded'>
                        OK
                    </button>
                </div>
            </div>
        );
    }

    // Update the LoadingScreen component to be fixed position
    const LoadingScreen = () => {
        return (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <ReactLoading type={'cubes'} color={'#00000'} height={'10%'} width={'10%'} />
            </div>
        );
    }

    // Add ErrorScreen component
    const ErrorScreen = () => (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className="bg-white p-6 rounded-lg flex flex-col items-center gap-4">
                <h2 className='text-2xl text-red-600'>Error</h2>
                <p className='text-center'>{errorMessage}</p>
                <button 
                    onClick={() => setShowError(false)} 
                    className='bg-red-600 py-2 px-4 text-white text-lg rounded hover:bg-red-700'>
                    Close
                </button>
            </div>
        </div>
    );

    return ( <>
            {loading && <LoadingScreen/>}
            {showSuccess && <SuccessScreen/>}
            {showError && <ErrorScreen/>}
            <div className={`w-4/5 p-8 ml-4`}>
                <h1 className="text-3xl font-bold mb-6">Create Subject</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-lg">Image:</label>
                        <input type="file" name="thumbnail" onChange={handleInputChange} className="mt-1 block w-full" accept="image/*" required/>
                    </div>
                    <div>
                        <label className="block text-lg">Name:</label>
                        <input type="text" name="name" value={subject.name} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required/>
                    </div>
                    <div>
                        <label className="block text-lg">Grade:</label>
                        <select name="grade" value={subject.grade} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required>
                            <option value="">Select Grade</option>
                            <option value="JEE">JEE</option>
                            <option value="NEET">NEET</option>
                            <option value="XII">XII</option>
                            <option value="XI">XI</option>
                            <option value="X">X</option>
                            <option value="IX">IX</option>
                        </select>
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
                                    required
                                />
                            </div>
                            <div className='ml-8'>
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
                                                accept=".pdf"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-lg">Note Name:</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={note.title}     // Changed from note.name to note.title
                                                onChange={(e) => handleInputChange(e, chapterIndex, noteIndex)}
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-lg">Image:</label>
                                            <input
                                                type="file"
                                                name="thumbnail"
                                                onChange={(e) => handleInputChange(e, chapterIndex, noteIndex)}
                                                className="mt-1 block w-full"
                                                accept="image/*"
                                                required
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
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-lg">Price:</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={note.price}
                                                onChange={(e) => handleInputChange(e, chapterIndex, noteIndex)}
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                required
                                            />
                                        </div>
                                        
                                        <button type="button" onClick={() => removeNote(chapterIndex, noteIndex)} className="bg-red-600 text-white font-bold px-4 py-2 mt-4 rounded-md hover:bg-red-950">
                                            Remove Note
                                        </button>
                                        
                                    </div>
                                ))}
                            </div>
                           
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
            </>  
    );
}

export default AdminPage;