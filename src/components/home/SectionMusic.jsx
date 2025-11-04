import React, {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import eventApi from '../../api/eventApi';
import EventCard from './EventCard';
import SectionTitle from './SectionTitle';

export default function SectionMusic() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Gọi API lấy danh sách sự kiện theo danh mục "CA NHẠC"
        const res = await eventApi.getEventsByCategory('ca-nhac');
        setEvents(res.events || []); // backend trả { events: [...] }
      } catch (error) {
        console.error('Lỗi khi tải sự kiện CA NHẠC:', error);
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
      <SectionTitle title="CA NHẠC" />
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
                banner: `http://localhost:5003${ev.coverImage}`,
                date: ev.startAt,
                location: ev.location?.province,
                price: ev.ticketTypes?.[0]?.price,
              }}
              onView={() => navigate(`/music/${ev._id}`)}
            />
          ))
        )}
      </div>
    </section>
  );
}
