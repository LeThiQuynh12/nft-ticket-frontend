import '../../styles/MusicCard.css'; // Import MusicCard.css chung cho tất cả

import {
  useEffect,
  useState,
} from 'react';

import {
  FaEye,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function EventList({ title, fetchEvents, category }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, [fetchEvents]);

  return (
    <div className="music-page">
      <h2 className="music-title">{title}</h2>
      <div className="event-count">Tổng số: {events.length} sự kiện</div>

      <div className="music-grid">
        {events.map((ev) => {
          const d = new Date(ev.date);
          const day = String(d.getDate()).padStart(2, "0");
          const year = d.getFullYear();

          return (
            <div key={ev.id} className="music-card">
              <div className="music-banner">
                <img src={ev.banner} alt={ev.title} />
                <div className="music-date">
                  <div className="month">Tháng {d.getMonth() + 1}</div>
                  <div className="day">{day}</div>
                  <div className="year">{year}</div>
                </div>
              </div>

              <div className="music-info">
                <div className="music-stats">
                  <span>
                    <FaEye /> {ev.views.toLocaleString("vi-VN")}
                  </span>
                  <span>
                    <FaMapMarkerAlt /> {ev.location}
                  </span>
                  <span className="music-price">
                    {ev.price.toLocaleString("vi-VN")}₫
                  </span>
                </div>
                <div className="music-desc">
                  <Link to={`/${category}/${ev.id}`} className="music-link">
                    {ev.title}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}