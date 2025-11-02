import React from 'react';

import EventList from '../components/common/EventList';
import Header from '../components/home/Header';
import { fetchSportEvents } from '../services/sportApi';

export default function SportPage() {
  return (
    <div className="page-container">
      <Header />
      <EventList 
        title="THỂ THAO" 
        fetchEvents={fetchSportEvents} 
        category="sport" 
      />
    </div>
  );
}