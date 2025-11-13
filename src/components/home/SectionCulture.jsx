import React, {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import eventApi from '../../api/eventApi';
import EventCard from './EventCard';
import SectionTitle from './SectionTitle';

export default function SectionCulture() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy base URL từ .env
  const API_PUBLIC = import.meta.env.VITE_API_PUBLIC_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Gọi API lấy danh sách sự kiện theo danh mục "VĂN HOÁ NGHỆ THUẬT"
        const res = await eventApi.getEventsByCategory('van-hoa-nghe-thuat');
        setEvents(res.events || []);
      } catch (error) {
        console.error('Lỗi khi tải sự kiện VĂN HOÁ NGHỆ THUẬT:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p style={{ color: '#fff', padding: '16px' }}>Đang tải dữ liệu...</p>;
  }

  return (
    <section className="section">
      <SectionTitle title="VĂN HOÁ NGHỆ THUẬT" />
      <div className="event-grid">
        {events.length === 0 ? (
          <p style={{ color: '#fff', padding: '16px' }}>Chưa có sự kiện nào</p>
        ) : (
          events.map((ev) => (
            <EventCard
              key={ev._id}
              ev={{
                id: ev._id,
                title: ev.name,
                banner: `${API_PUBLIC}${ev.coverImage}`,
                date: ev.startAt,
                location: ev.location?.province,
                price: ev.ticketTypes?.[0]?.price,
              }}
              onView={() => navigate(`/art/${ev._id}`)}
            />
          ))
        )}
      </div>
    </section>
  );
}
