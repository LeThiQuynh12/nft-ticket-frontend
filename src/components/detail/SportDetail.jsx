import React from 'react';

import { fetchSportEvents } from '../../services/sportApi';
import EventDetail from '../common/EventDetail';
import Header from '../home/Header';

export default function SportDetail() {
  return (
    <div className="detail-page">
      <Header />
      <EventDetail 
        fetchEvents={fetchSportEvents} 
        category="sport" 
      />
    </div>
  );
}