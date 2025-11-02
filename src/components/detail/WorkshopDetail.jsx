import React from 'react';

import { fetchWorkshopEvents } from '../../services/workshopApi';
import EventDetail from '../common/EventDetail';
import Header from '../home/Header';

export default function WorkshopDetail() {
  return (
    <div className="detail-page">
      <Header />
      <EventDetail 
        fetchEvents={fetchWorkshopEvents} 
        category="workshop" 
      />
    </div>
  );
}