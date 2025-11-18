import './EventDetail.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  FaCalendarAlt,
  FaEnvelope,
  FaEye,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from 'react-icons/fa';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

export default function EventDetail({ event, category }) {
  const navigate = useNavigate();

  if (!event) {
    return (
      <div className="loading">
        <p>Đang tải thông tin sự kiện...</p>
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Format datetime
  const formatDate = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()} ${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  const startTime = formatDate(event.startAt);
  const endTime = formatDate(event.endAt);
  const saleStart = formatDate(event.saleStartAt);
  const saleEnd = formatDate(event.saleEndAt);

  // ✅ Gallery Auto Slide
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!event.gallery || event.gallery.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === event.gallery.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [event.gallery]);

const handleBuyNow = () => 
  navigate(`/booking/${event.id}`, { state: { event } });


  return (
    <div className="detail-container">
      {/* ✅ Banner */}
      <div className="detail-banner">
        <img src={event.banner} alt={event.title} />
        <div className="overlay" />
        <div className="detail-title">{event.title}</div>
      </div>

      <div className="detail-content">
        <div className="detail-left">
          <h2 className="event-heading">{event.title}</h2>

          {/* ✅ Time */}
          <p className="event-date">
            <FaCalendarAlt /> {startTime} → {endTime}
          </p>

          {/* ✅ Location */}
          <p className="event-location">
            <FaMapMarkerAlt /> {event.locationFull}
          </p>

          {/* ✅ Buy Button + Views */}
          <div className="action-row">
            <button className="btn-buy" onClick={handleBuyNow}>
              MUA NGAY / BUY NOW
            </button>
            <span className="views">
              <FaEye /> {event.views?.toLocaleString("vi-VN") || 0} lượt xem
            </span>
          </div>



          {/* ✅ Description */}
          <div className="description-section">
            <h3>GIỚI THIỆU VỀ SỰ KIỆN</h3>
            <div
              className="desc-text"
              dangerouslySetInnerHTML={{
                __html: event.description?.replace(/\n/g, "<br/>") || "",
              }}
            />
          </div>

          {/* ✅ Gallery Slider */}
          {event.gallery && event.gallery.length > 0 && (
            <div className="gallery-section">
              <h3>HÌNH ẢNH SỰ KIỆN</h3>
              <div className="gallery-slider">
                {event.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`gallery-${idx}`}
                    className={`gallery-slide ${
                      idx === currentSlide ? "active" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ✅ Seatmap */}
          {event.seatMap && (
            <div className="seatmap-container">
              <h4>SƠ ĐỒ VỊ TRÍ GHẾ</h4>
              <img
                src={event.seatMap}
                alt="Seat Map"
                className="seatmap-image"
              />
            </div>
          )}

          {/* ✅ Ticket table */}
          <div className="ticket-section">
            <h3>BẢNG GIÁ VÉ</h3>
            <ul>
              {event.ticketInfo.map((t, i) => (
                <li key={i}>
                  {t.type}: {t.price.toLocaleString("vi-VN")}₫
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Contact */}
          <div className="contact-box">
            <h3>LIÊN HỆ</h3>
            <p>
              <FaEnvelope /> Email: {event.email}
            </p>
            <p>
              <FaPhoneAlt /> {event.hotline?.join(" - ")}
            </p>

            {/* ✅ Organizer */}
            <div className="organizer">
              {event.organizerLogo && (
                <img
                  className="organizer-logo"
                  src={event.organizerLogo}
                  alt="Organizer Logo"
                />
              )}
              <div className="organizer-info">
                <strong>{event.organizer}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Sidebar */}
        <div className="detail-right">
          <div className="ticket-box">
            <h4>Đặt vé ngay</h4>
            <button className="btn-buy" onClick={handleBuyNow}>
              MUA VÉ NGAY
            </button>
            <Link to={`/${category}`} className="back-link">
              ← Quay lại danh sách
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
