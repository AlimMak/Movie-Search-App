import { useState } from 'react';
import './App.css'
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Handler to be passed to SearchBar
  const handleSearchResults = (results) => {
    setMovies(results);
    setHasSearched(true);
  };

  return(
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Movie Explorer
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
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
            <div className="text-center text-gray-400">
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
