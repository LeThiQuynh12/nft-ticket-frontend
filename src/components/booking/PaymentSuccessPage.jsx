import './PaymentSuccessPage.css';

import React, { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCheck,
  FaCheckCircle,
  FaCopy,
  FaEnvelope,
  FaExternalLinkAlt,
  FaHome,
  FaPhone,
  FaReceipt,
  FaTicketAlt,
  FaUser,
  FaWallet,
  FaClock,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';

import orderApi from '../../api/orderApi';
import Header from '../home/Header';

const POLL_INTERVAL = 3000;
const MAX_POLL_ATTEMPTS = 20;

const formatPrice = (price) =>
  `${Number(price || 0).toLocaleString('vi-VN')} đ`;

const getPaymentStatus = (status) => {
  switch (status) {
    case 'paid':
      return { label: 'Đã thanh toán', type: 'success' };
    case 'pending':
      return { label: 'Đang xác nhận', type: 'pending' };
    case 'failed':
      return { label: 'Thanh toán thất bại', type: 'failed' };
    case 'review':
      return { label: 'Đang được kiểm tra', type: 'review' };
    default:
      return { label: status || 'Chưa xác định', type: 'pending' };
  }
};

const getNftStatus = (status) => {
  switch (status) {
    case 'minted':
      return { label: 'NFT đã được tạo', type: 'success' };
    case 'minting':
      return { label: 'Đang tạo NFT', type: 'pending' };
    case 'failed':
      return { label: 'Tạo NFT chưa thành công', type: 'failed' };
    default:
      return { label: 'Đang chờ xử lý NFT', type: 'pending' };
  }
};

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const orderId = searchParams.get('orderCode');

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return undefined;
    }

    let isMounted = true;
    let timeoutId;
    let attempts = 0;

    const fetchOrder = async () => {
      try {
        const res = await orderApi.getOrderStatus(orderId);

        if (!isMounted) return;

        if (res?.success && res.order) {
          const latestOrder = res.order;
          setOrder(latestOrder);
          setLoading(false);

          const tickets = latestOrder.tickets || [];
          const allNftsProcessed =
            tickets.length > 0 &&
            tickets.every((ticket) =>
              ['minted', 'failed'].includes(ticket.nftStatus)
            );

          const shouldPoll =
            attempts < MAX_POLL_ATTEMPTS &&
            (latestOrder.status === 'pending' ||
              (latestOrder.status === 'paid' &&
                tickets.length > 0 &&
                !allNftsProcessed));

          if (shouldPoll) {
            attempts += 1;
            timeoutId = setTimeout(fetchOrder, POLL_INTERVAL);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('getOrderStatus error:', error);
        if (isMounted) setLoading(false);
      }
    };

    fetchOrder();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [orderId]);

  const handleCopyOrderId = async () => {
    if (!order?.orderId) return;

    try {
      await navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy error:', error);
      setCopyError(true);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="payment-loading">
          <div className="payment-spinner" />
          <h3>Đang tải thông tin đơn hàng</h3>
          <p>Vui lòng chờ trong giây lát...</p>
        </div>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <div className="payment-error">
          <div className="payment-error-icon">!</div>
          <h2>Không tìm thấy đơn hàng</h2>
          <p>
            Không tìm thấy thông tin đơn hàng. Bạn hãy kiểm tra lại mã đơn hàng
            hoặc liên hệ bộ phận hỗ trợ.
          </p>
          <button onClick={() => navigate('/')}>
            <FaHome /> Về trang chủ
          </button>
        </div>
      </>
    );
  }

  const customer = order.customer || {};
  const tickets = order.tickets || [];
  const nfts = order.nfts || [];
  const event =
    order.eventId && typeof order.eventId === 'object'
      ? order.eventId
      : null;
  const eventName = event?.name || 'Sự kiện NFTicket';
  const paymentStatus = getPaymentStatus(order.status);
  const isPaid = order.status === 'paid';

  return (
    <>
      <Header />

      <main className="payment-success-page">
        <div className="payment-success-container">
          {/* Payment result */}
          <section className={`success-hero success-hero-${paymentStatus.type}`}>
            <div className="success-decoration success-decoration-one" />
            <div className="success-decoration success-decoration-two" />

            <div className="success-illustration">
              <div className="success-circle">
                {isPaid ? (
                  <FaCheck />
                ) : order.status === 'failed' ? (
                  <FaExclamationTriangle />
                ) : (
                  <FaClock />
                )}
              </div>
              <div className="success-sparkle sparkle-one">✦</div>
              <div className="success-sparkle sparkle-two">✧</div>
              <div className="success-sparkle sparkle-three">✦</div>
            </div>

            <div className="success-label">
              {isPaid ? <FaCheckCircle /> : <FaClock />}
              {isPaid
                ? 'THANH TOÁN THÀNH CÔNG'
                : paymentStatus.label.toLocaleUpperCase('vi-VN')}
            </div>

            <h2 style={{ color: "#fff" }} >
              {isPaid
                ? 'Đặt vé thành công!'
                : order.status === 'failed'
                  ? 'Thanh toán chưa thành công'
                  : order.status === 'review'
                    ? 'Đơn hàng đang được kiểm tra'
                    : 'Đang xác nhận thanh toán'}
            </h2>

            <p>
              {isPaid
                ? 'Cảm ơn bạn đã tin tưởng NFTicket. Chúc bạn có một trải nghiệm sự kiện thật tuyệt vời!'
                : order.status === 'failed'
                  ? 'Giao dịch chưa được xác nhận. Vui lòng kiểm tra lại trạng thái đơn hàng trước khi đặt vé mới.'
                  : 'Hệ thống đang đối soát giao dịch với PayOS. Vui lòng chờ và không thực hiện thanh toán lặp lại.'}
            </p>

            <div className="success-order-code">
              <div>
                <span>MÃ ĐƠN HÀNG</span>
                <strong>{order.orderId}</strong>
              </div>
              <button onClick={handleCopyOrderId} title="Sao chép mã đơn hàng">
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? 'Đã sao chép' : 'Sao chép'}
              </button>
            </div>
            {copyError && (
              <p className="payment-copy-error">
                Không thể sao chép mã đơn hàng trên trình duyệt này.
              </p>
            )}
          </section>

          {/* Order information */}
          <section className="payment-info-card">
            <div className="payment-card-heading">
              <div className="payment-heading-icon">
                <FaReceipt />
              </div>
              <div>
                <h2>Thông tin đơn hàng</h2>
                <p>Thông tin thanh toán và người đặt vé</p>
              </div>
            </div>

            <div className="payment-info-grid">
              <div className="payment-info-item">
                <div className="payment-info-icon">
                  <FaUser />
                </div>
                <div>
                  <span>Khách hàng</span>
                  <strong>{customer.name || 'Chưa cập nhật'}</strong>
                </div>
              </div>

              <div className="payment-info-item">
                <div className="payment-info-icon">
                  <FaEnvelope />
                </div>
                <div>
                  <span>Email</span>
                  <strong>{customer.email || 'Chưa cập nhật'}</strong>
                </div>
              </div>

              <div className="payment-info-item">
                <div className="payment-info-icon">
                  <FaPhone />
                </div>
                <div>
                  <span>Số điện thoại</span>
                  <strong>{customer.phone || 'Chưa cập nhật'}</strong>
                </div>
              </div>

              <div className="payment-info-item">
                <div className="payment-info-icon">
                  <FaTicketAlt />
                </div>
                <div>
                  <span>Sự kiện</span>
                  <strong>{eventName}</strong>
                </div>
              </div>
            </div>

            <div className="payment-total">
              <div>
                <span>Trạng thái thanh toán</span>
                <strong className={`payment-status payment-status-${paymentStatus.type}`}>
                  {paymentStatus.type === 'success' ? (
                    <FaCheckCircle />
                  ) : (
                    <FaClock />
                  )}
                  {paymentStatus.label}
                </strong>
              </div>

              <div className="payment-total-price">
                <span>Tổng thanh toán</span>
                <strong>{formatPrice(order.totalAmount)}</strong>
              </div>
            </div>

            {order.paymentUrl && (
              <a
                className="payment-provider-link"
                href={order.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWallet />
                Xem thông tin PayOS
                <FaExternalLinkAlt />
              </a>
            )}
          </section>

          {/* NFT tickets */}
          <section className="nft-section">
            <div className="nft-section-heading">
              <div>
                <div className="nft-heading-label">
                  <FaTicketAlt /> YOUR DIGITAL TICKETS
                </div>
                <h2>Vé NFT của bạn</h2>
                <p>
                  {isPaid
                    ? 'Mỗi vé được phát hành dưới dạng NFT trên Polygon Amoy. Lưu QR Code để sử dụng khi check-in.'
                    : 'Vé NFT sẽ được hiển thị sau khi thanh toán được xác nhận.'}
                </p>
              </div>

              <div className="nft-count">
                <strong>{nfts.length}</strong>
                <span>VÉ NFT</span>
              </div>
            </div>

            {nfts.length > 0 ? (
              <div className="nft-ticket-list">
                {nfts.map((nft, index) => (
                  <article className="nft-ticket-card" key={nft._id || nft.ticketId || index}>
                    <div className="nft-ticket-main">
                      <div className="nft-ticket-top">
                        <div className="nft-ticket-type">
                          <FaTicketAlt />
                          <span>VÉ ĐIỆN TỬ NFT</span>
                        </div>
                        <span className="nft-verified">
                          <FaCheckCircle /> Đã mint
                        </span>
                      </div>

                      <h3>{nft.ticketType || 'Vé tham dự sự kiện'}</h3>

                      <div className="nft-ticket-details">
                        <div>
                          <span>Khu vực</span>
                          <strong>{nft.zone || '—'}</strong>
                        </div>
                        <div>
                          <span>Ghế</span>
                          <strong>{nft.seat || '—'}</strong>
                        </div>
                      </div>

                      <div className="nft-token">
                        <span>Token ID</span>
                        <strong>#{nft.tokenId || 'N/A'}</strong>
                      </div>

                      <div className="nft-divider">
                        <span />
                        <span />
                      </div>

                      <div className="nft-actions">
                        {nft.metadataURI && (
                          <a
                            href={nft.metadataURI}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Xem Metadata <FaExternalLinkAlt />
                          </a>
                        )}

                        {nft.txLink && (
                          <a
                            href={nft.txLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Blockchain <FaExternalLinkAlt />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="nft-ticket-qr">
                      {nft.qrCode ? (
                        <img
                          src={nft.qrCode}
                          alt={`QR vé NFT ${nft.tokenId || ''}`}
                        />
                      ) : (
                        <div className="nft-no-qr">
                          <FaTicketAlt />
                          <span>Chưa có QR Code</span>
                        </div>
                      )}
                      <span>QUÉT MÃ ĐỂ CHECK-IN</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="nft-empty">
                {isPaid ? <FaClock /> : <FaTicketAlt />}
                <h3>
                  {isPaid
                    ? 'NFT đang được xử lý'
                    : 'Chưa có vé NFT'}
                </h3>
                <p>
                  {isPaid
                    ? 'Thanh toán đã được ghi nhận. Hệ thống đang tạo metadata, mint NFT và sinh QR Code cho từng vé. Vui lòng tải lại trang sau ít phút nếu vé chưa xuất hiện.'
                    : 'Vé NFT chỉ được phát hành sau khi đơn hàng được xác nhận đã thanh toán.'}
                </p>
              </div>
            )}

            {tickets.some((ticket) => ticket.nftStatus === 'failed') && (
              <div className="nft-processing-warning">
                <FaExclamationTriangle />
                <span>
                  Một số vé chưa tạo được NFT. Đơn hàng vẫn được ghi nhận; vui lòng liên hệ hỗ trợ và cung cấp mã đơn hàng để được kiểm tra.
                </span>
              </div>
            )}

            {tickets.some((ticket) =>
              ['pending', 'minting'].includes(ticket.nftStatus)
            ) && (
              <p className="nft-processing-note">
                <FaClock /> NFT đang được xử lý trên blockchain. Trang sẽ tự động cập nhật trong khoảng 1 phút đầu.
              </p>
            )}
          </section>

          {/* Footer actions */}
          <section className="payment-footer">
            <div className="payment-footer-icon">
              <FaCalendarCheck />
            </div>
            <div className="payment-footer-text">
              <h3>Sẵn sàng cho sự kiện tiếp theo?</h3>
              <p>Khám phá những sự kiện hấp dẫn đang chờ bạn.</p>
            </div>
            <button
              className="payment-home-button"
              onClick={() => navigate('/')}
            >
              Khám phá sự kiện
              <FaArrowRight />
            </button>
          </section>

          <p className="payment-copyright">
            © NFTicket – Your ticket, your experience.
          </p>
        </div>
      </main>
    </>
  );
}
