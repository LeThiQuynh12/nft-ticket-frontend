import React, {
  useEffect,
  useState,
} from 'react';

import eventApi from '../api/eventApi.js';
import EventList from '../components/common/EventList.jsx';
import Header from '../components/home/Header.jsx';

export default function SportPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSportEvents = async () => {
      try {
        // 🔥 Gọi API theo slug “the-thao”
        const res = await eventApi.getEventsByCategory("the-thao");
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
        console.error("Lỗi tải sự kiện THỂ THAO:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSportEvents();
  }, []);

  if (loading) {
    return <p style={{ color: "#fff", padding: "16px" }}>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="page-container">
      <Header />
      <EventList 
        title="THỂ THAO"
        fetchEvents={() => Promise.resolve(events)} // ✅ trả data đã fetch
        category="sport"
      />
    </div>
  );
}
