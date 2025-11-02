import { useState } from 'react';

export default function SeatMap({ seatMap, ticketInfo = [] }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedZones, setSelectedZones] = useState({});
  const [selectedSeatNums, setSelectedSeatNums] = useState({});

  const handleAdd = (ticketType, price, zone, seat) => {
    if (!zone || !seat) return alert('Vui lòng chọn vị trí và số ghế!');
    const newItem = { ticketType, price, zone, seat };
    setSelectedSeats([...selectedSeats, newItem]);
  };

  const totalPrice = selectedSeats.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="seat-map">
      {seatMap && <img src={seatMap} alt="Sơ đồ ghế" className="seatmap-img" />}

      <h3>🪑 CHỌN VỊ TRÍ CHỖ NGỒI / CHOOSE YOUR SEAT POSITION</h3>

      <table className="ticket-table">
        <thead>
          <tr>
            <th>Hạng vé</th>
            <th>Giá vé</th>
            <th>Chọn vị trí</th>
            <th>Chọn số ghế</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ticketInfo.map((ticket, i) => (
            <tr key={i}>
              <td>{ticket.type}</td>
              <td>{ticket.price.toLocaleString()} VND</td>

              <td>
                <select
                  value={selectedZones[i] || ''}
                  onChange={(e) =>
                    setSelectedZones({ ...selectedZones, [i]: e.target.value })
                  }
                >
                  <option value="">-- Chọn khu --</option>
                  {ticket.zones?.map((z, idx) => (
                    <option key={idx} value={z}>{z}</option>
                  ))}
                </select>
              </td>

              <td>
                <select
                  value={selectedSeatNums[i] || ''}
                  onChange={(e) =>
                    setSelectedSeatNums({ ...selectedSeatNums, [i]: e.target.value })
                  }
                >
                  <option value="">-- Chọn ghế --</option>
                  {ticket.seats?.map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </td>

              <td>
                <button
                  className="add-btn"
                  onClick={() =>
                    handleAdd(
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
                {item.ticketType} — {item.zone} / {item.seat} —{' '}
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
          <input type="checkbox" /> Tôi đồng ý với{' '}
          <a href="#">Điều khoản & Chính sách</a>
        </div>

        <button className="btn-continue">Tiếp tục thanh toán</button>
      </div>
    </div>
  );
}
