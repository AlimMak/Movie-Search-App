function MovieCard(props){
    const {data} = props;
    // console.log(data.id)
    return(
        <div>
            <p>Title: {data.Title}</p>
            <p>Release Date: {data.release_date}</p>
            <p>Movie Image: {data.MovieImage}</p>
        </div>
    );
}

export default MovieCard;