import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import MovieCard from "../components/MovieCard";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // All state declarations at the top
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]); // Your related movies state
  const [trendingMovies, setTrendingMovies] = useState([]); // Your trending movies state
  const [loading, setLoading] = useState(true);

  // Single useEffect for data fetching
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchAllData = async () => {
      try {
        setLoading(true);

        // 1. Fetch main movie details
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }`,
          { signal }
        );
        setMovie(movieResponse.data);

        // 2. Fetch trailer
        const videosResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }`,
          { signal }
        );
        const trailer = videosResponse.data.results.find(
          (v) => v.type === "Trailer" && v.official
        );
        setTrailerUrl(
          trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
        );

        // 3. Fetch related movies (your state)
        const relatedResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }`,
          { signal }
        );
        setRelatedMovies(relatedResponse.data.results.slice(0, 5));

        // 4. Fetch trending movies (your state)
        const trendingResponse = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }`,
          { signal }
        );
        setTrendingMovies(trendingResponse.data.results.slice(0, 5));
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    return () => controller.abort();
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!movie) return <div className="error">Movie not found</div>;
  return (
    <div className="bg-neutral-900 text-white min-h-screen max-w-7xl mx-auto px-4 py-8">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <div className="bg-neutral-800 rounded-lg overflow-hidden mb-8">
            <div className="relative pt-[56.25%] bg-neutral-900">
              <div className="absolute inset-0">
                {movie.video_url ? (
                  <ReactPlayer
                    url={"https://youtu.be/0mdjgQdQF1k?si=I9eMAIkxDfevQ7vE"}
                    width="100%"
                    height="100%"
                    controls={true}
                    playing={false}
                    light={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xl mb-4">Trailer not available</p>
                      <p className="text-gray-400">{movie.title}</p>
                    </div>
                  </div>
                )}
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
                  {movie.runtime} min |{" "}
                  {movie.genres.map((g) => g.name).join(", ")}
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
              {relatedMovies.map((movie) => (
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
