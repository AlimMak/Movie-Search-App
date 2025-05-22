import React, { useEffect } from 'react';

function MovieModal({ movie, onClose }) {
    if (!movie) return null;

    // Handle escape key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // Handle click outside
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out animate-scaleIn"
            >
                <div className="relative">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Movie Poster */}
                            <div className="w-full md:w-1/3">
                                {movie.MovieImage ? (
                                    <div className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                                        {movie.MovieImage}
                                    </div>
                                ) : (
                                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-[2/3] flex items-center justify-center transition-colors duration-300">
                                        <span className="text-gray-400 dark:text-gray-500">No image available</span>
                                    </div>
                                )}
                            </div>

                            {/* Movie Details */}
                            <div className="w-full md:w-2/3">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                                    {movie.Title}
                                </h2>
                                
                                <div className="flex items-center gap-4 mb-4">
                                    {movie.Rating !== undefined && (
                                        <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-lg transition-colors duration-300">
                                            <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                                            </svg>
                                            <span className="text-yellow-700 dark:text-yellow-200 font-semibold transition-colors duration-300">
                                                {movie.Rating.toFixed(1)}
                                            </span>
                                        </div>
                                    )}
                                    <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                        Release Date: {movie.release_date}
                                    </span>
                                </div>

                                <div className="prose dark:prose-invert max-w-none">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Overview</h3>
                                    <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                                        {movie.Description || "No description available."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieModal; 