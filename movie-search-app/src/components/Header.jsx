import React from 'react';

function Header({ darkMode }) {
  return (
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
  );
}

export default Header; 