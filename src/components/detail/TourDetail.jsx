import React from 'react';

import { fetchTourEvents } from '../../services/tourApi';
import EventDetail from '../common/EventDetail';
import Header from '../home/Header';

export default function TourDetail() {
  return (
    <div className="detail-page">
      <Header />
      <EventDetail 
        fetchEvents={fetchTourEvents} 
        category="tour" 
      />
    </div>
  );
}