import '../../styles/EventSettingsTab.css';

// File: src/components/create-event/EventSettingsTab.jsx
import React from 'react';

import {
  FaEnvelope,
  FaGlobe,
  FaLock,
} from 'react-icons/fa';

export default function EventSettingsTab({ data, updateData, errors }) {
  return (
    <div className="event-settings-tab">
      <div className="section">
        <h4><FaLock /> Quyền riêng tư</h4>
        <label><input type="radio" name="p" checked={data.privacy === 'public'} onChange={() => updateData({ privacy: 'public' })} /> <FaGlobe /> Công khai</label>
        <label><input type="radio" name="p" checked={data.privacy === 'private'} onChange={() => updateData({ privacy: 'private' })} /> <FaLock /> Riêng tư</label>
        {errors.privacy && <div className="input-error">{errors.privacy}</div>}
      </div>

      <div className="section">
        <h4><FaEnvelope /> Tin nhắn xác nhận</h4>
        <textarea rows={6} maxLength={500} placeholder="Cảm ơn bạn đã đặt vé!" value={data.confirmationMessage || ''} onChange={e => updateData({ confirmationMessage: e.target.value })} />
        <div className="input-counter">{(data.confirmationMessage || '').length}/500</div>
        {errors.confirmationMessage && <div className="input-error">{errors.confirmationMessage}</div>}
      </div>
    </div>
  );
}