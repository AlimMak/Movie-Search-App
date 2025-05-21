import React from "react";
import MovieCard from "./MovieCard";

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