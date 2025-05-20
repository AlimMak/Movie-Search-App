import { useState } from 'react';
import './App.css'
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);

  return(
    <div>
      <h1>Movie App</h1>
      <SearchBar onSearchResults={setMovies} />
      <MovieList movies={movies} />
    </div>
  );
}

export default App
