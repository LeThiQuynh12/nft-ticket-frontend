import React, {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import eventApi from '../../api/eventApi';
import EventCard from './EventCard';
import SectionTitle from './SectionTitle';

export default function SectionOther() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Slug các danh mục đã liệt kê
  const excludedCategories = ['ca-nhac', 'du-lich', 'van-hoa-nghe-thuat','work-shop'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Lấy tất cả event
        const res = await eventApi.getEvents();
        const allEvents = res.data?.events || res.events || [];

        // Lọc ra sự kiện không thuộc 3 category trên
        const filtered = allEvents.filter(
          (ev) => !excludedCategories.includes(ev?.category?.slug)
        );

        setEvents(filtered);
      } catch (error) {
        console.error('Lỗi khi tải SỰ KIỆN KHÁC:', error);
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
      <SectionTitle title="SỰ KIỆN KHÁC" />
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
              onView={() => navigate(`/event/${ev._id}`)}
            />
          ))
        )}
      </div>
    </section>
  );
}
