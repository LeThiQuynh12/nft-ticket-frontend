import './TicketBookingPage.css';

import {
  Link,
  useLocation,
} from 'react-router-dom';

import Header from '../home/Header';
import BookingForm from './BookingForm';
import SeatMap from './SeatMap';

export default function TicketBookingPage() {
  const { state } = useLocation();
  const event = state?.event;

  if (!event) {
    return (
      <div className="booking-page">
        <Header />
        <p>Không tìm thấy dữ liệu sự kiện!</p>
        <Link to="/music">← Quay lại danh sách</Link>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <Header />
      <div className="booking-container">
        <div className="left-section">
          <BookingForm />
        </div>

        <div className="right-section">
          <h2>{event.title}</h2>
          <p><strong>Địa điểm:</strong> {event.location}</p>
          <p><strong>Thời gian:</strong> {event.time}</p>
          <p><strong>Ngày tổ chức:</strong> {new Date(event.date).toLocaleDateString('vi-VN')}</p>

          <SeatMap seatMap={event.seatMap} ticketInfo={event.ticketInfo} />
        </div>
      </div>
    </div>
  );
}
