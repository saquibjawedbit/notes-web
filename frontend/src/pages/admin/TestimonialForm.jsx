import { useState, useEffect } from 'react';

export default function TestimonialForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        image: '',
        text: '',
        rating: 5,
        video: ''
    });
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            setImagePreview(initialData.image);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Clear error for this field when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleRatingChange = (rating) => {
        setFormData({
            ...formData,
            rating
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // For this example, we're assuming direct image URL input
            // In a real application, you'd handle file upload to server
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setFormData({
                ...formData,
                image: file // In actual implementation, this would be handled differently
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.role.trim()) newErrors.role = 'Role is required';
        if (!formData.text.trim()) newErrors.text = 'Testimonial text is required';
        if (!formData.image && !initialData?.image) newErrors.image = 'Image is required';
        if (!formData.video.trim()) newErrors.video = 'Video URL is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // In a real application, you'd handle file upload here
            // For this example, we'll just pass the form data
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Role/Position</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Testimonial Text</label>
                <textarea
                    name="text"
                    rows="4"
                    value={formData.text}
                    onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${errors.text ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {errors.text && <p className="mt-1 text-sm text-red-500">{errors.text}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <div className="flex items-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(star)}
                            className="focus:outline-none"
                        >
                            <svg
                                className={`w-8 h-8 ${
                                    star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </button>
                    ))}
                    <span className="ml-2 text-gray-600">{formData.rating} of 5</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                    <div className="mt-1 flex items-center">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={`w-full ${errors.image ? 'border-red-500' : ''}`}
                        />
                    </div>
                    {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                    
                    {imagePreview && (
                        <div className="mt-2">
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="h-24 w-24 object-cover rounded-full border"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Video URL</label>
                    <input
                        type="url"
                        name="video"
                        value={formData.video}
                        onChange={handleChange}
                        placeholder="https://youtube.com/watch?v=..."
                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${errors.video ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.video && <p className="mt-1 text-sm text-red-500">{errors.video}</p>}
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    {initialData ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
            </div>
        </form>
    );
}
