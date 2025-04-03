const MovieCard = ({ movie }) => {
    const posterUrl = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Poster';
  
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <img 
          src={posterUrl} 
          alt={movie.title} 
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">{movie.title}</h3>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500">⭐</span>
            <span className="ml-1 text-gray-700">{movie.vote_average?.toFixed(1)}</span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">{movie.overview}</p>
        </div>
      </div>
    );
  };
  
  export default MovieCard;