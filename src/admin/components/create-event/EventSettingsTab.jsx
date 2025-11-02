import '../../styles/EventSettingsTab.css';

import React from 'react';

import {
  FaEnvelope,
  FaGlobe,
  FaLock,
} from 'react-icons/fa';

export default function EventSettingsTab({ onPrev }) {
  return (
    <div className="event-settings-tab">
      {/* Quyền riêng tư sự kiện */}
      <div className="section">
        <h4 className="section-title">
          <FaLock className="icon orange" /> Quyền riêng tư sự kiện
        </h4>
        <div className="privacy-options">
          <label className="radio-option">
            <input type="radio" name="privacy" defaultChecked />
            <div className="radio-content">
              <strong>
                <FaGlobe className="inline-icon" /> Sự kiện mở cho mọi người
              </strong>
              <p>Tất cả mọi người đều có thể đặt vé</p>
            </div>
          </label>
          <label className="radio-option">
            <input type="radio" name="privacy" />
            <div className="radio-content">
              <strong>
                <FaLock className="inline-icon" /> Sự kiện dành riêng cho 1 nhóm
              </strong>
              <p>Chỉ người có link truy cập mới đặt được vé</p>
            </div>
          </label>
        </div>
      </div>

      {/* Tin nhắn xác nhận */}
      <div className="section">
        <h4 className="section-title">
          <FaEnvelope className="icon blue" /> Tin nhắn xác nhận cho người tham gia
        </h4>
        <p className="section-desc">
          Tin nhắn xác nhận này sẽ được gửi đến người tham gia sau khi đặt vé thành công.
        </p>
        <textarea
          className="confirmation-message"
          placeholder="Nhập nội dung tin nhắn xác nhận..."
          rows="6"
        ></textarea>
        <div className="input-counter">0 / 500</div>
      </div>

    </div>
  );
}
