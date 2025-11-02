import React from 'react';

import EventCard from './EventCard';
import SectionTitle from './SectionTitle';

export default function SectionTravel({ events }) {
  return (
    <section className="section">
      <SectionTitle title="THAM QUAN" />
      <div className="event-grid">
        {events.map((ev) => (
          <EventCard key={ev.id} ev={ev} onView={() => alert(ev.title)} />
        ))}
      </div>
    </section>
  );
}
