import React from 'react';

import EventList from '../components/common/EventList.jsx';
import Header from '../components/home/Header.jsx';
import { fetchMusicEvents } from '../services/musicApi.js';

export default function MusicPage() {
  return (
    <div className="page-container">
      <Header />
      <EventList 
        title="CA NHẠC" 
        fetchEvents={fetchMusicEvents} 
        category="music" 
      />
    </div>
  );
}