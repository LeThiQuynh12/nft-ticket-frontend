import React from 'react';

import EventList from '../components/common/EventList';
import Header from '../components/home/Header';
import { fetchWorkshopEvents } from '../services/workshopApi';

export default function WorkshopPage() {
  return (
    <div className="page-container">
      <Header />
      <EventList 
        title="WORKSHOP" 
        fetchEvents={fetchWorkshopEvents} 
        category="workshop" 
      />
    </div>
  );
}