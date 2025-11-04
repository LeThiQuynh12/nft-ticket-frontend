// src/pages/MusicPage.jsx
import React, {
  useEffect,
  useState,
} from 'react';

import eventApi from '../api/eventApi.js';
import EventList from '../components/common/EventList.jsx';
import Header from '../components/home/Header.jsx';

export default function MusicPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API khi trang được load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // 🔥 Gọi API theo danh mục “ca-nhac” (slug trong DB)
        const res = await eventApi.getEventsByCategory("ca-nhac");
        const data = res.events || res; // tùy backend trả về dạng nào
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
        console.error("Lỗi tải sự kiện CA NHẠC:", err);
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
        title="CA NHẠC" 
        fetchEvents={() => Promise.resolve(events)} // ✅ nạp dữ liệu đã fetch sẵn
        category="music" 
      />
    </div>
  );
}
