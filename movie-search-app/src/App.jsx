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

  return(
    <div className={
      (darkMode
        ? 'dark bg-gradient-to-b from-gray-900 to-gray-800 text-white'
        : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900') +
      ' min-h-screen'
    }>
      <div className="max-w-6xl mx-auto px-4 py-12 relative">
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
