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

const DEFAULT_TX_LINK =
  "https://amoy.polygonscan.com/tx/0xcfabfaca11921a66edef69fbee2ab514a60de130a81e05102e34f4c1a4e7bd85";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get("orderCode");

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await orderApi.getOrderStatus(orderId);
        if (res.success) {
          setOrder(res.order);
        } else {
          console.warn("Order not found for", orderId);
        }
      } catch (err) {
        console.error("getOrderStatus error:", err);
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
        <div className="container-payment-confirm">
          <p>Không tìm thấy đơn hàng!</p>
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
          <h2 style={{ color: "#000" }}>Cảm ơn bạn đã đặt vé ạ!</h2>

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

            {order.paymentUrl && (
              <p>
                <strong>Link thanh toán:</strong>{" "}
                <a
                  href={order.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mở PayOS
                </a>
              </p>
            )}
          </div>

          {/* Hiển thị vé NFT */}
          {order.nfts && order.nfts.length > 0 && (
            <div className="nft-list">
              <h3>Vé NFT của bạn</h3>
              <table className="categories-table">
                <thead>
                  <tr>
                    <th>Token ID</th>
                    <th>Loại vé</th>
                    <th>Metadata (IPFS)</th>
                    <th>Giao dịch</th>
                    <th>QR Code</th> {/* Cột mới */}
                  </tr>
                </thead>
                <tbody>
                  {order.nfts.map((nft) => (
                    <tr key={nft._id}>
                      <td>{nft.tokenId}</td>
                      <td>{nft.ticketType}</td>
                      <td>
                        <a
                          href={nft.metadataURI}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Xem IPFS
                        </a>
                      </td>
                      <td>
                        <a
                          href={nft.txLink || DEFAULT_TX_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Xem giao dịch
                        </a>
                      </td>
                      <td>
                        {nft.qrCode ? (
                          <img
                            src={nft.qrCode}
                            alt={`QR Token ${nft.tokenId}`}
                            style={{ width: 100, height: 100 }}
                          />
                        ) : (
                          <span>Chưa có QR</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button className="btn-back-success" onClick={() => navigate("/")}>
            ← Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
