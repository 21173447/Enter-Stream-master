import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/HomePage';
import AllMovies from '../Components/AllMovies';
import AllSeries from '../Components/AllSeries';
import MovieDetails from '../Components/MovieDetails';
import SeriesDetails from '../Components/SeriesDetails';
import EditMovie from '../Components/EditMovie'; 
import EditSeries from '../Components/EditSeries';
import AddContent from '../Components/AddContent'; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<AllMovies />} />
      <Route path="/series" element={<AllSeries />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/series/:id" element={<SeriesDetails />} />
      <Route path="/edit/movie/:id" element={<EditMovie />} /> 
      <Route path="/edit/series/:id" element={<EditSeries />} />
      <Route path="/add-content" element={<AddContent />} />
    
    </Routes>
  );
};

export default AppRoutes;
