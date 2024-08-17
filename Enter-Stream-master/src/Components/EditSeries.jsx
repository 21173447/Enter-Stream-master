import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditSeries = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(`http://localhost:5000/series/${id}`);
        if (!response.ok) throw new Error('Series not found');
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setCountry(data.country);
        setYear(data.year);
        setPoster(data.poster);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeries();
  }, [id]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPoster(reader.result); 
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/series/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          country,
          year,
          poster,
        }),
      });
      if (!response.ok) throw new Error('Failed to update series');
      toast.success('Series Updated Successfully');
      navigate(`/series/${id}`);
    } catch (error) {
      console.error('Error updating series:', error);
      toast.error('Failed to update the series.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Edit Series</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md"
            placeholder="Series Title"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md"
            rows="4"
            placeholder="Description"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md"
            placeholder="Country"
            required
          />
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md"
            placeholder="Year"
            required
          />
        </div>

        <div>
          <label htmlFor="poster" className="block text-sm font-medium text-gray-700">Poster Image:</label>
          {poster && (
            <div className="mb-2">
              <img
                src={poster}
                alt="Series Poster"
                className="w-32 h-auto object-cover rounded-md"
              />
            </div>
          )}
          <input
            type="file"
            id="poster"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditSeries;
