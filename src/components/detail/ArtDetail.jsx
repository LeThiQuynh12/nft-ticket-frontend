import React from 'react';

import { fetchArtEvents } from '../../services/artApi';
import EventDetail from '../common/EventDetail';
import Header from '../home/Header';

export default function ArtDetail() {
  return (
    <div className="detail-page">
      <Header />
      <EventDetail 
        fetchEvents={fetchArtEvents} 
        category="art" 
      />
    </div>
  );
}