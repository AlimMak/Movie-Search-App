function MovieList({ movies }) {
  return (
    <div>
      {movies.length === 0 ? (
        <p>No movies found. Try a search.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
