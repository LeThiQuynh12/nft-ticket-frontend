import '../../styles/EventSettingsTab.css';

import React from 'react';

import {
  FaEnvelope,
  FaGlobe,
  FaLock,
} from 'react-icons/fa';

export default function EventSettingsTab({ data, updateData, errors }) {
  return (
    <div className="event-settings-tab">

      {/* Privacy Section */}
      <div className="section">
        <h4 className="section-title">
          <FaLock /> Quyền riêng tư sự kiện
        </h4>

        <div className="radio-group">
          <label className="radio-item">
            <input
              type="radio"
              name="privacy"
              checked={data.privacy === 'public'}
              onChange={() => updateData({ privacy: 'public' })}
            />
            <div className="radio-info">
              <span className="radio-title"><FaGlobe /> Công khai</span>
              <span className="radio-desc">
                Sự kiện có thể tìm thấy và đăng ký bởi mọi người
              </span>
            </div>
          </label>

          <label className="radio-item">
            <input
              type="radio"
              name="privacy"
              checked={data.privacy === 'private'}
              onChange={() => updateData({ privacy: 'private' })}
            />
            <div className="radio-info">
              <span className="radio-title"><FaLock /> Riêng tư</span>
              <span className="radio-desc">
                Chỉ những người có link mới có thể xem và đăng ký
              </span>
            </div>
          </label>
        </div>
        {errors.privacy && <div className="input-error">{errors.privacy}</div>}
      </div>

      {/* Confirmation Message */}
      <div className="section">
        <h4 className="section-title">
          <FaEnvelope /> Tin nhắn xác nhận
        </h4>

        <textarea
          className="styled-textarea"
          rows={6}
          maxLength={500}
          placeholder="Cảm ơn bạn đã đặt vé!"
          value={data.confirmationMessage || ''}
          onChange={e => updateData({ confirmationMessage: e.target.value })}
        />

        <div className="input-counter">
          {(data.confirmationMessage || '').length}/500
        </div>

        {errors.confirmationMessage && (
          <div className="input-error">{errors.confirmationMessage}</div>
        )}
      </div>

    </div>
  );
}
