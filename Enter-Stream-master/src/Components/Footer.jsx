
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-100'>
      <nav className="flex justify-between items-center w-[90%] mx-auto py-8 text-2xl">
        <div className='text-gray-600 font-bold'>
          Enter-Stream
        </div>

        <div className="nav-links duration-500 md:static absolute md:min-h-fit min-h-[60vh] left-0 md:top-auto top-[-100%] md:w-auto">
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <a className="hover:text-gray-500 text-black text-sm" href="#">
                MOVIES
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500 text-black text-sm" href="#">
                SERIES
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <h5 className="text-black px-5 py-1 hover:bg-[#87acec] text-sm">
            SUBSCRIBE
          </h5>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
