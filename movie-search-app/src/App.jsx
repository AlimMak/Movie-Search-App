import { useState, useEffect } from 'react';
import './App.css'
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handler to be passed to SearchBar
  const handleSearchResults = (results) => {
    setMovies(results);
    setHasSearched(true);
  };

  return(
    <div className={
      (darkMode
        ? 'dark bg-gradient-to-b from-gray-900 to-gray-800 text-white'
        : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900') +
      ' min-h-screen'
    }>
      <div className="max-w-6xl mx-auto px-4 py-12 relative">
        {/* Toggle Button */}
        <button
          className="absolute top-6 right-6 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 shadow-md transition-colors"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            // Modern sun icon, no border or circle
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="1.5" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="22.5" />
                <line x1="4.22" y1="4.22" x2="5.99" y2="5.99" />
                <line x1="18.01" y1="18.01" x2="19.78" y2="19.78" />
                <line x1="1.5" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="22.5" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.99" y2="18.01" />
                <line x1="18.01" y1="5.99" x2="19.78" y2="4.22" />
              </g>
            </svg>
          ) : (
            // Moon icon white in light mode
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          )}
        </button>
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Movie Explorer
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto dark:text-gray-300"
            style={!darkMode ? { color: '#000' } : {}}
          >
            Discover your next favorite movie. Search through thousands of titles, explore ratings, and find detailed information about any film.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <SearchBar onSearchResults={handleSearchResults} />
        </div>

        {/* Results Section */}
        <div className="mt-8">
          {!hasSearched && (
            <div
              className="text-center dark:text-gray-400"
              style={!darkMode ? { color: '#000' } : {}}
            >
              <p className="text-lg">Your search results will appear here</p>
            </div>
          )}
          <MovieList movies={movies} hasSearched={hasSearched} />
        </div>
      </div>
    </div>
  );
}

export default App
