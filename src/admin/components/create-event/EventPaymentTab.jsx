import '../../styles/EventPaymentTab.css';

import React from 'react';

export default function EventPaymentTab({ onPrev }) {
  return (
    <div className="payment-tab">
      <h3 className="tab-title">Thông tin thanh toán</h3>
      {/* Thông tin tài khoản */}
      <div className="section">
        <label className="input-label">
          Chủ tài khoản: <span className="input-counter">0 / 100</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Nhập tên chủ tài khoản"
          maxLength="100"
        />

        <label className="input-label">
          Số tài khoản:
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="0"
          value="0"
          readOnly
        />

        <label className="input-label">
          Tên ngân hàng: <span className="input-counter">0 / 100</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Nhập tên ngân hàng"
          maxLength="100"
        />

        <label className="input-label">
          Chi nhánh: <span className="input-counter">0 / 100</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Nhập chi nhánh"
          maxLength="100"
        />
      </div>

      {/* Hóa đơn đỏ */}
      <div className="section">
        <h4 className="section-title">Hóa đơn đỏ</h4>

        <label className="input-label">Loại hình kinh doanh:</label>
        <select className="form-select">
          <option>Cá nhân</option>
          <option>Công ty</option>
        </select>

        <label className="input-label">
          Họ tên: <span className="input-counter">0 / 100</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Nhập họ tên"
          maxLength="100"
        />

        <label className="input-label">
          Địa chỉ: <span className="input-counter">0 / 100</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Nhập địa chỉ"
          maxLength="100"
        />

        <label className="input-label">Mã số thuế:</label>
        <input
          type="text"
          className="form-input"
          placeholder="0"
          value="0"
          readOnly
        />
      </div>
    </div>
  );
}