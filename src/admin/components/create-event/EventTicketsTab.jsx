import '../../styles/EventTicketsTab.css';

// File: src/components/create-event/EventTicketsTab.jsx
import React, { useState } from 'react';

import {
  FaFileUpload,
  FaPlus,
  FaTrashAlt,
} from 'react-icons/fa';

export default function EventTicketsTab({ data, updateData, errors }) {
  const [showModal, setShowModal] = useState(false);

  const addTicket = (e) => {
    e.preventDefault();
    const f = e.target;
    const ticket = {
      name: f.ticketName.value.trim(),
      price: Number(f.ticketPrice.value) || 0,
      totalQuantity: Number(f.ticketTotal.value) || 0,
      minPerOrder: Number(f.ticketMin.value) || 1,
      maxPerOrder: Number(f.ticketMax.value) || 1,
    };
    updateData({ ticketTypes: [...(data.ticketTypes || []), ticket] });
    setShowModal(false);
    f.reset();
  };

  const removeTicket = (i) => updateData({ ticketTypes: data.ticketTypes.filter((_, idx) => idx !== i) });

  const onDateChange = (field, val) => updateData({ [field]: val ? new Date(val).toISOString() : '' });

  const handleFile = (field, file) => {
    if (!file) return updateData({ [field]: null });
    if (file.size > 5 * 1024 * 1024) return alert('Ảnh phải < 5MB');
    updateData({ [field]: file });
  };

  return (
    <div className="event-time-section">
      <h3>Thời Gian & Vé</h3>

      <div className="ets-card">
        <div className="ets-form-row">
          <div className="ets-form-group">
            <label>Bắt đầu</label>
            <input type="datetime-local" defaultValue={data.startAt ? new Date(data.startAt).toISOString().slice(0,16) : ''} onChange={e => onDateChange('startAt', e.target.value)} />
            {errors.startAt && <div className="input-error">{errors.startAt}</div>}
          </div>
          <div className="ets-form-group">
            <label>Kết thúc</label>
            <input type="datetime-local" defaultValue={data.endAt ? new Date(data.endAt).toISOString().slice(0,16) : ''} onChange={e => onDateChange('endAt', e.target.value)} />
            {errors.endAt && <div className="input-error">{errors.endAt}</div>}
          </div>
        </div>

        <button className="ets-add-btn" onClick={() => setShowModal(true)}><FaPlus /> Thêm loại vé</button>
        {errors.ticketTypes && <div className="input-error">{errors.ticketTypes}</div>}

        {data.ticketTypes && data.ticketTypes.length > 0 && (
          <table className="ticket-table">
            <thead><tr><th>Tên</th><th>Giá</th><th>SL</th><th>Min</th><th>Max</th><th></th></tr></thead>
            <tbody>
              {data.ticketTypes.map((t, i) => (
                <tr key={i}>
                  <td>{t.name}</td>
                  <td>{Number(t.price).toLocaleString()}</td>
                  <td>{t.totalQuantity}</td>
                  <td>{t.minPerOrder}</td>
                  <td>{t.maxPerOrder}</td>
                  <td><button onClick={() => removeTicket(i)}><FaTrashAlt /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="seatmap-section">
          <label>* Sơ đồ ghế</label>
          <div className="et-upload-box">
            <FaFileUpload />
            <p>PNG, JPG &lt; 5MB</p>
            <input type="file" accept="image/*" onChange={e => handleFile('seatMap', e.target.files[0])} />
          </div>
          {errors.seatMap && <div className="input-error">{errors.seatMap}</div>}
          {data.seatMap && <img src={URL.createObjectURL(data.seatMap)} alt="seatmap" style={{ maxWidth: '100%', marginTop: 10 }} />}
        </div>
      </div>

{showModal && (
  <div className="ets-modal-overlay" onClick={() => setShowModal(false)}>
    <div className="ets-modal modern" onClick={e => e.stopPropagation()}>
      <button className="ets-close-btn" onClick={() => setShowModal(false)}>×</button>

      <h2 className="modal-title">Thêm loại vé</h2>

      <form className="ticket-form" onSubmit={addTicket}>
        <div className="input-group">
          <label>Tên vé</label>
          <input name="ticketName" placeholder="Ví dụ: Vé VIP / Vé thường" required />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Giá</label>
            <input name="ticketPrice" type="number" placeholder="0" required />
          </div>

          <div className="input-group">
            <label>Tổng SL</label>
            <input name="ticketTotal" type="number" placeholder="100" required />
          </div>

          <div className="input-group">
            <label>Min / đơn</label>
            <input name="ticketMin" type="number" placeholder="1" required />
          </div>

          <div className="input-group">
            <label>Max / đơn</label>
            <input name="ticketMax" type="number" placeholder="5" required />
          </div>
        </div>

        <button type="submit" className="et-btn-save full">Lưu vé</button>
      </form>
    </div>
  </div>
)}

    </div>
  );
}