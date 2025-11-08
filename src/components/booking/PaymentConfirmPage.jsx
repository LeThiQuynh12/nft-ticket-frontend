import './PaymentConfirmPage.css';

// File: src/components/booking/PaymentConfirmPage.jsx
import React from 'react';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Header from '../home/Header';

export default function PaymentConfirmPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order) {
    return (
      <div className="payment-confirm">
        <Header />
        <div className="container-payment-confirm">
          <h2>Không có thông tin đơn hàng</h2>
          <button onClick={() => navigate("/")}>Về trang chủ</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="payment-confirm">
        <div className="container-payment-confirm">
          <h2 style={{ color: "#000" }}>XÁC NHẬN THANH TOÁN</h2>

          <div className="order-box">
            <p>
              <strong>Mã đơn hàng:</strong> {order.orderId}
            </p>
            <p>
              <strong>Khách hàng:</strong> {order.customer.name}
            </p>
            <p>
              <strong>Email:</strong> {order.customer.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {order.customer.phone}
            </p>
            <p>
              <strong>Sự kiện:</strong> {order.eventId}
            </p>
            <p>
              <strong>Tổng tiền:</strong> {order.totalAmount.toLocaleString()}{" "}
              VND
            </p>
            <p>
              <strong>Trạng thái:</strong> {order.status}
            </p>
          </div>

          {order.qrCode && (
            <div className="qr-box">
              <img src={order.qrCode} alt="QR Code" />
              <p>Quét mã QR để thanh toán</p>
            </div>
          )}

          <button
            className="btn-pay"
            onClick={() => (window.location.href = order.paymentUrl)}
          >
            Thanh toán ngay
          </button>

          <button className="btn-back" onClick={() => navigate("/")}>
            ← Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
