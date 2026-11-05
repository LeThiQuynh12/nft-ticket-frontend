import './EventDetail.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaEye,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
  FaStar,
  FaTicketAlt,
} from 'react-icons/fa';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

export default function EventDetail({ event, category }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Tự động chuyển ảnh gallery
  useEffect(() => {
    if (!event?.gallery?.length) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === event.gallery.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(timer);
  }, [event?.gallery]);

  if (!event) {
    return (
      <div className="loading">
        <p>Đang tải thông tin sự kiện...</p>
      </div>
    );
  }

  const formatDate = (value) => {
    if (!value) return '—';

    const d = new Date(value);

    if (Number.isNaN(d.getTime())) return '—';

    return `${d.getDate().toString().padStart(2, '0')}/${
      (d.getMonth() + 1).toString().padStart(2, '0')
    }/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

  const startTime = formatDate(event.startAt);
  const endTime = formatDate(event.endAt);

  const handleBuyNow = () => {
    navigate(`/booking/${event.id}`, { state: { event } });
  };

  return (
    <div className="detail-container">

      {/* BANNER */}
      <div className="detail-banner">
        <img src={event.banner} alt={event.title} />

        <div className="banner-overlay" />

        <div className="banner-content">
          <span className="banner-tag">
            <FaStar /> SỰ KIỆN NỔI BẬT
          </span>

          <h2>{event.title}</h2>

          <div className="banner-info">
            <span>
              <FaCalendarAlt /> {startTime}
            </span>

            <span>
              <FaMapMarkerAlt /> {event.locationFull}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="detail-content">

        {/* LEFT CONTENT */}
        <main className="detail-left">

          <div className="event-overview">
            <div className="overview-header">
              <div>
                <span className="section-label">EVENT INFORMATION</span>
                <h2 className="event-heading">{event.title}</h2>
              </div>

              <div className="views">
                <FaEye />
                {event.views?.toLocaleString('vi-VN') || 0} lượt xem
              </div>
            </div>

            <div className="event-meta">
              <div className="meta-item">
                <div className="meta-icon">
                  <FaCalendarAlt />
                </div>
                <div>
                  <small>Thời gian diễn ra</small>
                  <p>{startTime}</p>
                  <p>Đến {endTime}</p>
                </div>
              </div>

              <div className="meta-item">
                <div className="meta-icon">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <small>Địa điểm tổ chức</small>
                  <p>{event.locationFull || 'Đang cập nhật'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <section className="detail-card description-section">
            <div className="section-heading">
              <span className="heading-icon">
                <FaTicketAlt />
              </span>
              <div>
                <span className="section-label">ABOUT THE EVENT</span>
                <h3>Giới thiệu sự kiện</h3>
              </div>
            </div>

            <div
              className="desc-text"
              dangerouslySetInnerHTML={{
                __html: event.description?.replace(/\n/g, '<br/>') || '',
              }}
            />
          </section>

          {/* GALLERY */}
          {event.gallery?.length > 0 && (
            <section className="detail-card gallery-section">
              <div className="section-heading">
                <span className="heading-icon">
                  <FaStar />
                </span>
                <div>
                  <span className="section-label">EVENT MOMENTS</span>
                  <h3>Hình ảnh sự kiện</h3>
                </div>
              </div>

              <div className="gallery-slider">
                {event.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Hình ảnh sự kiện ${idx + 1}`}
                    className={`gallery-slide ${
                      idx === currentSlide ? 'active' : ''
                    }`}
                  />
                ))}

                <div className="gallery-counter">
                  {currentSlide + 1} / {event.gallery.length}
                </div>
              </div>

              <div className="gallery-dots">
                {event.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    className={idx === currentSlide ? 'active' : ''}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Xem ảnh ${idx + 1}`}
                  />
                ))}
              </div>
            </section>
          )}

          {/* SEAT MAP */}
          {event.seatMap && (
            <section className="detail-card seatmap-container">
              <div className="section-heading">
                <span className="heading-icon">
                  <FaMapMarkerAlt />
                </span>
                <div>
                  <span className="section-label">VENUE MAP</span>
                  <h3>Sơ đồ vị trí ghế</h3>
                </div>
              </div>

              <img
                src={event.seatMap}
                alt="Sơ đồ vị trí ghế"
                className="seatmap-image"
              />
            </section>
          )}

          {/* TICKET PRICE */}
          <section className="detail-card ticket-section">
            <div className="section-heading">
              <span className="heading-icon">
                <FaTicketAlt />
              </span>
              <div>
                <span className="section-label">TICKET PRICING</span>
                <h3>Bảng giá vé</h3>
              </div>
            </div>

            <div className="ticket-list">
              {event.ticketInfo?.map((t, i) => (
                <div className="ticket-price-item" key={i}>
                  <div className="ticket-type">
                    <FaTicketAlt />
                    <span>{t.type}</span>
                  </div>

                  <strong>
                    {Number(t.price).toLocaleString('vi-VN')}₫
                  </strong>
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section className="detail-card contact-box">
            <div className="section-heading">
              <span className="heading-icon">
                <FaHeadset />
              </span>
              <div>
                <span className="section-label">GET IN TOUCH</span>
                <h3>Thông tin liên hệ</h3>
              </div>
            </div>

            <div className="contact-info">
              <p>
                <FaEnvelope />
                <span>Email: {event.email || 'Đang cập nhật'}</span>
              </p>

              <p>
                <FaPhoneAlt />
                <span>
                  Hotline: {event.hotline?.join(' - ') || 'Đang cập nhật'}
                </span>
              </p>
            </div>

            {event.organizer && (
              <div className="organizer">
                {event.organizerLogo && (
                  <img
                    className="organizer-logo"
                    src={event.organizerLogo}
                    alt="Logo ban tổ chức"
                  />
                )}

                <div className="organizer-info">
                  <small>ĐƠN VỊ TỔ CHỨC</small>
                  <strong>{event.organizer}</strong>
                </div>
              </div>
            )}
          </section>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="detail-right">

          {/* BOOKING BOX */}
          <div className="ticket-box">
            <span className="sidebar-label">DON'T MISS OUT</span>

            <div className="sidebar-ticket-icon">
              <FaTicketAlt />
            </div>

            <h3>Sẵn sàng tham gia?</h3>

            <p>
              Đừng bỏ lỡ cơ hội trải nghiệm sự kiện tuyệt vời này.
              Đặt vé ngay hôm nay!
            </p>

            <button className="btn-buy" onClick={handleBuyNow}>
              MUA VÉ NGAY
              <FaArrowRight />
            </button>

            <div className="booking-benefits">
              <div>
                <FaShieldAlt />
                <span>Đặt vé an toàn</span>
              </div>

              <div>
                <FaClock />
                <span>Thanh toán nhanh chóng</span>
              </div>

              <div>
                <FaHeadset />
                <span>Hỗ trợ khách hàng</span>
              </div>
            </div>

            <Link to={`/${category}`} className="back-link">
              ← Quay lại danh sách sự kiện
            </Link>
          </div>

          {/* DECORATIVE PROMOTION CARD */}
          <div className="sidebar-promo">
            <div className="promo-glow" />

            <span className="promo-tag">YOUR NEXT EXPERIENCE</span>

            <div className="promo-art">
              <div className="promo-circle circle-one" />
              <div className="promo-circle circle-two" />

              <div className="promo-ticket">
                <FaTicketAlt />
                <span>YOUR</span>
                <strong>EVENT</strong>
                <small>UNFORGETTABLE MOMENTS</small>
              </div>
            </div>

            <h3>Make Every Moment Count!</h3>

            <p>
              Khám phá những sự kiện hấp dẫn và tạo nên
              những khoảnh khắc đáng nhớ cùng chúng tôi.
            </p>

            <div className="promo-bottom">
              <span>EXPERIENCE MORE</span>
              <FaArrowRight />
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}
