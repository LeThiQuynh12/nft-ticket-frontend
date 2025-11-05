// src/pages/WorkshopPage.jsx
import React, {
  useEffect,
  useState,
} from 'react';

import eventApi from '../api/eventApi';
import EventList from '../components/common/EventList';
import Header from '../components/home/Header';

export default function WorkshopPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // ✅ Gọi API theo slug `workshop`
        const res = await eventApi.getEventsByCategory("work-shop");
        const data = res.events || res;

        setEvents(
          data.map((ev) => ({
            id: ev._id,
            title: ev.name,
            banner: `http://localhost:5003${ev.coverImage}`,
            date: ev.startAt,
            location: ev.location?.province || "Chưa rõ",
            price: ev.ticketTypes?.[0]?.price || 0,
            views: ev.views || 0,
          }))
        );
      } catch (err) {
        console.error("Lỗi tải sự kiện WORKSHOP:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p style={{ color: "#fff", padding: "16px" }}>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="page-container">
      <Header />
      <EventList
        title="WORKSHOP"
        fetchEvents={() => Promise.resolve(events)}
        category="workshop"
      />
    </div>
  );
}
