import React, {
  useEffect,
  useState,
} from 'react';

import eventApi from '../api/eventApi.js';
import EventList from '../components/common/EventList.jsx';
import Header from '../components/home/Header.jsx';

export default function MoviePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieEvents = async () => {
      try {
       
        const res = await eventApi.getEventsByCategory("ve-xem-phim");
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
        console.error("Lỗi tải sự kiện VÉ XEM PHIM:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieEvents();
  }, []);

  if (loading) {
    return <p style={{ color: "#fff", padding: "16px" }}>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="page-container">
      <Header />
      <EventList 
        title="VÉ XEM PHIM"
        fetchEvents={() => Promise.resolve(events)} // ✅ trả dữ liệu đã fetch
        category="movie"
      />
    </div>
  );
}
