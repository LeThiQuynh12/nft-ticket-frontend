// src/components/music/SectionMusic.jsx
import React from 'react';

import { useNavigate } from 'react-router-dom';

import EventCard from './EventCard';
import SectionTitle from './SectionTitle';

export default function SectionMusic({ events }) {
  const navigate = useNavigate();

  return (
    <section className="section">
      <SectionTitle title="CA NHẠC" />
      <div className="event-grid">
        {events.map((ev) => (
          <EventCard
            key={ev.id}
            ev={ev}
            onView={() => navigate(`/music/${ev.id}`)} 
          />
        ))}
      </div>
    </section>
  );
}
