import { useState, useEffect } from "react";

function SearchBar({ onSearchResults }) {
    const [inputValue, getInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showEmptyInputMessage, setShowEmptyInputMessage] = useState(false);

    const handleInputValue = (event) => {
        getInputValue(event.target.value);
        setShowEmptyInputMessage(false);
    };

    const handleButtonClick = async () => {
        if (!inputValue.trim()) {
            setShowEmptyInputMessage(true);
            return;
        }

        setLoading(true);
        setError(null);
        setShowEmptyInputMessage(false);

        try {
            const apiKey = import.meta.env.VITE_TMDB_API_KEY;
            if (!apiKey) {
                throw new Error('API key is not configured');
            }
            const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue}`;

            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            console.log('Fetched Movie Data:', data);
            onSearchResults(data.results);
        } catch (err) {
            setError(err);
            console.error('Error fetching movie data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleButtonClick();
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex flex-col space-y-4">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={handleInputValue}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter a movie name..." 
                        className="flex-1 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    />
                    <button 
                        onClick={handleButtonClick} 
                        disabled={loading}
                        className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                </svg>
                                Searching...
                            </span>
                        ) : 'Search'}
                    </button>
                </div>

                {showEmptyInputMessage && (
                    <div className="p-3 text-yellow-700 bg-yellow-100 rounded-lg">
                        <p className="font-medium">Please enter a movie name to search</p>
                    </div>
                )}

                {error && (
                    <div className="p-3 text-red-700 bg-red-100 rounded-lg">
                        <p className="font-medium">Error: {error.message}</p>
                    </div>
                )}
                
                {loading && !error && (
                    <div className="p-3 text-blue-700 bg-blue-100 rounded-lg">
                        <p className="font-medium">Searching for movies...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;