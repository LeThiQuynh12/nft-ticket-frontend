import './EventDetail.css';

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

  // Nếu chưa có dữ liệu
  if (!event) {
    return (
      <div className="loading">
        <p>Đang tải thông tin sự kiện...</p>
      </div>
    );
  }

  const d = new Date(event.date);
  const dateStr = `Ngày ${d.getDate().toString().padStart(2, "0")} Tháng ${d.getMonth() + 1} Năm ${d.getFullYear()}`;

  const handleBuyNow = () => navigate("/booking", { state: { event } });

  return (
    <div className="detail-container">
      <div className="detail-banner">
        <img src={event.banner} alt={event.title} />
        <div className="overlay" />
        <div className="detail-title">{event.title}</div>
      </div>

      <div className="detail-content">
        <div className="detail-left">
          <h2 className="event-heading">{event.title}</h2>
          <p className="event-date">
            <FaCalendarAlt /> {dateStr}
          </p>
          <p className="event-location">
            <FaMapMarkerAlt /> {event.location}
          </p>

          <div className="action-row">
            <button className="btn-buy" onClick={handleBuyNow}>
              MUA NGAY / BUY NOW
            </button>
            <span className="views">
              <FaEye /> {event.views?.toLocaleString("vi-VN") || 0} lượt xem
            </span>
          </div>

          <div className="description-section">
            <h3>GIỚI THIỆU VỀ SỰ KIỆN</h3>
            <div
              className="desc-text"
              dangerouslySetInnerHTML={{
                __html: event.description?.replace(/\n/g, "<br/>") || "",
              }}
            />
          </div>

          {event.seatMap && (
            <div className="seatmap-container">
              <h4>SƠ ĐỒ VỊ TRÍ GHẾ</h4>
              <img
                src={event.seatMap}
                alt="Sơ đồ vị trí ghế"
                className="seatmap-image"
              />
            </div>
          )}

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

          <div className="contact-box">
            <h3>LIÊN HỆ</h3>
            <p>
              <FaEnvelope /> Email: {event.email}
            </p>
            <p>
              <FaPhoneAlt /> {event.hotline?.join(" - ")}
            </p>
            <div className="organizer">
              <strong>{event.organizer}</strong>
              {event.organizerLogo && (
                <img
                  src={event.organizerLogo}
                  alt="Logo tổ chức"
                  style={{ width: "150px", height: "100px" }}
                />
              )}
            </div>
          </div>
        </div>

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
