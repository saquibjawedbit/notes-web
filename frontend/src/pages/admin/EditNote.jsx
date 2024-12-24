import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';

export default function EditNote() {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState({
        title: '',
        description: '',
        price: '',
        pdfFile: null,
        thumbnail: null
    });
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/dashboard/notes/${noteId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const noteData = response.data.data;
                setNote({
                    title: noteData.title,
                    description: noteData.description,
                    price: noteData.price,
                    pdfFile: noteData.pdfFile,
                    thumbnail: noteData.thumbnail
                });
            } catch (error) {
                console.error('Error fetching note:', error);
                alert('Failed to fetch note details');
            } finally {
                setFetchLoading(false);
            }
        };

        if (noteId) {
            fetchNote();
        }
    }, [noteId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', note.title);
            formData.append('description', note.description);
            formData.append('price', note.price);
            if (note.newPdfFile) formData.append('pdfFile', note.newPdfFile);
            if (note.newThumbnail) formData.append('thumbnail', note.newThumbnail);

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/v1/dashboard/notes/${noteId}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            navigate(-1); // Go back to previous page
        } catch (error) {
            console.error('Error updating note:', error);
            alert('Failed to update note');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-4/5 p-8 ml-4">
            <h1 className="text-3xl font-bold mb-6">Edit Note</h1>
            {fetchLoading ? (
                <div className="flex justify-center">
                    <ReactLoading type="spin" color="#000000" height={50} width={50} />
                </div>
            ) : (
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
                        <label className="block text-lg">New PDF File (optional):</label>
                        <input
                            type="file"
                            onChange={(e) => setNote({...note, newPdfFile: e.target.files[0]})}
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-lg">New Thumbnail (optional):</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file && !file.type.startsWith('image/')) {
                                    alert('Please select an image file');
                                    e.target.value = '';
                                    return;
                                }
                                setNote({...note, newThumbnail: file});
                            }}
                            className="mt-1 block w-full"
                        />
                        {note.thumbnail && (
                            <div className="mt-2">
                                <p className="text-sm">Current thumbnail:</p>
                                <img 
                                    src={`${import.meta.env.VITE_API_URL}/${note.thumbnail}`} 
                                    alt="Current thumbnail" 
                                    className="mt-1 h-20 object-contain"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            )}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <ReactLoading type="spin" color="#ffffff" height={50} width={50} />
                </div>
            )}
        </div>
    );
}
