import React from "react";
import MovieCard from "./MovieCard";

function handleMovie(movie, key) {
    key = movie.id;
    // console.log(key);
    const movieObject = {
        Key: movie.id,
        Title: movie.title,
        RelaseDate: movie.release_date,
        MovieImage: movie.poster_path ? (<img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />) : null
    };

    return <MovieCard data={movieObject} />
}


function MovieList({ movies }) {
    if (movies.length === 0){
        return <p>Try another movie name please</p>
    }

    return (
        <div>
            {movies.map((movie) =>(
                <MovieCard key = {movie.id} data={{Key: movie.id, Title: movie.title, RelaseDate: movie.release_date,
                MovieImage: movie.poster_path ? (<img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />) : null }}/>
            ))}
        </div>
    );
}

export default MovieList;