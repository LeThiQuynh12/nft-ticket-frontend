import '../styles/MusicCard.css';

import React from 'react';

import EventList from '../components/common/EventList';
import Header from '../components/home/Header';
import { fetchArtEvents } from '../services/artApi';

export default function ArtPage() {
  return (
    <div className="page-container">
      <Header />
      <EventList
        title="VĂN HÓA NGHỆ THUẬT"
        fetchEvents={fetchArtEvents}
        category="art"
      />
    </div>
  );
}
