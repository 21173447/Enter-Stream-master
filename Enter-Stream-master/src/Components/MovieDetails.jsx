import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:5000/movies/${id}`);
        if (!response.ok) throw new Error('Movie not found');
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/movie/${id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/movies/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete movie');
      navigate('/movies');
    } catch (error) {
      console.error('Error deleting movie:', error);
      alert('Failed to delete the movie.');
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="flex justify-center p-4 py-10">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg p-4">
        <div className="flex-shrink-0 w-full md:w-1/2 mb-4 md:mb-0">
          <img
            src={movie.poster}
            className="w-full h-auto object-cover rounded-md"
            alt={movie.title}
          />
        </div>
        <div className="flex-1 md:ml-6">
          <h1 className="text-6xl font-bold mb-20">{movie.title}</h1>
          <p className="text-gray-700 text-lg mb-2">{movie.description}</p>
          <p className="text-gray-700 text-lg mb-2"><strong>Type:</strong> {movie.type}</p>
          <p className="text-gray-700 text-lg mb-2"><strong>Country:</strong> {movie.country}</p>
          <p className="text-gray-700 text-lg mb-2"><strong>Year:</strong> {movie.year}</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full border-none"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full border-none"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
