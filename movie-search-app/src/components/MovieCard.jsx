function MovieCard(props){
    const {data} = props;
    // console.log(data.id)
    // console.log(data.release_date);
    return(
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.Title}</h2>
                <p className="text-gray-600 mb-4">Release Date: {data.release_date}</p>
                {data.MovieImage && (
                    <div className="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden mb-4">
                        {data.MovieImage}
                    </div>
                )}
                {data.Description && (
                    <p className="text-gray-700 text-sm">
                        {data.Description.length > 200
                            ? data.Description.slice(0, 200) + '...'
                            : data.Description}
                    </p>
                )}
            </div>
        </div>
    );
}

export default MovieCard;