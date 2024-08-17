import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SeriesDetails = () => {
  const [series, setSeries] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(`http://localhost:5000/series/${id}`);
        if (!response.ok) throw new Error('Series not found');
        const data = await response.json();
        setSeries(data);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeries();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/series/${id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/series/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete series');
      navigate('/series');
    } catch (error) {
      console.error('Error deleting series:', error);
      alert('Failed to delete the series.');
    }
  };

  if (!series) return <div>Loading...</div>;

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row p-4">
        <div className="flex-shrink-0 w-full md:w-1/2 mb-4 md:mb-0">
          <img src={series.poster} className="w-full h-auto object-cover rounded-md" alt={series.title} />
        </div>
        <div className="flex-1 md:ml-4">
          <h1 className="text-3xl font-bold mb-2">{series.title}</h1>
          <p className="text-gray-700 mb-4">{series.description}</p>
          <table className="mb-4">
            <tbody>
              <tr><td className="font-medium text-gray-600">Type:</td><td>{series.type}</td></tr>
              <tr><td className="font-medium text-gray-600">Country:</td><td>{series.country}</td></tr>
              <tr><td className="font-medium text-gray-600">Year:</td><td>{series.year}</td></tr>
            </tbody>
          </table>
          <div className="flex gap-4">
            <button 
              onClick={handleEdit} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
            >
              Edit
            </button>
            <button 
              onClick={handleDelete} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
