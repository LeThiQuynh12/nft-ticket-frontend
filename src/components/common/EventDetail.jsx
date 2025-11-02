import './EventDetail.css'; // Import CSS chung

import {
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
  useParams,
} from 'react-router-dom';

export default function EventDetail({ fetchEvents, category }) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchEvents().then((data) => {
      const found = data.find((ev) => ev.id === parseInt(id));
      setEvent(found);
    });
  }, [id, fetchEvents]);

  if (!event)
    return (
      <div className="loading">
        <p>Đang tải thông tin sự kiện...</p>
      </div>
    );

  const d = new Date(event.date);
  const dateStr = `Ngày ${d.getDate().toString().padStart(2, "0")} Tháng ${
    d.getMonth() + 1
  } Năm ${d.getFullYear()}`;

  const handleBuyNow = () => {
    navigate('/booking', { state: { event } });
  };
  return (
    <div className="detail-container">
      <div className="detail-banner">
        <img src={event.banner} alt={event.title} />
        <div className="overlay" />
        <div className="detail-title">{event.title}</div>
      </div>

      <div className="detail-content">
        <div className="detail-left">
          {/* Thông tin cơ bản */}
          <h2 className="event-heading">{event.title}</h2>
          <p className="event-time">{event.time}</p>
          <p className="event-date">
            <FaCalendarAlt /> {dateStr}
          </p>
          <p className="event-location">
            <FaMapMarkerAlt /> {event.location}
          </p>

          <div className="action-row">
            <button className="btn-buy" onClick={handleBuyNow}>MUA NGAY / BUY NOW</button>
            <span className="views">
              <FaEye /> {event.views.toLocaleString("vi-VN")} lượt xem
            </span>
          </div>

          {/* Giới thiệu sự kiện */}
          <div className="description-section">
            <h3>GIỚI THIỆU VỀ SỰ KIỆN</h3>
            <div
              className="desc-text"
              dangerouslySetInnerHTML={{
                __html: event.description.replace(/\n/g, "<br/>"),
              }}
            />

            {/* Ảnh sơ đồ vị trí ghế */}
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
          </div>

          {/* Bảng giá vé */}
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

          {/* Quà tặng */}
          <div className="gift-section">
            <h3>QUÀ TẶNG TỪNG HẠNG VÉ</h3>
            <ul>
              {event.gifts.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>

          {/* Lưu ý giao vé */}
          <div className="note-section">
            <h3>LƯU Ý KHI ĐẶT VÉ</h3>
            <p>
              <strong>Vui lòng điền đầy đủ địa chỉ giao vé</strong> để ship vé
              tận nơi.
            </p>
            <p>
              + Ban tổ chức sẽ ship vé cứng đến địa chỉ quý khách cung cấp khi
              đặt mua vé.
            </p>
            <p>+ Chi phí ship dựa trên khoảng cách địa lý.</p>
          </div>

          {/* Liên hệ */}
          <div className="contact-box">
            <h3>LIÊN HỆ CHĂM SÓC KHÁCH HÀNG</h3>
            <p>
              <FaEnvelope /> Email: {event.email}
            </p>
            <p>
              <FaPhoneAlt /> {event.hotline.join(" - ")}
            </p>
            <p className="hotline">
              Hotline hỗ trợ mua vé: {event.hotline.join(" - ")}
            </p>
            <div className="organizer">
              Đơn vị tổ chức: <strong>{event.organizer}</strong>
            
            </div>
              <img
                src={event.organizerLogo}
                alt="Logo tổ chức"
                style={{width: "150px" , height: "100px"}}
              />
          </div>
        </div>

        <div className="detail-right">
          <div className="ticket-box">
            <h4>Đặt vé ngay</h4>
            <button className="btn-buy" onClick={handleBuyNow} >MUA VÉ NGAY</button>
            <Link to={`/${category}`} className="back-link">
              ← Quay lại danh sách
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}