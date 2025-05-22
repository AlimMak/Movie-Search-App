import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies, hasSearched, onMovieClick }) {
    if (hasSearched && movies.length === 0){
        return (
            <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 text-lg">Try another movie name please</p>
            </div>
        );
    }

    if (movies.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    data={{
                        Title: movie.title,
                        release_date: movie.release_date,
                        Description: movie.overview,
                        Rating: movie.vote_average,
                        MovieImage: movie.poster_path ? 
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            /> 
                            : null
                    }}
                    onCardClick={onMovieClick}
                />
            ))}
        </div>
    );
}

export default MovieList;