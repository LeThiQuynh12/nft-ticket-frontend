// src/components/booking/PaymentSuccessPage.jsx
import React, {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import orderApi from '../../api/orderApi';
import Header from '../home/Header';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy orderId từ query string (khác với orderCode của PayOS)
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await orderApi.getOrderStatus(orderId); // gọi đúng orderId
        if (res.success) setOrder(res.order);
      } catch (err) {
        console.error('getOrderStatus error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Đang tải thông tin đơn hàng...</p>;

  if (!order) {
    return (
      <div>
        <Header />
        <p>Không tìm thấy đơn hàng!</p>
        <button onClick={() => navigate('/')}>Về trang chủ</button>
      </div>
    );
  }

  return (
    <div className="payment-confirm">
      <Header />
      <div className="container">
        <h2>Cảm ơn bạn đã đặt vé!</h2>

        <div className="order-box">
          <p><strong>Mã đơn hàng:</strong> {order.orderId}</p>
          <p><strong>Khách hàng:</strong> {order.customer.name}</p>
          <p><strong>Email:</strong> {order.customer.email}</p>
          <p><strong>Số điện thoại:</strong> {order.customer.phone}</p>
          <p><strong>Sự kiện:</strong> {order.eventId}</p>
          <p><strong>Tổng tiền:</strong> {order.totalAmount.toLocaleString()} VND</p>
          <p><strong>Trạng thái:</strong> {order.status}</p>
        </div>

        <button className="btn-back" onClick={() => navigate('/')}>
          ← Quay lại trang chủ
        </button>
      </div>
    </div>
  );
}
