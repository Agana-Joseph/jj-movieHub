import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, onClick }) => {
  const navigate = useNavigate();
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
    if (onClick) onClick(); // Call the passed onClick if it exists
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative pb-[150%]">
        <img 
          src={posterUrl} 
          alt={movie.title} 
          className="absolute h-full w-full object-cover group-hover:opacity-90 transition-opacity"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500">⭐</span>
          <span className="ml-1 text-gray-700">
            {movie.vote_average?.toFixed(1)}/10
          </span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-500 text-sm">
            {movie.release_date?.substring(0, 4)}
          </span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;