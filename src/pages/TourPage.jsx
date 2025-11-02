import React from 'react';

import EventList from '../components/common/EventList';
import Header from '../components/home/Header';
import { fetchTourEvents } from '../services/tourApi';

export default function TourPage() {
  return (
    <div className="page-container">
      <Header />
      <EventList 
        title="VÉ THAM QUAN" 
        fetchEvents={fetchTourEvents} 
        category="tour" 
      />
    </div>
  );
}