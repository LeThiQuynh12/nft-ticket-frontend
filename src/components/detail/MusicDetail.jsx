import React from 'react';

import { fetchMusicEvents } from '../../services/musicApi';
import EventDetail from '../common/EventDetail';
import Header from '../home/Header';

export default function MusicDetail() {
  return (
    <div className="detail-page"> {/* Wrapper nếu cần */}
      <Header />
      <EventDetail 
        fetchEvents={fetchMusicEvents} 
        category="music" 
      />
    </div>
  );
}