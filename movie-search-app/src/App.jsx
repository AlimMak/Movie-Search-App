import { useState, useEffect } from 'react';
import './App.css'
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import MovieModal from './components/MovieModal';

function App() {
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
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

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleHomeClick = () => {
    setMovies([]);
    setHasSearched(false);
    setSelectedMovie(null);
  };

  return(
    <div className={
      (darkMode
        ? 'dark bg-gradient-to-b from-gray-900 to-gray-800 text-white'
        : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900') +
      ' min-h-screen'
    }>
      <div className="max-w-6xl mx-auto px-4 py-12 relative">
        <div className="absolute top-6 left-6">
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg 
              className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">Home</span>
          </button>
        </div>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <Header darkMode={darkMode} />
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
          <MovieList movies={movies} hasSearched={hasSearched} onMovieClick={handleMovieClick} />
        </div>

        {/* Movie Modal */}
        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default App
