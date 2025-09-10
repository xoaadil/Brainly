// AddContent.tsx
import axios from "axios";
import { useState } from "react";
import { X, Plus, Link as LinkIcon, Type } from "lucide-react";

const url = import.meta.env.VITE_URL;

interface AddContentProps {
    onContentAdded: (newPost: any) => void;
    onClose: () => void;
}

// Normalize link before saving
const normalizeLink = (url: string, type: 'youtube' | 'twitter' | 'document' | 'other'): string => {
    if (type === 'youtube') {
        let videoId = '';

        if (url.includes('youtube.com/watch?v=')) {
            const urlParams = new URLSearchParams(url.split('?')[1]);
            videoId = urlParams.get('v') || '';
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0] || '';
        } else if (url.includes('youtube.com/embed/')) {
            videoId = url.split('youtube.com/embed/')[1]?.split('?')[0] || '';
        }

        if (videoId) {
            return `https://www.youtube.com/watch?v=${videoId}`;
        }
    }
    if (type === 'twitter') {
        // Convert x.com → twitter.com
        return url.replace("x.com", "twitter.com").split("?")[0];
    }

    return url.trim();
};

function AddContent({ onContentAdded, onClose }: AddContentProps) {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function to determine content type based on URL
    const determineContentType = (url: string): 'youtube' | 'twitter' | 'document' | 'other' => {
        const lowerUrl = url.toLowerCase();
        
        if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
            return 'youtube';
        } else if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) {
            return 'twitter';
        } else if (lowerUrl.includes('.pdf') || lowerUrl.includes('docs.google.com') || 
                   lowerUrl.includes('drive.google.com') || lowerUrl.includes('.doc')) {
            return 'document';
        } else {
            return 'other';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title.trim() || !link.trim()) {
            setError('Please fill in both title and link fields');
            return;
        }
 
        setLoading(true);
        setError(null);
        
        const type = determineContentType(link);
        const normalizedLink = normalizeLink(link, type);

        try {
            const response = await axios.post(`${url}/content/create`, {
                title: title.trim(),
                type,
                link: normalizedLink
            }, {
                headers: { 
                    'Content-Type': 'application/json',
                    brainlyauthorization: localStorage.getItem("brainlyauthorization") 
                }
            });

            console.log("Content created:", response.data);
            
            // Call the callback to update the parent component
            if (onContentAdded) {
                onContentAdded(response.data.content || response.data);
            }
            
            // Reset form
            setTitle('');
            setLink('');
            
            // Close modal/form
            onClose();
            
        } catch (err: any) {
            console.error("Error creating content:", err);
            setError(err.response?.data?.message || 'Failed to create content. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Light semi-transparent backdrop with blur effect - NO BLACK OVERLAY */}
            <div 
                className="absolute inset-0 bg-gray-100 bg-opacity-30 backdrop-blur-sm" 
                onClick={onClose}
            ></div>
            
            {/* Modal Content - Enhanced with better shadow and border */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md border border-gray-200 transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                    <h2 className="text-xl font-semibold text-gray-800">Add New Content</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
                    >
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-shake">
                            {error}
                        </div>
                    )}

                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Type size={16} className="text-gray-400" />
                            </div>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter content title"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                required
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Link Input */}
                    <div>
                        <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                            Link *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LinkIcon size={16} className="text-gray-400" />
                            </div>
                            <input
                                id="link"
                                type="url"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                required
                            />
                        </div>
                        {link && (
                            <p className="mt-2 text-xs text-gray-500">
                                Type: <span className="font-medium capitalize">{determineContentType(link)}</span>
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !title.trim() || !link.trim()}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus size={16} />
                                    Add Content
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddContent;