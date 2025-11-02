import React from 'react';

import EventCard from './EventCard';
import SectionTitle from './SectionTitle';

export default function SectionOther({ events }) {
  return (
    <section className="section">
      <SectionTitle title="SỰ KIỆN KHÁC" />
      <div className="event-grid">
        {events.map((ev) => (
          <EventCard key={ev.id} ev={ev} onView={() => alert(ev.title)} />
        ))}
      </div>
    </section>
  );
}
