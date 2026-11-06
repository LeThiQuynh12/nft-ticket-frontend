// src/pages/TicketBookingPage.jsx
import './TicketBookingPage.css';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaTrashAlt,
  FaUser,
} from 'react-icons/fa';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import eventApi from '../../api/eventApi';
import orderApi from '../../api/orderApi';
import Header from '../home/Header';

export default function TicketBookingPage() {
  const location = useLocation();
  const { state } = location;
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(state?.event || null);
  const [loadingEvent, setLoadingEvent] = useState(false);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatData, setSeatData] = useState([]);
  const [loadingSeats, setLoadingSeats] = useState(false);
  const [seatError, setSeatError] = useState('');

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cuộn lên đầu khi chuyển route sang trang Booking
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [location.pathname]);

  useEffect(() => {
    const eventId = event?._id || id;

    if (!eventId) return;

    let isMounted = true;

    const fetchSeats = async () => {
      try {
        setLoadingSeats(true);
        setSeatError('');

        const res = await eventApi.getEventSeats(eventId);

        if (isMounted && res.success) {
          setSeatData(res.ticketTypes || []);
        }
      } catch (error) {
        console.error('Lỗi lấy sơ đồ ghế:', error);

        if (isMounted) {
          setSeatError(
            error.response?.data?.message ||
            'Không thể tải trạng thái ghế.'
          );
        }
      } finally {
        if (isMounted) {
          setLoadingSeats(false);
        }
      }
    };

    fetchSeats();

    return () => {
      isMounted = false;
    };
  }, [event?._id, id]);

  // Đồng bộ event khi điều hướng sang một sự kiện khác
  useEffect(() => {
    if (state?.event) {
      setEvent(state.event);
      return;
    }

    setEvent(null);

    if (!id) return;

    let isMounted = true;

    setLoadingEvent(true);

    eventApi
      .getEventById(id)
      .then((res) => {
        if (isMounted && res.event) {
          setEvent(res.event);
        }
      })
      .catch((err) => {
        console.error('Lỗi fetch event:', err);
      })
      .finally(() => {
        if (isMounted) {
          setLoadingEvent(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, state?.event]);

  // Chuẩn hóa dữ liệu loại vé
  const ticketInfoWithDefaults = useMemo(() => {
    return (event?.ticketInfo || []).map((ticket) => ({
      ...ticket,
      zones: ticket.zones?.length
        ? ticket.zones
        : [
          'Khu A - Sân khấu trung tâm',
          'Khu B - Cánh trái',
          'Khu C - Cánh phải',
          'Khu D - Phía sau',
        ],
      seats: ticket.seats?.length
        ? ticket.seats
        : Array.from({ length: 10 }, (_, i) => `Ghế ${i + 1}`),
    }));
  }, [event]);

  const totalPrice = selectedSeats.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString('vi-VN');

  const formatDate = (date) => {
    if (!date) return 'Chưa cập nhật';

    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const eventLocation =
    event?.locationFull ||
    [
      event?.location?.name,
      event?.location?.addressDetail,
      event?.location?.ward,
      event?.location?.district,
      event?.location?.province,
    ]
      .filter(Boolean)
      .join(', ') ||
    'Đang cập nhật';

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSeatAdd = (ticket, section, seat) => {
    if (!seat._id || seat.status !== 'available') {
      return;
    }

    const duplicated = selectedSeats.some(
      (item) => item.seatId === seat._id
    );

    if (duplicated) {
      alert('Ghế này đã được chọn!');
      return;
    }

    const newItem = {
      id: seat._id,
      seatId: seat._id,
      ticketTypeId: ticket._id,
      sectionId: section._id,
      ticketType: ticket.name,
      price: Number(ticket.price || 0),
      zone: section.name,
      seat: seat.seatNumber,
    };

    setSelectedSeats((prev) => [...prev, newItem]);
  };

  // Xóa vé đã chọn
  const handleRemoveSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.filter((item) => item.id !== seatId)
    );
  };

  // Tạo đơn hàng
  const handleCheckout = async () => {
    if (!selectedSeats.length) {
      alert('Vui lòng chọn ít nhất một vé!');
      return;
    }

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.email.trim()
    ) {
      alert('Vui lòng nhập đầy đủ họ tên, số điện thoại và email!');
      return;
    }

    if (!acceptedTerms) {
      alert('Vui lòng đồng ý với Điều khoản & Chính sách!');
      return;
    }

    const orderPayload = {
      eventId: event._id || id,
      tickets: selectedSeats.map((item) => ({
        ticketTypeId: item.ticketTypeId,
        sectionId: item.sectionId,
        seatId: item.seatId,
      })),
      description: `Thanh toán ${event.title}`,
      buyerName: customer.name.trim(),
      buyerPhone: customer.phone.trim(),
      buyerEmail: customer.email.trim(),
    };

    try {
      setLoading(true);

      const res = await orderApi.createOrder(orderPayload);

      if (res.success && res.order) {
        navigate('/payment-confirm', {
          state: { order: res.order },
        });
      } else {
        alert('Không tạo được đơn hàng!');
      }
    } catch (err) {
      console.error('Lỗi tạo đơn hàng:', err);
      alert('Đã xảy ra lỗi khi tạo đơn hàng!');
    } finally {
      setLoading(false);
    }
  };

  if (loadingEvent) {
    return (
      <div className="booking-page">
        <Header />
        <div className="booking-status">
          <div className="booking-spinner" />
          <p>Đang tải thông tin sự kiện...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="booking-page">
        <Header />

        <div className="booking-status">
          <FaTicketAlt />
          <h2>Không tìm thấy sự kiện</h2>
          <p>Sự kiện có thể đã bị xóa hoặc không tồn tại.</p>
          <Link to="/music" className="booking-back-link">
            Quay lại danh sách sự kiện
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <Header />

      <main className="booking-container">
        {/* ===== LEFT: CUSTOMER INFORMATION ===== */}
        <aside className="left-section">
          <div className="booking-form booking-card">
            <div className="booking-section-heading">
              <div className="section-icon">
                <FaUser />
              </div>

              <div>
                <span className="section-subtitle">YOUR INFORMATION</span>
                <h3>Thông tin khách hàng</h3>
              </div>
            </div>

            <div className="form-content">
              <div className="form-group">
                <label htmlFor="customer-name">
                  Họ và tên <span>*</span>
                </label>

                <input
                  id="customer-name"
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleCustomerChange}
                  placeholder="Nhập họ và tên của bạn"
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="customer-phone">
                  Số điện thoại <span>*</span>
                </label>

                <input
                  id="customer-phone"
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleCustomerChange}
                  placeholder="Nhập số điện thoại"
                  autoComplete="tel"
                />
              </div>

              <div className="form-group">
                <label htmlFor="customer-email">
                  Email <span>*</span>
                </label>

                <input
                  id="customer-email"
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleCustomerChange}
                  placeholder="example@email.com"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="customer-address">
                  Địa chỉ
                </label>

                <input
                  id="customer-address"
                  type="text"
                  name="address"
                  value={customer.address}
                  onChange={handleCustomerChange}
                  placeholder="Nhập địa chỉ của bạn"
                  autoComplete="street-address"
                />
              </div>
            </div>

            <div className="form-note">
              <FaCheckCircle />
              <span>
                Thông tin của bạn được sử dụng để xác nhận đơn hàng.
              </span>
            </div>
          </div>
        </aside>

        {/* ===== RIGHT: EVENT & TICKET SELECTION ===== */}
        <section className="right-section">
          {/* Event information */}
          <div className="booking-event-card booking-card">
            <span className="section-subtitle">EVENT INFORMATION</span>

            <h1>{event.name || event.title}</h1>

            <div className="booking-event-meta">
              <div className="booking-meta-item">
                <FaMapMarkerAlt />
                <div>
                  <small>LOCATION</small>
                  <span className="meta-sublabel">Địa điểm</span>
                  <p>{eventLocation}</p>
                </div>
              </div>

              <div className="booking-meta-item">
                <FaCalendarAlt />
                <div>
                  <small>TIME</small>
                  <span className="meta-sublabel">Thời gian</span>
                  <p>
                    {formatDate(event.startAt)}
                    {event.endAt && ` – ${formatDate(event.endAt)}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Seat map */}
          {(event.seatMapUrl || event.seatMap) && (
            <div className="booking-card seatmap-card">
              <div className="booking-section-heading">
                <div className="section-icon">
                  <FaTicketAlt />
                </div>

                <div>
                  <span className="section-subtitle">SEATING PLAN</span>
                  <h3>Sơ đồ chỗ ngồi</h3>
                </div>
              </div>

              <img
                src={event.seatMapUrl || event.seatMap}
                alt="Sơ đồ chỗ ngồi sự kiện"
                className="seatmap-img"
              />
            </div>
          )}

          {/* Ticket selection */}

          {/* TICKET SELECTION - REAL SEATS */}
          <div className="booking-card ticket-selection-card">
            <div className="booking-section-heading">
              <div className="section-icon">
                <FaTicketAlt />
              </div>

              <div>
                <span className="section-subtitle">CHOOSE YOUR SEATS</span>
                <h3>Chọn chỗ ngồi</h3>
              </div>
            </div>

            {/* Chú thích trạng thái */}
            <div className="seat-legend">
              <div>
                <span className="seat-dot available"></span>
                Còn trống
              </div>

              <div>
                <span className="seat-dot selected"></span>
                Đang chọn
              </div>

              <div>
                <span className="seat-dot reserved"></span>
                Đang giữ
              </div>

              <div>
                <span className="seat-dot sold"></span>
                Đã bán
              </div>
            </div>

            {loadingSeats ? (
              <div className="ticket-empty">
                Đang tải sơ đồ ghế...
              </div>
            ) : seatError ? (
              <div className="ticket-empty">
                {seatError}
              </div>
            ) : seatData.length === 0 ? (
              <div className="ticket-empty">
                Sự kiện chưa có cấu hình ghế.
              </div>
            ) : (
              <div className="real-seat-list">
                {seatData.map((ticket) => (
                  <div className="real-ticket-type" key={ticket._id}>
                    <div className="real-ticket-header">
                      <div>
                        <h4>{ticket.name}</h4>
                        <span>
                          {formatPrice(ticket.price)} đ
                        </span>
                      </div>
                    </div>

                    {(ticket.sections || []).map((section) => {
                      const availableCount = section.seats.filter(
                        (seat) => seat.status === 'available'
                      ).length;

                      const reservedCount = section.seats.filter(
                        (seat) => seat.status === 'reserved'
                      ).length;

                      const soldCount = section.seats.filter(
                        (seat) => seat.status === 'sold'
                      ).length;

                      return (
                        <div className="real-section" key={section._id}>
                          <div className="real-section-header">
                            <h5>{section.name}</h5>

                            <span>
                              Còn {availableCount}/{section.seats.length} ghế
                            </span>
                          </div>

                          <div className="real-section-stats">
                            <span>Còn trống: {availableCount}</span>
                            <span>Đang giữ: {reservedCount}</span>
                            <span>Đã bán: {soldCount}</span>
                          </div>

                          {section.isActive ? (
                            <div className="real-seat-grid">
                              {section.seats.map((seat) => {
                                const isSelected = selectedSeats.some(
                                  (item) => item.seatId === seat._id
                                );

                                const isAvailable =
                                  seat.status === 'available' &&
                                  Boolean(seat._id);

                                const statusClass = isSelected
                                  ? 'selected'
                                  : seat.status === 'available'
                                    ? 'available'
                                    : seat.status === 'reserved'
                                      ? 'reserved'
                                      : seat.status === 'sold'
                                        ? 'sold'
                                        : 'missing';

                                return (
                                  <button
                                    type="button"
                                    key={seat._id || seat.seatNumber}
                                    className={`real-seat ${statusClass}`}
                                    disabled={!isAvailable}
                                    title={
                                      isSelected
                                        ? 'Bạn đang chọn ghế này'
                                        : seat.status === 'available'
                                          ? 'Còn trống'
                                          : seat.status === 'reserved'
                                            ? 'Đang được giữ'
                                            : seat.status === 'sold'
                                              ? 'Đã bán'
                                              : 'Chưa đồng bộ ghế'
                                    }
                                    onClick={() =>
                                      isSelected
                                        ? handleRemoveSeat(seat._id)
                                        : handleSeatAdd(ticket, section, seat)
                                    }
                                  >
                                    {seat.seatNumber}
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="section-disabled">
                              Khu vực này hiện không mở bán.
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected tickets */}
          <div className="booking-card selected-card">
            <div className="selected-heading">
              <div>
                <span className="section-subtitle">YOUR SELECTION</span>
                <h3>Vé đã chọn</h3>
              </div>

              <span className="selected-count">
                {selectedSeats.length} vé
              </span>
            </div>

            {selectedSeats.length > 0 ? (
              <div className="selected-ticket-list">
                {selectedSeats.map((item) => (
                  <div className="selected-ticket" key={item.id}>
                    <div className="selected-ticket-icon">
                      <FaTicketAlt />
                    </div>

                    <div className="selected-ticket-info">
                      <strong>{item.ticketType}</strong>
                      <span>
                        {item.zone} · {item.seat}
                      </span>
                    </div>

                    <div className="selected-ticket-price">
                      {formatPrice(item.price)} đ
                    </div>

                    <button
                      type="button"
                      className="remove-ticket-btn"
                      title="Xóa vé"
                      onClick={() => handleRemoveSeat(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="selected-empty">
                <FaTicketAlt />
                <p>Bạn chưa chọn vé nào.</p>
                <span>Hãy chọn khu vực và ghế ngồi ở phía trên.</span>
              </div>
            )}
          </div>

          {/* Payment summary */}
          <div className="booking-card total-section">
            <div className="total-heading">
              <span className="section-subtitle">ORDER SUMMARY</span>
              <h3>Thông tin thanh toán</h3>
            </div>

            <div className="total-row">
              <span>Số lượng vé</span>
              <strong>{selectedSeats.length} vé</strong>
            </div>

            <div className="total-row total-final">
              <span>Tổng thanh toán</span>
              <strong>{formatPrice(totalPrice)} đ</strong>
            </div>

            <div className="agreement">
              <input
                id="booking-agreement"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />

              <label htmlFor="booking-agreement">
                Tôi đồng ý với{' '}
                <Link to="/terms">Điều khoản & Chính sách</Link>
              </label>
            </div>

            <button
              type="button"
              className="btn-continue"
              disabled={loading || !selectedSeats.length}
              onClick={handleCheckout}
            >
              {loading ? (
                'Đang tạo đơn hàng...'
              ) : (
                <>
                  Tiếp tục thanh toán

                </>
              )}
            </button>

            <p className="payment-note">
              Vui lòng kiểm tra thông tin trước khi xác nhận đơn hàng.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}