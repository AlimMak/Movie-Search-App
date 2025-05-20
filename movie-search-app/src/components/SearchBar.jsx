import { useState, useEffect } from "react";

function SearchBar({ onSearchResults }) {
    const [inputValue, getInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputValue = (event) => {
        getInputValue(event.target.value);
    };

    const handleMovie = () => {
        setMovies(data);
    };


    const handleButtonClick = async () => {
        if (!inputValue.trim()) {
            alert("Please enter a movie name!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const apiKey = "b38dfb832f07047399aef83c80e3f6fc";
            const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue}`;

            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            console.log('Fetched Movie Data:', data);
            onSearchResults(data.results);
            // update dispay to show movie data 
        } catch (err) {
            setError(err);
            console.error('Error fetching movie data:', err);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div>
            <div>
                <input type="text" value={inputValue} onChange={handleInputValue} placeholder="enter a movie name" />
                <button onClick={handleButtonClick} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
                <p>Input Value: {inputValue}</p>
            </div>

            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            {loading && <p>Searching for movies...</p>}
            {/* render the fetched data here */}
        </div>
    );
}

export default SearchBar;