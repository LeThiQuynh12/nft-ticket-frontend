import './PaymentConfirmPage.css';

import React from 'react';

import {
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaHome,
  FaLock,
  FaPhone,
  FaQrcode,
  FaReceipt,
  FaShieldAlt,
  FaTicketAlt,
  FaUser,
  FaWallet,
} from 'react-icons/fa';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Header from '../home/Header';

export default function PaymentConfirmPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order;

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString('vi-VN') + ' đ';

  const handlePayment = () => {
    if (!order?.paymentUrl) {
      alert('Không tìm thấy đường dẫn thanh toán. Vui lòng thử lại!');
      return;
    }

    window.location.href = order.paymentUrl;
  };

  if (!order) {
    return (
      <>
        <Header />
        <main className="payment-confirm-page">
          <div className="confirm-empty">
            <div className="confirm-empty-icon">
              <FaReceipt />
            </div>
            <h2>Không tìm thấy đơn hàng</h2>
            <p>
              Thông tin đơn hàng không tồn tại hoặc đã bị mất.
              Vui lòng quay lại và thực hiện đặt vé.
            </p>
            <button onClick={() => navigate('/')}>
              <FaHome /> Về trang chủ
            </button>
          </div>
        </main>
      </>
    );
  }

  const customer = order.customer || {};

  return (
    <>
      <Header />

      <main className="payment-confirm-page">
        <div className="confirm-container">

          {/* Breadcrumb */}
          <div className="confirm-breadcrumb">
            <span onClick={() => navigate('/')}>Trang chủ</span>
            <FaArrowRight />
            <span>Đặt vé</span>
            <FaArrowRight />
            <strong>Thanh toán</strong>
          </div>

          {/* Page heading */}
          <div className="confirm-heading">
            <div className="confirm-heading-icon">
              <FaTicketAlt />
            </div>

            <div>
              <h2>Xác nhận thanh toán</h2>
              <p>
                Đơn hàng của bạn đã được tạo. Hoàn tất thanh toán để sở hữu
                vé tham dự sự kiện.
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="confirm-progress">
            <div className="confirm-step completed">
              <div className="confirm-step-icon">
                <FaCheckCircle />
              </div>
              <span>Chọn vé</span>
            </div>

            <div className="confirm-progress-line active" />

            <div className="confirm-step current">
              <div className="confirm-step-icon">2</div>
              <span>Thanh toán</span>
            </div>

            <div className="confirm-progress-line" />

            <div className="confirm-step">
              <div className="confirm-step-icon">3</div>
              <span>Hoàn tất</span>
            </div>
          </div>

          <div className="confirm-layout">

            {/* Left: Order details */}
            <section className="confirm-left">

              <div className="confirm-card">
                <div className="confirm-card-heading">
                  <div className="confirm-card-icon">
                    <FaReceipt />
                  </div>

                  <div>
                    <h2>Chi tiết đơn hàng</h2>
                    <p>Kiểm tra thông tin trước khi thanh toán</p>
                  </div>
                </div>

                <div className="confirm-order-code">
                  <div>
                    <span>MÃ ĐƠN HÀNG</span>
                    <strong>{order.orderId || 'N/A'}</strong>
                  </div>

                  <span className="confirm-pending">
                    <FaClock /> Chờ thanh toán
                  </span>
                </div>

                <div className="confirm-info-list">
                  <div className="confirm-info-item">
                    <div className="confirm-info-icon">
                      <FaUser />
                    </div>
                    <div>
                      <span>Khách hàng</span>
                      <strong>{customer.name || 'Chưa cập nhật'}</strong>
                    </div>
                  </div>

                  <div className="confirm-info-item">
                    <div className="confirm-info-icon">
                      <FaEnvelope />
                    </div>
                    <div>
                      <span>Email nhận thông tin vé</span>
                      <strong>{customer.email || 'Chưa cập nhật'}</strong>
                    </div>
                  </div>

                  <div className="confirm-info-item">
                    <div className="confirm-info-icon">
                      <FaPhone />
                    </div>
                    <div>
                      <span>Số điện thoại</span>
                      <strong>{customer.phone || 'Chưa cập nhật'}</strong>
                    </div>
                  </div>

                  <div className="confirm-info-item">
                    <div className="confirm-info-icon">
                      <FaTicketAlt />
                    </div>
                    <div>
                      <span>Sự kiện</span>
                      <strong>
                        {order.eventId?.title || order.eventId || 'Sự kiện NFTicket'}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="confirm-total">
                  <div>
                    <span>Tổng thanh toán</span>
                    <small>Đã bao gồm các khoản phí trong đơn hàng</small>
                  </div>

                  <strong>{formatPrice(order.totalAmount)}</strong>
                </div>
              </div>

              {/* Security information */}
              <div className="confirm-security">
                <div className="confirm-security-icon">
                  <FaShieldAlt />
                </div>

                <div>
                  <strong>Thanh toán an toàn và bảo mật</strong>
                  <p>
                    Giao dịch được thực hiện thông qua cổng thanh toán
                    PayOS.
                  </p>
                </div>

                <FaLock className="confirm-lock-icon" />
              </div>
            </section>

            {/* Right: Payment */}
            <aside className="confirm-right">
              <div className="payment-method-card">

                <div className="payment-method-heading">
                  <div className="payment-method-icon">
                    <FaWallet />
                  </div>

                  <div>
                    <h2>Thanh toán đơn hàng</h2>
                    <p>Hoàn tất giao dịch của bạn</p>
                  </div>
                </div>

                <div className="payment-amount">
                  <span>SỐ TIỀN CẦN THANH TOÁN</span>
                  <strong>{formatPrice(order.totalAmount)}</strong>
                  <div className="payment-amount-status">
                    <span /> Đơn hàng đang chờ thanh toán
                  </div>
                </div>

                {order.qrCode ? (
                  <div className="confirm-qr-wrapper">
                    <div className="confirm-qr-heading">
                      <FaQrcode />
                      Quét mã QR để thanh toán
                    </div>

                    <div className="confirm-qr-image">
                      <img src={order.qrCode} alt="QR thanh toán PayOS" />
                    </div>

                    <p className="confirm-qr-note">
                      Mở ứng dụng ngân hàng hoặc ví điện tử,
                      sau đó quét mã QR để thực hiện thanh toán.
                    </p>
                  </div>
                ) : (
                  <div className="confirm-no-qr">
                    <FaWallet />
                    <strong>Thanh toán trực tuyến</strong>
                    <p>
                      Nhấn nút bên dưới để chuyển đến cổng thanh toán PayOS.
                    </p>
                  </div>
                )}

                <button
                  className="btn-pay"
                  onClick={handlePayment}
                  disabled={!order.paymentUrl}
                >
                  <FaLock />
                  Thanh toán ngay
                  <FaArrowRight />
                </button>

                <div className="payment-method-footer">
                  <FaShieldAlt />
                  <span>Giao dịch được bảo vệ bởi PayOS</span>
                </div>
              </div>

              <div className="confirm-help">
                <strong>Bạn cần hỗ trợ?</strong>
                <p>
                  Nếu gặp vấn đề trong quá trình thanh toán, vui lòng
                  liên hệ bộ phận hỗ trợ của NFTicket.
                </p>
              </div>
            </aside>
          </div>

          <div className="confirm-bottom">
            <button onClick={() => navigate('/')}>
              <FaHome /> Quay lại trang chủ
            </button>

            <span>© NFTicket – Your ticket, your experience.</span>
          </div>

        </div>
      </main>
    </>
  );
}
