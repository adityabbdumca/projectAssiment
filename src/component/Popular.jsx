import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MoviePoster from './MoviePoster';

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${currentPage}`
      );
      const data = response.data;
      setMovies(data.results);
      setTotalPages(data.total_pages); // Set the total pages from the response
      setLoading(false); // Stop loading
    } catch (err) {
      setError('Failed to fetch popular movies');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, [currentPage]);

  // Handle previous and next page button clicks
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Go to the previous page
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Go to the next page
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='flex flex-col justify-center'>
      {/* Grid container with responsive design */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          width: '90%',
          margin: '0 auto',
        }}
      >
        {movies.map((movie) => (
          <MoviePoster
            movieId={movie.id}
            key={movie.id}
            title={movie.title}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            rating={movie.vote_average}
          />
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="my-7 mx-auto flex justify-center items-center">
        <button
          style={{ backgroundColor: 'red', marginRight: '1rem' }}
          onClick={handlePrevious}
          disabled={currentPage === 1}
           className="px-5 py-2.5 bg-indigo-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-indigo-700 transition-all duration-200"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={{ backgroundColor: 'green', marginLeft: '1rem' }}
          onClick={handleNext}
          disabled={currentPage === totalPages}
           className="px-5 py-2.5 bg-green-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 transition-all duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Popular;
