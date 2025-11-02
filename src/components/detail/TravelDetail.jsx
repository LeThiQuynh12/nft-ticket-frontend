import React from 'react';

import { fetchTravelEvents } from '../../services/travelApi';
import EventDetail from '../common/EventDetail';
import Header from '../home/Header';

export default function TravelDetail() {
  return (
    <div className="detail-page">
      <Header />
      <EventDetail 
        fetchEvents={fetchTravelEvents} 
        category="travel" 
      />
    </div>
  );
}