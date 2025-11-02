import React from 'react';

import EventList from '../components/common/EventList';
import Header from '../components/home/Header';
import { fetchMovieEvents } from '../services/movieApi';

export default function MoviePage() {
  return (
    <div className="page-container">
      <Header />
      <EventList 
        title="VÉ XEM PHIM" 
        fetchEvents={fetchMovieEvents} 
        category="movie" 
      />
    </div>
  );
}