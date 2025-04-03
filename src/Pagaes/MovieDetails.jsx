import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch main movie details
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        setMovie(movieResponse.data);

        // Fetch related movies
        const relatedResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        setRelatedMovies(relatedResponse.data.results.slice(0, 5));

        // Fetch trending movies for sidebar
        const trendingResponse = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        setTrendingMovies(trendingResponse.data.results.slice(0, 5));

      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center py-10">Movie not found</div>;
  }

  return (
    <div className="bg-neutral-900 text-white min-h-screen max-w-7xl mx-auto px-4 py-8">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Main Content (Left Side) */}
        <div className="lg:w-3/4">
          {/* Movie Player Section */}
          <div className="bg-neutral-800 rounded-lg overflow-hidden mb-8">
            <div className="relative pt-[56.25%] bg-neutral-900">
              {/* Placeholder for video player - replace with actual player */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl mb-4">Movie Player Placeholder</p>
                  <p className="text-gray-400">{movie.title}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2">
                {movie.title} ({movie.release_date.substring(0, 4)})
              </h1>
              <div className="flex items-center mb-4">
                <span className="bg-neutral-600 px-2 py-1 rounded mr-2 text-sm">
                  {movie.vote_average.toFixed(1)}/10
                </span>
                <span className="text-gray-400">
                  {movie.runtime} min | {movie.genres.map(g => g.name).join(', ')}
                </span>
              </div>
              <p className="text-gray-300">{movie.overview}</p>
            </div>
          </div>

          {/* Related Videos Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
              Related Videos
              <button className="text-blue-400 text-sm">See all &gt;</button>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {relatedMovies.map(movie => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trending*/}
        <div className="lg:w-1/4">
          <div className="bg-neutral-600 rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">TRENDS NOW</h2>
            <div className="space-y-4">
              {trendingMovies.map((movie, index) => (
                <div 
                  key={movie.id} 
                  className="flex items-center justify-between hover:bg-neutral-700 p-2 rounded cursor-pointer"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <div>
                    <p className="font-medium">{movie.title}</p>
                    <p className="text-sm text-gray-400">
                      {movie.release_date.substring(0, 4)}
                    </p>
                  </div>
                  <span className="bg-green-500 text-xs px-2 py-1 rounded-full">
                    +1.{index + 2}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;