// Home.tsx
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import ContentSidebar from "../components/Sidebar";
import AddContent from "../components/AddContent";
const url = import.meta.env.VITE_URL;
import { Menu, Search, Plus, RefreshCw, SlidersHorizontal } from "lucide-react";

export interface Post {
    _id: string;
    title: string;
    link: string;
    type: 'youtube' | 'twitter' | 'document' | 'other';
    user: string;
    createdAt: string;
}

type FilterType = 'all' | 'youtube' | 'twitter' | 'document' | 'other';

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showAddContent, setShowAddContent] = useState(false);
   
 const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


    // Calculate post counts by type
    const postCounts = {
        all: posts.length,
        youtube: posts.filter(post => post.type === 'youtube').length,
        twitter: posts.filter(post => post.type === 'twitter').length,
        document: posts.filter(post => post.type === 'document').length,
        other: posts.filter(post => post.type === 'other').length,
    };

    // Fetch posts from API
    const fetchPosts = async (showLoadingIndicator = true) => {
        try {
            if (showLoadingIndicator) {
                setLoading(true);
            }
            setError(null);
            
            const response = await axios.get(`${url}/content/my-posts`, {
                headers: { 
                    brainlyauthorization: localStorage.getItem("brainlyauthorization") 
                },
            });
            
            console.log("Posts fetched at:", new Date().toLocaleTimeString());
            
            const fetchedPosts = response.data.contents || [];
            setPosts(fetchedPosts);
            
        } catch (err) {
            console.error("Error fetching posts:", err);
            // Only show error if it's the initial load
            if (showLoadingIndicator) {
                setError("Failed to load posts. Please try again.");
            }
        } finally {
            if (showLoadingIndicator) {
                setLoading(false);
            }
        }
    };

    // Handle post deletion
    const handlePostDeleted = (deletedContentId: string) => {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== deletedContentId));
    };

    // Handle content addition - with automatic refresh
    const handleContentAdded = async (newPost: Post) => {
        // Immediately add the new post to the UI
        setPosts(prevPosts => [newPost, ...prevPosts]);
        console.log("New content added:", newPost);
        
        // Fetch fresh data from server after a short delay
        setTimeout(() => {
            fetchPosts(false);
        }, 500);
    };

    // Handle manual refresh
    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchPosts(false);
        setIsRefreshing(false);
    };

    // Filter and search posts
    useEffect(() => {
        let filtered = posts;

        // Apply type filter
        if (activeFilter !== 'all') {
            filtered = filtered.filter(post => post.type === activeFilter);
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.link.toLowerCase().includes(query)
            );
        }

        setFilteredPosts(filtered);
    }, [posts, activeFilter, searchQuery]);

    // Initial fetch and setup auto-refresh
    useEffect(() => {
        // Initial fetch
        fetchPosts();

        // Setup auto-refresh every 5 seconds
        intervalRef.current = setInterval(() => {
            console.log("Auto-refreshing posts...");
            fetchPosts(false); // Don't show loading indicator for auto-refresh
        }, 5000);

        // Cleanup interval on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Handle filter change
    const handleFilterChange = (filter: FilterType) => {
        setActiveFilter(filter);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-lg text-gray-600 font-medium">Loading your content...</div>
                    <div className="text-sm text-gray-500 mt-1">Please wait while we fetch your posts</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
                <div className="text-center max-w-md p-8">
                    <div className="text-6xl mb-4">😵</div>
                    <div className="text-lg text-red-600 font-semibold mb-2">{error}</div>
                    <button
                        onClick={() => fetchPosts()}
                        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
            {/* Sidebar */}
            <ContentSidebar
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                postCounts={postCounts}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <Menu size={20} className="text-gray-600" />
                            </button>
                            
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">My Content</h1>
                                <p className="text-sm text-gray-600 mt-1">
                                    {filteredPosts.length} {filteredPosts.length === 1 ? 'item' : 'items'} found
                                    {activeFilter !== 'all' && ` in ${activeFilter}`}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Auto-refresh indicator */}
                            <div className="text-xs text-gray-500 hidden sm:block">
                                Auto-refresh: ON (5s)
                            </div>

                            {/* Refresh Button */}
                            <button
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                                title="Refresh posts"
                            >
                                <RefreshCw 
                                    size={18} 
                                    className={`text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} 
                                />
                            </button>

                            {/* Filter Toggle for Mobile */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Open filters"
                            >
                                <SlidersHorizontal size={18} className="text-gray-600" />
                            </button>

                            {/* Add New Content Button */}
                            <button 
                                onClick={() => setShowAddContent(true)} 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <Plus size={16} />
                                <span className="hidden sm:inline">Add Content</span>
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-4 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search your content..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                        />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6">
                    {posts.length === 0 ? (
                        // Empty State
                        <div className="text-center py-20">
                            <div className="text-8xl mb-6">📚</div>
                            <div className="text-gray-500 text-xl mb-4 font-medium">No content found</div>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                Start building your personal knowledge library by adding your first piece of content.
                            </p>
                            <button 
                                onClick={() => setShowAddContent(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
                            >
                                <Plus size={18} />
                                Add Your First Content
                            </button>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        // No Results State
                        <div className="text-center py-20">
                            <div className="text-6xl mb-6">🔍</div>
                            <div className="text-gray-500 text-xl mb-4 font-medium">No matches found</div>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                {searchQuery.trim() 
                                    ? `No content matches "${searchQuery}". Try adjusting your search terms.`
                                    : `No ${activeFilter} content found. Try selecting a different category.`
                                }
                            </p>
                            <div className="flex gap-3 justify-center">
                                {searchQuery.trim() && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        Clear Search
                                    </button>
                                )}
                                {activeFilter !== 'all' && (
                                    <button
                                        onClick={() => setActiveFilter('all')}
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        Show All Content
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        // Content Grid
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredPosts.map((post) => (
                                <Card
                                    key={post._id}
                                    id={post._id}
                                    contentId={post._id}
                                    title={post.title}
                                    link={post.link}
                                    type={post.type}
                                    createdAt={post.createdAt}
                                    onDelete={handlePostDeleted}
                                />
                            ))}
                        </div>
                    )}

                    {/* Stats Footer */}
                    {filteredPosts.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500">
                                <div className="text-center">
                                    <div className="font-semibold text-2xl text-gray-700">{postCounts.all}</div>
                                    <div>Total Items</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-2xl text-red-600">{postCounts.youtube}</div>
                                    <div>Videos</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-2xl text-blue-500">{postCounts.twitter}</div>
                                    <div>Tweets</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-2xl text-green-600">{postCounts.document}</div>
                                    <div>Documents</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-2xl text-gray-600">{postCounts.other}</div>
                                    <div>Other</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Content Modal - No black overlay */}
            {showAddContent && (
                <AddContent
                    onContentAdded={handleContentAdded}
                    onClose={() => setShowAddContent(false)}
                />
            )}
        </div>
    );
}