import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

export default function EditPage() {
    const navigate = useNavigate();
    const [grade, setGrade] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedSubject, setExpandedSubject] = useState(null);
    const [expandedChapter, setExpandedChapter] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [noteDeleteLoading, setNoteDeleteLoading] = useState(false);
    const [editingChapter, setEditingChapter] = useState(null);
    const [chapterName, setChapterName] = useState('');

    const fetchSubjects = async (selectedGrade) => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/subjects/${selectedGrade}`);
            setSubjects(response.data.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGradeChange = (e) => {
        const selectedGrade = e.target.value;
        setGrade(selectedGrade);
        if (selectedGrade) {
            fetchSubjects(selectedGrade);
        } else {
            setSubjects([]);
        }
        setExpandedSubject(null);
        setExpandedChapter(null);
    };

    const handleDelete = async (subjectId) => {
        if (!window.confirm('Are you sure you want to delete this subject? This will delete all associated notes and cannot be undone.')) {
            return;
        }

        setDeleteLoading(true);
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/subjects/${subjectId}`);
            // Refresh the subjects list
            fetchSubjects(grade);
        } catch (error) {
            console.error('Error deleting subject:', error);
            alert('Failed to delete subject');
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleNoteDelete = async (noteId, subjectId, chapterIndex) => {
        if (!window.confirm('Are you sure you want to delete this note?')) {
            return;
        }

        setNoteDeleteLoading(true);
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/notes/${noteId}`);
            // Refresh the subjects list
            fetchSubjects(grade);
        } catch (error) {
            console.error('Error deleting note:', error);
            alert('Failed to delete note');
        } finally {
            setNoteDeleteLoading(false);
        }
    };

    const handleChapterDelete = async (subjectId, chapterIndex) => {
        if (!window.confirm('Are you sure you want to delete this chapter and all its notes?')) {
            return;
        }

        setLoading(true);
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/v1/dashboard/subjects/${subjectId}/chapters/${chapterIndex}`
            );
            fetchSubjects(grade);
        } catch (error) {
            console.error('Error deleting chapter:', error);
            alert('Failed to delete chapter');
        } finally {
            setLoading(false);
        }
    };

    const handleChapterEdit = async (subjectId, chapterIndex, name) => {
        if (editingChapter === `${subjectId}-${chapterIndex}`) {
            try {
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/v1/dashboard/subjects/${subjectId}/chapters/${chapterIndex}`,
                    { name: chapterName }
                );
                fetchSubjects(grade);
                setEditingChapter(null);
            } catch (error) {
                console.error('Error updating chapter:', error);
                alert('Failed to update chapter');
            }
        } else {
            setEditingChapter(`${subjectId}-${chapterIndex}`);
            setChapterName(name);
        }
    };

    const handleAddNewChapter = async (subjectId) => {
        try {
            setLoading(true);
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/dashboard/subjects/${subjectId}/chapters`,
                { name: "New Chapter" }
            );
            fetchSubjects(grade);
        } catch (error) {
            console.error('Error adding new chapter:', error);
            alert('Failed to add new chapter');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-4/5 p-8 ml-4">
            <h1 className="text-3xl font-bold mb-6">Edit Subjects</h1>
            <div className="mb-6">
                <label className="block text-lg mb-2">Select Grade:</label>
                <select 
                    value={grade} 
                    onChange={handleGradeChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="">Select Grade</option>
                    <option value="JEE">JEE</option>
                    <option value="NEET">NEET</option>
                    <option value="XII">XII</option>
                    <option value="XI">XI</option>
                    <option value="X">X</option>
                    <option value="IX">IX</option>
                </select>
            </div>

            {loading && (
                <div className="flex justify-center">
                    <ReactLoading type="spin" color="#000000" height={50} width={50} />
                </div>
            )}

            <div className="space-y-4">
                {subjects.map((subject) => (
                    <div key={subject._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setExpandedSubject(expandedSubject === subject._id ? null : subject._id)}
                                className="text-left font-semibold text-xl flex-grow"
                            >
                                <span>{subject.name}</span>
                            </button>
                            <button
                                onClick={() => handleDelete(subject._id)}
                                disabled={deleteLoading}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-red-300"
                            >
                                {deleteLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>

                        {expandedSubject === subject._id && (
                            <div className="mt-4 ml-4 space-y-3">
                                <button
                                    onClick={() => handleAddNewChapter(subject._id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mb-4 w-full"
                                >
                                    + Add New Chapter
                                </button>
                                
                                {subject.chapters.map((chapter, index) => (
                                    <div key={index} className="border-l-2 pl-4">
                                        <div className="flex items-center justify-between">
                                            {editingChapter === `${subject._id}-${index}` ? (
                                                <input
                                                    type="text"
                                                    value={chapterName}
                                                    onChange={(e) => setChapterName(e.target.value)}
                                                    className="border rounded px-2 py-1"
                                                />
                                            ) : (
                                                <button
                                                    onClick={() => setExpandedChapter(expandedChapter === `${subject._id}-${index}` ? null : `${subject._id}-${index}`)}
                                                    className="text-left font-medium text-lg flex-grow"
                                                >
                                                    {chapter.name}
                                                </button>
                                            )}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleChapterEdit(subject._id, index, chapter.name)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                                                >
                                                    {editingChapter === `${subject._id}-${index}` ? 'Save' : 'Edit'}
                                                </button>
                                                <button
                                                    onClick={() => handleChapterDelete(subject._id, index)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        {expandedChapter === `${subject._id}-${index}` && (
                                            <div className="mt-2 ml-4 space-y-2">
                                                <button
                                                    onClick={() => navigate(`/admin/create-note/${subject._id}/${index}`)}
                                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mb-4 w-full"
                                                >
                                                    + Add New Note
                                                </button>
                                                
                                                {chapter.notes.map((note, noteIndex) => (
                                                    <div key={noteIndex} className="p-4 bg-gray-50 rounded flex justify-between items-center">
                                                        <div>
                                                            <h4 className="font-medium">{note.title}</h4>
                                                            <p className="text-sm text-gray-600">Price: ₹{note.price}</p>
                                                            {note.thumbnail && (
                                                                <img 
                                                                    src={note.thumbnail} 
                                                                    alt={note.title} 
                                                                    className="h-20 w-20 object-cover mt-2 rounded"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => navigate(`/admin/edit-note/${note._id}`)}
                                                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleNoteDelete(note._id, subject._id, index)}
                                                                disabled={noteDeleteLoading}
                                                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-red-300"
                                                            >
                                                                {noteDeleteLoading ? 'Deleting...' : 'Delete'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}