import "./PaymentConfirmPage.css";

import React from "react";

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
  FaExclamationCircle,
} from "react-icons/fa";

import { QRCodeSVG } from "qrcode.react";

import { useLocation, useNavigate } from "react-router-dom";

import Header from "../home/Header";

export default function PaymentConfirmPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order;

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("vi-VN") + " đ";

  const paymentUrl = order?.paymentUrl || order?.payUrl;
  const customer = order?.customer || {};

  const eventName =
    order?.eventName || order?.eventId?.name || "Sự kiện NFTicket";

  const orderStatus = {
    pending: {
      label: "Chờ thanh toán",
      icon: <FaClock />,
      className: "confirm-pending",
    },
    paid: {
      label: "Đã thanh toán",
      icon: <FaCheckCircle />,
      className: "confirm-paid",
    },
    failed: {
      label: "Thanh toán thất bại",
      icon: <FaExclamationCircle />,
      className: "confirm-failed",
    },
    review: {
      label: "Đang đối soát",
      icon: <FaClock />,
      className: "confirm-review",
    },
  };

  const currentStatus = orderStatus[order?.status] || orderStatus.pending;

  const handlePayment = () => {
    if (!paymentUrl) {
      alert("Không tìm thấy đường dẫn thanh toán. Vui lòng thử lại!");
      return;
    }

    window.location.href = paymentUrl;
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
              Thông tin đơn hàng không tồn tại hoặc đã bị mất. Vui lòng quay lại
              và thực hiện đặt vé.
            </p>

            <button onClick={() => navigate("/")}>
              <FaHome /> Về trang chủ
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="payment-confirm-page">
        <div className="confirm-container">
          {/* Breadcrumb */}
          <div className="confirm-breadcrumb">
            <span onClick={() => navigate("/")}>Trang chủ</span>
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
                Kiểm tra thông tin đơn hàng và hoàn tất thanh toán để sở hữu vé
                tham dự sự kiện.
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

            <div
              className={`confirm-step ${
                order.status === "paid" ? "completed" : "current"
              }`}
            >
              <div className="confirm-step-icon">
                {order.status === "paid" ? <FaCheckCircle /> : "2"}
              </div>
              <span>Thanh toán</span>
            </div>

            <div
              className={`confirm-progress-line ${
                order.status === "paid" ? "active" : ""
              }`}
            />

            <div
              className={`confirm-step ${
                order.status === "paid" ? "completed" : ""
              }`}
            >
              <div className="confirm-step-icon">
                {order.status === "paid" ? <FaCheckCircle /> : "3"}
              </div>
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
                    <p>Thông tin vé và người đặt</p>
                  </div>
                </div>

                {/* Order code */}
                <div className="confirm-order-code">
                  <div>
                    <span>MÃ ĐƠN HÀNG</span>
                    <strong>{order.orderId || "N/A"}</strong>
                  </div>

                  <span className={currentStatus.className}>
                    {currentStatus.icon}
                    {currentStatus.label}
                  </span>
                </div>

                {/* Customer information */}
                <div className="confirm-info-list">
                  <div className="confirm-info-item">
                    <div className="confirm-info-icon">
                      <FaUser />
                    </div>

                    <div>
                      <span>Khách hàng</span>
                      <strong>{customer.name || "Chưa cập nhật"}</strong>
                    </div>
                  </div>

                  <div className="confirm-info-item">
                    <div className="confirm-info-icon">
                      <FaEnvelope />
                    </div>

                    <div>
                      <span>Email nhận thông tin vé</span>
                      <strong>{customer.email || "Chưa cập nhật"}</strong>
                    </div>
                  </div>

                  <div className="confirm-info-item">
                    <div className="confirm-info-icon">
                      <FaPhone />
                    </div>

                    <div>
                      <span>Số điện thoại</span>
                      <strong>{customer.phone || "Chưa cập nhật"}</strong>
                    </div>
                  </div>

                  <div className="confirm-info-item">
                    <div className="confirm-info-icon">
                      <FaTicketAlt />
                    </div>

                    <div>
                      <span>Sự kiện</span>
                      <strong>{eventName}</strong>
                    </div>
                  </div>
                </div>

                {/* Ticket list */}
                {/* Ticket list */}
                <div className="confirm-ticket-list">
                  <h3>Danh sách vé đã đặt</h3>

                  {order.tickets?.length > 0 ? (
                    order.tickets.map((ticket) => (
                      <div className="confirm-ticket-item" key={ticket._id}>
                        <div className="confirm-ticket-info">
                          <strong>{ticket.ticketType}</strong>

                          <span>
                            {ticket.zone} · Ghế {ticket.seat}
                          </span>
                        </div>

                        <strong>{formatPrice(ticket.price)}</strong>
                      </div>
                    ))
                  ) : (
                    <p className="confirm-no-ticket">
                      Không có thông tin chi tiết vé.
                    </p>
                  )}
                </div>

                {/* Total */}
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
                    Giao dịch được thực hiện thông qua cổng thanh toán PayOS.
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

                {/* Amount */}
                <div className="payment-amount">
                  <span>SỐ TIỀN CẦN THANH TOÁN</span>

                  <strong>{formatPrice(order.totalAmount)}</strong>

                  <div className="payment-amount-status">
                    <span />
                    {currentStatus.label}
                  </div>
                </div>

                {/* Payment QR */}
                {order.status === "pending" && order.qrCode ? (
                  <div className="confirm-qr-wrapper">
                    <div className="confirm-qr-heading">
                      <FaQrcode />
                      Quét mã QR để thanh toán
                    </div>

                    <div className="confirm-qr-image">
                      <QRCodeSVG
                        value={order.qrCode}
                        size={220}
                        level="M"
                        includeMargin
                      />
                    </div>

                    <p className="confirm-qr-note">
                      Mở ứng dụng ngân hàng hoặc ví điện tử, sau đó quét mã QR
                      để thực hiện thanh toán.
                    </p>
                  </div>
                ) : order.status === "paid" ? (
                  <div className="confirm-payment-result success">
                    <FaCheckCircle />
                    <strong>Thanh toán thành công</strong>
                    <p>Đơn hàng đã được xác nhận. Vé NFT đang được xử lý.</p>
                  </div>
                ) : order.status === "failed" ? (
                  <div className="confirm-payment-result failed">
                    <FaExclamationCircle />
                    <strong>Thanh toán thất bại</strong>
                    <p>
                      Đơn hàng không còn ở trạng thái chờ thanh toán. Vui lòng
                      kiểm tra lại thông tin đơn hàng.
                    </p>
                  </div>
                ) : order.status === "review" ? (
                  <div className="confirm-payment-result review">
                    <FaClock />
                    <strong>Đơn hàng đang được đối soát</strong>
                    <p>
                      Vui lòng chờ hệ thống kiểm tra giao dịch. Không thực hiện
                      thanh toán lại lúc này.
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

                {/* Payment button */}
                {order.status === "pending" && (
                  <button
                    className="btn-pay"
                    onClick={handlePayment}
                    disabled={!paymentUrl}
                  >
                    <FaLock />
                    Thanh toán ngay
                    <FaArrowRight />
                  </button>
                )}

                <div className="payment-method-footer">
                  <FaShieldAlt />
                  <span>Giao dịch được bảo vệ bởi PayOS</span>
                </div>
              </div>

              {/* Help */}
              <div className="confirm-help">
                <strong>Bạn cần hỗ trợ?</strong>

                <p>
                  Nếu gặp vấn đề trong quá trình thanh toán, vui lòng liên hệ bộ
                  phận hỗ trợ của NFTicket.
                </p>
              </div>
            </aside>
          </div>

          {/* Bottom */}
          <div className="confirm-bottom">
            <button onClick={() => navigate("/")}>
              <FaHome />
              Quay lại trang chủ
            </button>

            <span>© NFTicket – Your ticket, your experience.</span>
          </div>
        </div>
      </main>
    </>
  );
}
