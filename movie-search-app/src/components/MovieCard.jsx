import { useState } from 'react';

function MovieCard(props){
    const {data} = props;
    const [expanded, setExpanded] = useState(false);
    const maxLength = 200;
    const isLong = data.Description && data.Description.length > maxLength;
    const displayText = expanded || !isLong
        ? data.Description
        : data.Description.slice(0, maxLength) + '...';
    // console.log(data.id)
    // console.log(data.release_date);
    return(
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
            {/* Rating Row at Top Right */}
            {data.Rating !== undefined && (
                <div className="flex justify-end">
                    <div className="flex items-center bg-yellow-100 px-2 py-0.5 rounded-lg shadow-sm text-yellow-700 text-xs font-semibold mt-2 mr-2">
                        <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                        </svg>
                        {data.Rating.toFixed(1)}
                    </div>
                </div>
            )}
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2" title={data.Title}>{data.Title}</h2>
                <p className="text-gray-600 mb-4">Release Date: {data.release_date}</p>
                {data.MovieImage && (
                    <div className="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden mb-4">
                        {data.MovieImage}
                    </div>
                )}
                {data.Description && (
                    <>
                        <p className="text-gray-700 text-sm mb-2">{displayText}</p>
                        {isLong && (
                            <button
                                className="text-blue-600 hover:underline text-sm font-medium focus:outline-none"
                                onClick={() => setExpanded((prev) => !prev)}
                            >
                                {expanded ? 'Show less' : 'Read more'}
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default MovieCard;