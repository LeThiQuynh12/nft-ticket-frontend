// src/components/booking/PaymentMethods.jsx
import React from 'react';

export default function PaymentMethods() {
  const methods = [
    "Chuyển khoản VietQR / Bank transfer VietQR",
    "Ví ZaloPay / ZaloPay Wallet",
    "Thẻ tín dụng quốc tế (Visa/Master/JCB/AMEX)",
    "Thẻ tín dụng nội địa Việt Nam",
    "ATM / Internet Banking",
  ];

  return (
    <div className="payment-methods">
      <h3>LỰA CHỌN THANH TOÁN / PAYMENT METHOD</h3>
      {methods.map((m, i) => (
        <label key={i} className="radio-row">
          <input type="radio" name="payment" />
          {m}
        </label>
      ))}
    </div>
  );
}
