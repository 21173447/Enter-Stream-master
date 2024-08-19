import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [ContentData, setContentData] = useState({
    title: '',
    type: '', 
    description: '',
    country: '',
    date: '', 
    image: '', 
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchContent = async () => {
        try {
          const response = await fetch(`http://localhost:5000/${id}`);
          if (!response.ok) throw new Error('Content not found');
          const data = await response.json();
          setContentData({
            title: data.title,
            type: data.type,
            description: data.description,
            country: data.country,
            date: data.date,
            image: data.image,
          });
          setImagePreview(data.image);
        } catch (error) {
          console.error('Error fetching content:', error);
        }
      };
      fetchContent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === 'image' && type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result;
          setImagePreview(base64Image);
          setContentData((prevState) => ({
            ...prevState,
            image: base64Image,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setContentData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const endpoint = ContentData.type === 'movie' ? 'movies' : 'series';
    const url = isEditMode ? `http://localhost:5000/${endpoint}/${id}` : `http://localhost:5000/${endpoint}`;
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ContentData),
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Failed to save movie/series: ${errorText}`);
      }

      toast.success(`Movie/Series ${isEditMode ? 'updated' : 'added'} successfully`);
      navigate('/');
    } catch (error) {
      console.error('Error:', error.message); 
      toast.error('Failed to save movie/series');
    }
  };

  return (
    <section className="bg-white">
      <div className="container m-auto max-w-4xl py-24 flex">
        <div className="flex-shrink-1 w-1/3 p-50 py-40">
          <div className="bg-gray-200 h-[400px] w-[300px] flex items-center justify-center border border-gray-300 rounded-md">
            <img
              src={imagePreview || 'https://via.placeholder.com/400'}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <input
            type="file"
            name="image"
            className="mt-4 border rounded w-full py-2 px-3"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="w-2/3 p-4">
          <div className="bg-white px-6 py-8 mb-4 m-4 md:m-0 border-gray-300 rounded-md">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-center mb-6">{isEditMode ? 'Edit' : 'Add'} Movies/Series</h2>

              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 mb-2">
                  Movie/Series Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Movie / series name"
                  value={ContentData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="Movie/Series Description"
                  value={ContentData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="country" className="block text-gray-700 mb-2">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="border rounded w-full py-2 px-3"
                  value={ContentData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Country</option>
                  <option value="South Africa">South Africa</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Italy">Italy</option>
                  <option value="Spain">Spain</option>
                  <option value="India">India</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="China">China</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Chile">Chile</option>
                  <option value="Peru">Peru</option>
                  <option value="Russia">Russia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Kenya">Kenya</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Norway">Norway</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Finland">Finland</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Austria">Austria</option>
                  <option value="Greece">Greece</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Poland">Poland</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Israel">Israel</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Jordan">Jordan</option>
                
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  className="border rounded w-full py-2 px-3"
                  placeholder="2024/08/01"
                  value={ContentData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex justify-center gap-8 p-9">
                <div>
                  <input
                    type="radio"
                    id="movie"
                    name="type"
                    value="movie"
                    className="mr-1 accent-blue-500"
                    checked={ContentData.type === 'movie'}
                    onChange={handleChange}
                  />
                  <label htmlFor="movie">Movie</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="series"
                    name="type"
                    value="series"
                    className="mr-1 accent-blue-500"
                    checked={ContentData.type === 'series'}
                    onChange={handleChange}
                  />
                  <label htmlFor="series">Series</label>
                </div>
              </div>

              <div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {isEditMode ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddContent;
