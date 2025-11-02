import '../../styles/EventTicketsTab.css';

import React, { useState } from 'react';

import {
  FaFileUpload,
  FaPlus,
  FaTrashAlt,
} from 'react-icons/fa';

export default function EventTicketsTab() {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [tickets, setTickets] = useState([]); // danh sách loại vé
  const [seatMap, setSeatMap] = useState(null); // lưu ảnh sơ đồ ghế

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newTicket = {
      name: form.ticketName.value,
      price: form.ticketPrice.value,
      total: form.ticketTotal.value,
      min: form.ticketMin.value,
      max: form.ticketMax.value,
    };
    setTickets([...tickets, newTicket]);
    setShowTicketModal(false);
  };

  const handleSeatMapUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSeatMap(URL.createObjectURL(file));
    }
  };

  const removeTicket = (index) => {
    setTickets(tickets.filter((_, i) => i !== index));
  };

  return (
    <div className="event-time-section">
      <h3 className="ets-title">Thời Gian</h3>

      <div className="ets-card">
        {/* --- Thời gian sự kiện --- */}
        <div className="ets-collapse-header">Ngày sự kiện</div>
        <div className="ets-form-row">
          <div className="ets-form-group">
            <label>Thời gian bắt đầu</label>
            <input type="datetime-local" />
          </div>
          <div className="ets-form-group">
            <label>Thời gian kết thúc</label>
            <input type="datetime-local" />
          </div>
        </div>

        {/* --- Phần loại vé --- */}
        <div className="ets-ticket-type">
          <label className="ets-required">* Loại vé</label>
          <button
            className="ets-add-btn"
            onClick={() => setShowTicketModal(true)}
          >
            <FaPlus className="ic-faplus" /> Tạo loại vé mới
          </button>
        </div>

        {/* --- Hiển thị danh sách loại vé --- */}
        {tickets.length > 0 && (
          <div className="ticket-list">
            <h4>Danh sách loại vé</h4>
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>Tên vé</th>
                  <th>Giá vé (VNĐ)</th>
                  <th>Tổng SL</th>
                  <th>Tối thiểu</th>
                  <th>Tối đa</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t, i) => (
                  <tr key={i}>
                    <td>{t.name}</td>
                    <td>{t.price}</td>
                    <td>{t.total}</td>
                    <td>{t.min}</td>
                    <td>{t.max}</td>
                    <td>
                      <button
                        className="ticket-delete-btn"
                        onClick={() => removeTicket(i)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- Phần sơ đồ ghế --- */}
        <div className="seatmap-section">
          <label className="ets-required">* Ảnh sơ đồ ghế</label>
          <div className="et-upload-box">
            <FaFileUpload className="et-upload-icon" />
            <p>Tải ảnh sơ đồ ghế (PNG, JPG, tối đa 5MB)</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleSeatMapUpload}
              className="seatmap-input"
            />
          </div>
          {seatMap && (
            <div className="seatmap-preview">
              <img src={seatMap} alt="Sơ đồ ghế" />
            </div>
          )}
        </div>
      </div>

      {/* --- Popup tạo vé mới --- */}
      {showTicketModal && (
        <div className="ets-modal-overlay">
          <div className="ets-modal">
            <button
              className="ets-close-btn"
              onClick={() => setShowTicketModal(false)}
            >
              ×
            </button>

            <div className="event-tickets-tab">
              <h2 className="et-modal-title">Tạo loại vé mới</h2>

              <form className="et-ticket-form" onSubmit={handleTicketSubmit}>
                {/* Tên vé */}
                <div className="et-form-group et-full">
                  <label>* Tên vé</label>
                  <input name="ticketName" type="text" placeholder="Tên vé" required />
                </div>

                {/* Giá & Số lượng */}
                <div className="et-form-row">
                  <div className="et-form-group et-small">
                    <label>* Giá vé</label>
                    <input name="ticketPrice" type="number" placeholder="Giá vé" required />
                  </div>
                  <div className="et-form-group et-small">
                    <label>* Tổng số lượng vé</label>
                    <input name="ticketTotal" type="number" placeholder="10" required />
                  </div>
                  <div className="et-form-group et-small">
                    <label>* Số vé tối thiểu</label>
                    <input name="ticketMin" type="number" placeholder="1" required />
                  </div>
                  <div className="et-form-group et-small">
                    <label>* Số vé tối đa</label>
                    <input name="ticketMax" type="number" placeholder="10" required />
                  </div>
                </div>

                <button type="submit" className="et-btn-save">
                  Lưu
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
