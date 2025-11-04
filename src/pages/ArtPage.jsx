// src/pages/ArtPage.jsx
import React, {
  useEffect,
  useState,
} from 'react';

import eventApi from '../api/eventApi';
import EventList from '../components/common/EventList';
import Header from '../components/home/Header';

export default function ArtPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // ✅ Gọi API theo danh mục “van-hoa-nghe-thuat” (slug phải đúng backend)
        const res = await eventApi.getEventsByCategory("van-hoa-nghe-thuat");
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
        console.error("Lỗi tải sự kiện VĂN HÓA NGHỆ THUẬT:", err);
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
        title="VĂN HÓA NGHỆ THUẬT"
        fetchEvents={() => Promise.resolve(events)}
        category="art"
      />
    </div>
  );
}
