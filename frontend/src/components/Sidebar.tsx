import { Play, MessageCircle, FileText, Link, Grid, Filter, X } from 'lucide-react';

export interface SidebarProps {
    activeFilter: 'all' | 'youtube' | 'twitter' | 'document' | 'other';
    onFilterChange: (filter: 'all' | 'youtube' | 'twitter' | 'document' | 'other') => void;
    postCounts?: {
        all: number;
        youtube: number;
        twitter: number;
        document: number;
        other: number;
    };
    isOpen: boolean;
    onClose: () => void;
}

export default function ContentSidebar({ 
    activeFilter, 
    onFilterChange, 
    postCounts,
    isOpen,
    onClose 
}: SidebarProps) {
    const filterOptions = [
        {
            key: 'all' as const,
            label: 'All Content',
            icon: <Grid size={18} className="text-gray-600" />,
            color: 'text-gray-700',
            bgColor: 'bg-gray-50',
            hoverColor: 'hover:bg-gray-100',
            activeColor: 'bg-gray-200 border-gray-300'
        },
        {
            key: 'youtube' as const,
            label: 'YouTube',
            icon: <Play size={18} className="text-red-600" />,
            color: 'text-red-700',
            bgColor: 'bg-red-50',
            hoverColor: 'hover:bg-red-100',
            activeColor: 'bg-red-200 border-red-300'
        },
        {
            key: 'twitter' as const,
            label: 'Twitter',
            icon: <MessageCircle size={18} className="text-blue-500" />,
            color: 'text-blue-700',
            bgColor: 'bg-blue-50',
            hoverColor: 'hover:bg-blue-100',
            activeColor: 'bg-blue-200 border-blue-300'
        },
        {
            key: 'document' as const,
            label: 'Documents',
            icon: <FileText size={18} className="text-green-600" />,
            color: 'text-green-700',
            bgColor: 'bg-green-50',
            hoverColor: 'hover:bg-green-100',
            activeColor: 'bg-green-200 border-green-300'
        },
        {
            key: 'other' as const,
            label: 'Other',
            icon: <Link size={18} className="text-gray-600" />,
            color: 'text-gray-700',
            bgColor: 'bg-gray-50',
            hoverColor: 'hover:bg-gray-100',
            activeColor: 'bg-gray-200 border-gray-300'
        }
    ];

    const handleFilterClick = (filterKey: typeof activeFilter) => {
        onFilterChange(filterKey);
        // Close sidebar on mobile after selection
        if (window.innerWidth < 768) {
            onClose();
        }
    };

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}
            
            {/* Sidebar */}
            <div className={`
                fixed md:sticky top-0 left-0 h-screen w-80 bg-white border-r border-gray-200 shadow-lg md:shadow-none
                transform transition-transform duration-300 z-50 md:z-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <Filter size={20} className="text-gray-600" />
                            <h2 className="text-lg font-semibold text-gray-800">Filter Content</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X size={18} className="text-gray-600" />
                        </button>
                    </div>
                    
                    {/* Filter Options */}
                    <div className="flex-1 p-4 space-y-2">
                        {filterOptions.map((option) => (
                            <button
                                key={option.key}
                                onClick={() => handleFilterClick(option.key)}
                                className={`
                                    w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200
                                    ${activeFilter === option.key 
                                        ? `${option.activeColor} shadow-sm scale-105` 
                                        : `${option.bgColor} border-transparent ${option.hoverColor} hover:scale-102`
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    {option.icon}
                                    <span className={`font-medium ${option.color}`}>
                                        {option.label}
                                    </span>
                                </div>
                                
                                {postCounts && (
                                    <span className={`
                                        text-xs px-2.5 py-1 rounded-full font-semibold
                                        ${activeFilter === option.key 
                                            ? 'bg-white text-gray-700 shadow-sm' 
                                            : 'bg-white text-gray-600'
                                        }
                                    `}>
                                        {postCounts[option.key]}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="text-xs text-gray-500 text-center">
                            {postCounts && (
                                <p>
                                    Showing <span className="font-semibold text-gray-700">
                                        {activeFilter === 'all' ? postCounts.all : postCounts[activeFilter]}
                                    </span> of <span className="font-semibold text-gray-700">
                                        {postCounts.all}
                                    </span> posts
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}