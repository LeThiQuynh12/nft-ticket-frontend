import React from 'react';

import { fetchMovieEvents } from '../../services/movieApi';
import EventDetail from '../common/EventDetail';
import Header from '../home/Header';

export default function MovieDetail() {
  return (
    <div className="detail-page">
      <Header />
      <EventDetail 
        fetchEvents={fetchMovieEvents} 
        category="movie" 
      />
    </div>
  );
}