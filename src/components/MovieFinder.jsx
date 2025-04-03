import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './MovieCard';

const MovieFinder = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const navigate = useNavigate();

  // Updated categories to match your image
  const categories = [
    'ALL',
    'ROMANCE', 
    'ACTION',
    'THRILLER',
    'HORROR',
    'ADVENTURE'
  ];

  const fetchMoviesByCategory = async (category) => {
    if (category === 'ALL') {
      fetchTrendingMovies();
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${getGenreId(category)}`
      );
      setMovies(response.data.results);
    } catch (err) {
      setError(`Failed to fetch ${category} movies`);
      console.error(`Error fetching ${category} movies:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const getGenreId = (category) => {
    const genreMap = {
      'ROMANCE': 10749,
      'ACTION': 28,
      'THRILLER': 53,
      'HORROR': 27,
      'ADVENTURE': 12
    };
    return genreMap[category] || '';
  };


  const fetchTrendingMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      setMovies(response.data.results);
    } catch (err) {
      setError('Failed to fetch trending movies');
      console.error('Error fetching trending movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const searchMovies = async () => {
    if (!searchQuery.trim()) {
      fetchTrendingMovies();
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${searchQuery}`
      );
      setMovies(response.data.results);
    } catch (err) {
      setError('Failed to search movies');
      console.error('Error searching movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">JJ-MOVIE-HUB</h1>
        <p className="text-lg text-gray-600">
          Discover trending movies or search for your favorites
        </p>
      </div>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchMovies()}
          placeholder="Search for movies..."
          className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
        />
        <button
          onClick={searchMovies}
          disabled={isLoading}
          className="px-6 py-3 bg-neutral-200 text-neutral-950 rounded-lg hover:bg-neutral-700 transition-colors disabled:bg-neutral-400"
        >
          Search
        </button>
        <button
          onClick={fetchTrendingMovies}
          disabled={isLoading}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
        >
          Trending
        </button>
      </div>

      {/* Updated Category Section */}
      <div className="mb-8 flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              fetchMoviesByCategory(category);
            }}
            className={`
              px-5 py-2 rounded-full 
              text-sm font-medium uppercase
              transition-colors duration-200 cursor-pointer
              ${
                selectedCategory === category
                  ? 'bg-neutral-600 text-white shadow-md cursor-pointer'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
 {/* Status Messages */}
 {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Results Section */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">No movies found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieFinder;