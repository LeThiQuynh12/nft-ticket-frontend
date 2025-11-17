import '../../styles/SectionHighlight.css';

import React, {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import eventApi from '../../api/eventApi';
import SectionTitle from './SectionTitle';

export default function SectionHighlight() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await eventApi.getEventsByCategory('ca-nhac');
        setEvents(res.events || []);
      } catch (error) {
        console.error('Lỗi khi tải sự kiện nổi bật (ca-nhac):', error);
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
    <section className="highlight-section">
      <SectionTitle title="CA NHẠC" />
      <div className="highlight-grid">
        {events.slice(0, 4).map((ev) => {
          const d = new Date(ev.startAt);
          const day = d.getDate();
          const month = d.toLocaleString("vi-VN", { month: "short" });

          return (
            <div
              key={ev._id}
              className="highlight-card"
              onClick={() => navigate(`/music/${ev._id}`)}
            >
              <div className="highlight-image-wrapper">
                <img
             src={ev.coverImage}
                  alt={ev.name}
                  className="highlight-image"
                />

                <div className="highlight-date">
                  <div className="highlight-day">{day}</div>
                  <div className="highlight-month">{month}</div>
                </div>
                <div className="highlight-overlay"></div>
              </div>

              <div className="highlight-content">
                <h3 className="highlight-title">{ev.name}</h3>
                <div className="highlight-meta">
                  <span>{ev.location?.province}</span> • 👁 {ev.views || 0}
                </div>
                <div className="highlight-footer">
                  <button className="highlight-btn">Xem chi tiết</button>
                  <span className="highlight-price">
                    {ev.ticketTypes?.[0]?.price
                      ? ev.ticketTypes[0].price.toLocaleString("vi-VN") + "đ"
                      : "Miễn phí"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
