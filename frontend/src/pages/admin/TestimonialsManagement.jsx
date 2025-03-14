import { useState, useEffect } from 'react';
import axios from 'axios';
import TestimonialForm from './TestimonialForm';
import ReactLoading from 'react-loading';

export default function TestimonialsManagement() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/v1/testimonials');
            setTestimonials(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching testimonials:', err);
            setError('Failed to load testimonials. Please try again.');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await axios.delete(`/api/v1/testimonials/${id}`);
                setTestimonials(testimonials.filter(testimonial => testimonial._id !== id));
            } catch (err) {
                console.error('Error deleting testimonial:', err);
                setError('Failed to delete testimonial. Please try again.');
            }
        }
    };

    const handleEdit = (testimonial) => {
        setSelectedTestimonial(testimonial);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setSelectedTestimonial(null);
        setIsEditing(false);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (isEditing) {
                await axios.put(`/api/v1/testimonials/${selectedTestimonial._id}`, formData);
            } else {
                await axios.post('/api/v1/testimonials', formData);
            }
            fetchTestimonials();
            handleFormClose();
        } catch (err) {
            console.error('Error saving testimonial:', err);
            setError('Failed to save testimonial. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className='flex items-center justify-center h-[600px]'>
                <ReactLoading type={'spin'} color={'#000000'} height={'8%'} width={'8%'} />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Testimonials Management</h1>
                <button 
                    onClick={() => setShowForm(true)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    Add New Testimonial
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">
                                {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
                            </h2>
                            <button 
                                onClick={handleFormClose}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <TestimonialForm 
                            initialData={selectedTestimonial} 
                            onSubmit={handleFormSubmit} 
                            onCancel={handleFormClose}
                        />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.length > 0 ? (
                    testimonials.map(testimonial => (
                        <div key={testimonial._id} className="border rounded-lg overflow-hidden shadow-lg">
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg 
                                                key={i}
                                                className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-2">{testimonial.role}</p>
                                <p className="text-gray-800 mb-4 line-clamp-3">{testimonial.text}</p>
                                {testimonial.video && (
                                    <div className="mb-4">
                                        <a 
                                            href={testimonial.video} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Watch Video Testimonial
                                        </a>
                                    </div>
                                )}
                                <div className="flex justify-end space-x-2 mt-2">
                                    <button 
                                        onClick={() => handleEdit(testimonial)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(testimonial._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10">
                        <p className="text-gray-500 text-xl">No testimonials found. Add your first testimonial!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
