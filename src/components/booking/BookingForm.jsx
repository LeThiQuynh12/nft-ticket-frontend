// src/components/booking/BookingForm.jsx
import React from 'react';

export default function BookingForm() {
  return (
    <div className="booking-form">
      <h3>THÔNG TIN KHÁCH HÀNG / CUSTOMER INFORMATION</h3>
      <label>Họ tên / Fullname:</label>
      <input type="text" />

      <label>Điện thoại / Phone:</label>
      <input type="text" />

      <label>Email:</label>
      <input type="email" />

      <label>Địa chỉ / Address:</label>
      <input type="text" />
    </div>
  );
}
