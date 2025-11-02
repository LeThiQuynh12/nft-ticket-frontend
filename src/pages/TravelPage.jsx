import React from 'react';

import EventList from '../components/common/EventList';
import Header from '../components/home/Header';
import { fetchTravelEvents } from '../services/travelApi';

export default function TravelPage() {
  return (
    <div className="page-container">
      <Header />
      <EventList 
        title="DU LỊCH" 
        fetchEvents={fetchTravelEvents} 
        category="travel" 
      />
    </div>
  );
}