import '../../styles/EventInfoTab.css';

import React, { useState } from 'react';

import { FaFileUpload } from 'react-icons/fa';

export default function EventInfoTab({ data, setData }) {
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const validateField = (field, value) => {
    setErrors((prev) => ({
      ...prev,
      [field]: !value ? "Vui lòng nhập thông tin bắt buộc" : "",
    }));
  };

  return (
    <div className="event-info-tab">
      <h3 className="tab-title">Thông tin sự kiện</h3>

      {/* Upload ảnh */}
      <div className="upload-section">
        <div className="upload-box small">
          <FaFileUpload className="upload-icon" />
          <p>Thêm ảnh sự kiện để hiển thị ở các vị trí khác</p>
        </div>
        <div className="upload-box large">
          <FaFileUpload className="upload-icon" />
          <p>Thêm ảnh nền sự kiện</p>
        </div>
      </div>

      {/* Tên sự kiện */}
      <div className="form-section">
        <label>Tên sự kiện <span style={{color:"red"}}>*</span></label>
        <input
          type="text"
          value={data.name}
          placeholder="Nhập tên sự kiện"
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={(e) => validateField("name", e.target.value)}
          className={errors.name ? "error" : ""}
        />
        {errors.name && <small className="error-text">{errors.name}</small>}
      </div>

      {/* Chọn loại sự kiện Online/Offline */}
      <div className="form-section">
        <label>Địa điểm sự kiện <span style={{color:"red"}}>*</span></label>
        <div className="radio-group">
          <label className="detail-place">
            <input
              type="radio"
              name="eventMode"
              value="offline"
              checked={data.mode === "offline"}
              onChange={(e) => handleChange("mode", e.target.value)}
            />
            Sự kiện Offline
          </label>
          <label className="detail-place">
            <input
              type="radio"
              name="eventMode"
              value="online"
              checked={data.mode === "online"}
              onChange={(e) => handleChange("mode", e.target.value)}
            />
            Sự kiện Online
          </label>
        </div>
      </div>

      {/* Nếu chọn Offline thì hiển thị phần địa điểm */}
      {data.mode === "offline" && (
        <div>
          <h4 >Địa điểm tổ chức</h4>

          <div className="form-section">
            <label>Tên địa điểm <span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              placeholder="Nhập tên địa điểm"
              value={data.locationName || ""}
              onChange={(e) => handleChange("locationName", e.target.value)}
              onBlur={(e) => validateField("locationName", e.target.value)}
              className={errors.locationName ? "error" : ""}
            />
            {errors.locationName && (
              <small className="error-text">{errors.locationName}</small>
            )}
          </div>

          <div className="address-grid">
            <div>
              <label className="detail-place">Tỉnh/Thành <span style={{color:"red"}}>*</span></label>
              <input
                className="place-holder"
                type="text"
                placeholder="Nhập Tỉnh/Thành"
                value={data.province || ""}
                onChange={(e) => handleChange("province", e.target.value)}
              />
            </div>
            <div>
              <label className="detail-place">Quận/Huyện <span style={{color:"red"}}>*</span></label>
              <input
                className="place-holder"
                type="text"
                placeholder="Nhập Quận/Huyện"
                value={data.district || ""}
                onChange={(e) => handleChange("district", e.target.value)}
              />
            </div>
          </div>

          <div className="address-grid">
            <div>
              <label className="detail-place">Phường/Xã <span style={{color:"red"}}>*</span></label>
              <input
                type="text"
                className="place-holder"
                placeholder="Nhập Phường/Xã"
                value={data.ward || ""}
                onChange={(e) => handleChange("ward", e.target.value)}
              />
            </div>
            <div>
              <label className="detail-place">Số nhà, đường <span style={{color:"red"}}>*</span></label>
              <input
                type="text"
                className="place-holder"
                placeholder="Nhập số nhà, đường"
                value={data.addressDetail || ""}
                onChange={(e) => handleChange("addressDetail", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Thể loại sự kiện */}
      <div className="form-section">
        <label>Thể loại sự kiện <span style={{color:"red"}}>*</span></label>
        <select
          value={data.type}
          onChange={(e) => handleChange("type", e.target.value)}
          onBlur={(e) => validateField("type", e.target.value)}
          className={errors.type ? "error" : ""}
        >
          <option value="">Vui lòng chọn</option>
          <option>Ca nhạc</option>
          <option>Tham quan</option>
          <option>Văn hóa nghệ thuật</option>
          <option>Thể thao</option>
        </select>
        {errors.type && <small className="error-text">{errors.type}</small>}
      </div>

      {/* Mô tả chi tiết */}
      <div className="form-section">
        <label>Thông tin sự kiện <span style={{color:"red"}}>*</span></label>
        <textarea
          rows="8"
          placeholder="Giới thiệu chi tiết về sự kiện..."
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
          onBlur={(e) => validateField("description", e.target.value)}
          className={errors.description ? "error" : ""}
        />
        {errors.description && (
          <small className="error-text">{errors.description}</small>
        )}
      </div>

      {/* Logo và thông tin ban tổ chức */}
      <div className="form-section organizer-section">
        <label>Thông tin ban tổ chức <span style={{color:"red"}}>*</span></label>

        <div className="organizer-row">
          <div className="upload-box organizer-logo">
            <FaFileUpload className="upload-icon" />
            <p>Logo ban tổ chức</p>
          </div>

          <div className="organizer-info">
            <label>Tên ban tổ chức <span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              placeholder="Nhập tên ban tổ chức"
              value={data.organizer || ""}
              onChange={(e) => handleChange("organizer", e.target.value)}
              onBlur={(e) => validateField("organizer", e.target.value)}
              className={errors.organizer ? "error" : ""}
            />
            {errors.organizer && (
              <small className="error-text">{errors.organizer}</small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
