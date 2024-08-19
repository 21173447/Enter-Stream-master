import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AllSeries = () => {
  const [series, setSeries] = useState([]);
  const [visibleSeries, setVisibleSeries] = useState(8); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/series');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setSeries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggle = () => {
    if (location.pathname === '/series') {
    
      return;
    } else {
   
      navigate('/series');
    }
  };

  const handleSeriesClick = (id) => {
    navigate(`/series/${id}`);
  };

  const handleAddClick = () => {
    navigate('/add-content');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="p-4">
      <div className="flex flex-col justify-between items-center w-[90%] mx-[5%] py-8 text-2xl relative z-10">
        <h5 className="text-4xl">LATEST SERIES</h5>
        {location.pathname === '/series' && (
          <button
            onClick={handleAddClick}
            className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 absolute top-4 right-4"
          >
            ADD
          </button>
        )}
      </div>

      <div className='flex flex-col items-center'>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 py-40">
        {series.length === 0 ? (
          <p>No series available</p>
        ) : (
          series.slice(0, location.pathname === '/series' ? series.length : visibleSeries).map((serie) => (
            <div
              key={serie.id}
              className="flex justify-center items-center p-2  cursor-pointer"
              onClick={() => handleSeriesClick(serie.id)}
            >
              <img
                src={serie.poster}
                alt={serie.title}
                className="w-full h-auto max-w-[700px] max-h-[280px] object-cover  shadow-md"
              />
            </div>
          ))
        )}
      </div>


      </div>
     


      <div className="flex justify-end">
  {location.pathname !== '/series' && (
    <button
      onClick={handleToggle}
      className="w-20 h-12 flex items-center justify-center bottom-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
    >
      More
    </button>
  )}
</div>


   
    </section>
  );
};

export default AllSeries;
