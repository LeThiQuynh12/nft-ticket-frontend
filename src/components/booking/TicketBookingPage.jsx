// src/pages/TicketBookingPage.jsx
import './TicketBookingPage.css';

import {
  useEffect,
  useState,
} from 'react';

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
  const { state } = useLocation();
  const { id } = useParams(); // lấy eventId từ URL nếu state không có
  const navigate = useNavigate();

  const [event, setEvent] = useState(state?.event || null);
  const [loadingEvent, setLoadingEvent] = useState(false);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedZones, setSelectedZones] = useState({});
  const [selectedSeatNums, setSelectedSeatNums] = useState({});
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  // Nếu chưa có event, fetch theo id
  useEffect(() => {
    if (!event && id) {
      setLoadingEvent(true);
      eventApi
        .getEventById(id)
        .then((res) => {
          if (res.event) setEvent(res.event);
        })
        .catch((err) => console.error("Lỗi fetch event:", err))
        .finally(() => setLoadingEvent(false));
    }
  }, [id, event]);

  if (loadingEvent) return <p>Đang tải dữ liệu sự kiện...</p>;
  if (!event) {
    return (
      <div className="booking-page">
        <Header />
        <p>Không tìm thấy dữ liệu sự kiện!</p>
        <Link to="/music">← Quay lại danh sách</Link>
      </div>
    );
  }

  // 🧭 Nếu ticketInfo không có zones/seats thì thêm danh sách mặc định
  const ticketInfoWithDefaults = event.ticketInfo?.map((ticket) => ({
    ...ticket,
    zones: ticket.zones || [
      "Khu A - Sân khấu trung tâm",
      "Khu B - Cánh trái",
      "Khu C - Cánh phải",
      "Khu D - Phía sau",
    ],
    seats: ticket.seats || Array.from({ length: 10 }, (_, i) => `Ghế ${i + 1}`), // Ghế 1 → 10
  }));

  const totalPrice = selectedSeats.reduce((sum, item) => sum + item.price, 0);

  const handleSeatAdd = (ticketType, price, zone, seat) => {
    if (!zone || !seat) return alert("Vui lòng chọn khu và ghế!");
    const newItem = { ticketType, price, zone, seat };
    setSelectedSeats([...selectedSeats, newItem]);
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (!selectedSeats.length) return alert("Vui lòng chọn vé!");
    if (!customer.name || !customer.phone || !customer.email)
      return alert("Vui lòng nhập đầy đủ thông tin khách hàng!");

    const orderPayload = {
      eventId: event._id || id, // fallback nếu _id chưa có
      tickets: selectedSeats.map((item) => ({
        ticketType: item.ticketType,
        zone: item.zone,
        seat: item.seat,
      })),
      description: `Thanh toán ${event.title}`,
      buyerName: customer.name,
      buyerPhone: customer.phone,
      buyerEmail: customer.email,
    };

    try {
      setLoading(true);
      const res = await orderApi.createOrder(orderPayload);
      console.log("Order created:", res);

      if (res.success && res.order) {
        navigate("/payment-confirm", { state: { order: res.order } });
      } else {
        alert("Không tạo được đơn hàng!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo đơn hàng!");
    } finally {
      setLoading(false);
    }
    console.log("Order Payload:", orderPayload);
  };

  return (
    <div className="booking-page">
      <Header />
      <div className="booking-container">
        {/* Left Section - Customer Form */}
        <div className="left-section">
          <div className="booking-form">
            <h3>THÔNG TIN KHÁCH HÀNG / CUSTOMER INFORMATION</h3>
            <label>Họ tên / Fullname:</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleCustomerChange}
            />
            <label>Điện thoại / Phone:</label>
            <input
              type="text"
              name="phone"
              value={customer.phone}
              onChange={handleCustomerChange}
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleCustomerChange}
            />
            <label>Địa chỉ / Address:</label>
            <input
              type="text"
              name="address"
              value={customer.address}
              onChange={handleCustomerChange}
            />
{/* 
            <label>Ví Meta Mask:</label>
            <input
              type="text"
              name="wallet"
              value={customer.email}
              onChange={handleCustomerChange}
            /> */}
          </div>
        </div>

        {/* Right Section - Seat Map & Ticket Selection */}
        <div className="right-section">
          <h2>{event.title}</h2>

          <p>
            <strong>Địa điểm:</strong>{" "}
            {event.locationFull ||
              `${event.location?.name || ""}, ${
                event.location?.addressDetail || ""
              }, ${event.location?.ward || ""}, ${
                event.location?.district || ""
              }, ${event.location?.province || ""}`}
          </p>

          <p>
            <strong>Ngày tổ chức:</strong>{" "}
            {event.startAt
              ? new Date(event.startAt).toLocaleDateString("vi-VN")
              : "Chưa cập nhật"}{" "}
            –{" "}
            {event.endAt
              ? new Date(event.endAt).toLocaleDateString("vi-VN")
              : ""}
          </p>

          {event.seatMap && (
            <img src={event.seatMap} alt="Sơ đồ ghế" className="seatmap-img" />
          )}

          <h3>🪑 CHỌN VỊ TRÍ CHỖ NGỒI / CHOOSE YOUR SEAT POSITION</h3>

          <table className="ticket-table">
            <thead>
              <tr>
                <th>Hạng vé</th>
                <th>Giá vé</th>
                <th>Chọn khu</th>
                <th>Chọn ghế</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ticketInfoWithDefaults?.map((ticket, i) => (
                <tr key={i}>
                  <td>{ticket.type}</td>
                  <td>{ticket.price.toLocaleString()} VND</td>

                  <td>
                    <select
                      value={selectedZones[i] || ""}
                      onChange={(e) =>
                        setSelectedZones({
                          ...selectedZones,
                          [i]: e.target.value,
                        })
                      }
                    >
                      <option value="">-- Chọn khu --</option>
                      {ticket.zones.map((z, idx) => (
                        <option key={idx} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select
                      value={selectedSeatNums[i] || ""}
                      onChange={(e) =>
                        setSelectedSeatNums({
                          ...selectedSeatNums,
                          [i]: e.target.value,
                        })
                      }
                    >
                      <option value="">-- Chọn ghế --</option>
                      {ticket.seats.map((s, idx) => (
                        <option key={idx} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <button
                      className="add-btn"
                      onClick={() =>
                        handleSeatAdd(
                          ticket.type,
                          ticket.price,
                          selectedZones[i],
                          selectedSeatNums[i]
                        )
                      }
                    >
                      + Thêm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedSeats.length > 0 && (
            <div className="selected-list">
              <h4>🎟 Vé bạn đã chọn:</h4>
              <ul>
                {selectedSeats.map((item, i) => (
                  <li key={i}>
                    {item.ticketType} — {item.zone} / {item.seat} —{" "}
                    {item.price.toLocaleString()} VND
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="total-section">
            <input type="text" placeholder="Mã giảm giá / Promo Code" />
            <button className="check-btn">Kiểm tra</button>

            <div className="total">
              Tổng cộng: <strong>{totalPrice.toLocaleString()} VND</strong>
            </div>

            <div className="agreement">
              <input type="checkbox" /> Tôi đồng ý với{" "}
              <a href="#">Điều khoản & Chính sách</a>
            </div>

            <button
              className="btn-continue"
              disabled={loading}
              onClick={handleCheckout}
            >
              {loading ? "Đang tạo đơn..." : "Tiếp tục thanh toán"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
