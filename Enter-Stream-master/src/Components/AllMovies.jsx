import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(8); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/movies');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggle = () => {
    if (location.pathname === '/movies') {
     
      return;
    } else {

      navigate('/movies');
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const handleAddClick = () => {
    navigate('/add-content');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="p-4">
      <div className="flex flex-col justify-between items-center w-[90%] mx-[5%] py-8 text-2xl relative z-10">
        <h5 className="text-xl">LATEST MOVIES</h5>
        {location.pathname === '/movies' && (
          <div className="ml-auto">
            <button
              onClick={handleAddClick}
              className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
            >
              ADD
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0 py-40">
        {movies.length === 0 ? (
          <p>No movies available</p>
        ) : (
          movies.slice(0, location.pathname === '/movies' ? movies.length : visibleMovies).map((movie) => (
            <div
              key={movie.id}
              className="flex justify-center items-center p-2 cursor-pointer"
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-auto max-w-[150px] max-h-[225px] object-cover  shadow-md"
              />
            </div>
          ))
        )}
      </div >

      <div className='flex justify-end'>
  {location.pathname !== '/movies' && (
    <button
      onClick={handleToggle}
      className="w-20 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600"
    >
      More
    </button>
  )}
</div>

 
    </section>
  );
};

export default AllMovies;
