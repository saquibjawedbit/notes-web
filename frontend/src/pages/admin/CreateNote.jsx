import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';

export default function CreateNote() {
    const { subjectId, chapterIndex } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [note, setNote] = useState({
        title: '',
        description: '',
        price: '',
        pdfFile: null,
        thumbnail: null
    });
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Add validation for files
        if (!note.pdfFile || !note.thumbnail) {
            alert("Both PDF file and thumbnail are required");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', note.title);
            formData.append('description', note.description);
            formData.append('price', note.price);
            
            // Ensure files are being properly appended with correct field names
            if (note.pdfFile) {
                formData.append('pdfFile', note.pdfFile, note.pdfFile.name);
            }
            if (note.thumbnail) {
                formData.append('thumbnail', note.thumbnail, note.thumbnail.name);
            }

            const config = {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            };

            // Upload note and get note ID
            const noteResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/dashboard/upload-notes`,
                formData,
                config
            );

            const noteId = noteResponse.data.data;

            // Update subject's chapter with new note ID
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/v1/dashboard/subjects/${subjectId}/chapters/${chapterIndex}/notes`,
                { noteId }
            );

            navigate('/admin/subjects');
        } catch (error) {
            console.error('Error creating note:', error.response?.data || error);
            setErrorMessage(error.response?.data?.message || 'Failed to create note');
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <div className="w-4/5 p-8 ml-4">
            {showError && <ErrorScreen />}
            <h1 className="text-3xl font-bold mb-6">Create New Note</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-lg">Note Name:</label>
                    <input
                        type="text"
                        value={note.title}
                        onChange={(e) => setNote({...note, title: e.target.value})}
                        className="mt-1 block w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg">Description:</label>
                    <input
                        type="text"
                        value={note.description}
                        onChange={(e) => setNote({...note, description: e.target.value})}
                        className="mt-1 block w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg">Price:</label>
                    <input
                        type="number"
                        value={note.price}
                        onChange={(e) => setNote({...note, price: e.target.value})}
                        className="mt-1 block w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg">PDF File:</label>
                    <input
                        type="file"
                        onChange={(e) => setNote({...note, pdfFile: e.target.files[0]})}
                        className="mt-1 block w-full"
                        accept=".pdf"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg">Thumbnail:</label>
                    <input
                        type="file"
                        onChange={(e) => setNote({...note, thumbnail: e.target.files[0]})}
                        className="mt-1 block w-full"
                        accept="image/*"
                        required
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/subjects')}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
                    >
                        {loading ? 'Creating...' : 'Create Note'}
                    </button>
                </div>
            </form>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <ReactLoading type="spin" color="#ffffff" height={50} width={50} />
                </div>
            )}
        </div>
    );
}
