
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import img from '../Images/Rectangle 1.png';

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;


  const titles = {
   
    '/movies': 'LATEST MOVIES',
    '/series': 'LATEST SERIES',
    '/add-content': 'ADD A MOVIE/SERIES'


  };

  const pageTitle = titles[currentPath] || '';

  return (
    <header
      className="bg-cover bg-center h-96 relative"
      style={{ backgroundImage: `url(${img})` }}
    >
      <nav className="flex flex-col justify-between items-center w-[90%] mx-[5%] py-8 text-2xl relative z-10">
        <div className="flex justify-between w-full">
          <Link to="/" className="">
            <span className="text-blue-500">Enter-</span>
            <span className="text-white">Stream</span>
          </Link>

          <div className="nav-links duration-500 md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto">
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
              <li>
                <Link className="hover:text-gray-500 text-lg text-white" to="/movies">
                  MOVIES
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-500 text-lg text-white" to="/series">
                  SERIES
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-6">
            <button className="bg-blue-500 text-white px-5 py-1 rounded-full hover:bg-[#87acec] text-xl">
              SUBSCRIBE
            </button>

          </div>
        </div>

        <div className=" mr-9 text-3xl text-white py-20">{pageTitle}</div>
      </nav>
    </header>
  );
};

export default NavBar;
