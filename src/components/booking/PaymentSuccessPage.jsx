import './PaymentSuccessPage.css';

import React, {
  useEffect,
  useState,
} from 'react';

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
} from 'react-icons/fa';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import orderApi from '../../api/orderApi';
import Header from '../home/Header';

const DEFAULT_TX_LINK =
  'https://amoy.polygonscan.com/tx/0xcfabfaca11921a66edef69fbee2ab514a60de130a81e05102e34f4c1a4e7bd85';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const orderId = searchParams.get('orderCode');

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchOrder = async () => {
      try {
        setLoading(true);

        const res = await orderApi.getOrderStatus(orderId);

        if (isMounted && res.success) {
          setOrder(res.order);
        }
      } catch (err) {
        console.error('getOrderStatus error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrder();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString('vi-VN') + ' đ';

  const handleCopyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy error:', error);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="payment-loading">
          <div className="payment-spinner" />
          <h3>Đang xác nhận thanh toán</h3>
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
          <p>Đơn hàng không tồn tại hoặc thông tin chưa được cập nhật.</p>
          <button onClick={() => navigate('/')}>
            <FaHome /> Về trang chủ
          </button>
        </div>
      </>
    );
  }

  const customer = order.customer || {};
  const nfts = order.nfts || [];

  return (
    <>
      <Header />

      <main className="payment-success-page">
        <div className="payment-success-container">

          {/* Success hero */}
          <section className="success-hero">
            <div className="success-decoration success-decoration-one" />
            <div className="success-decoration success-decoration-two" />

            <div className="success-illustration">
              <div className="success-circle">
                <FaCheck />
              </div>
              <div className="success-sparkle sparkle-one">✦</div>
              <div className="success-sparkle sparkle-two">✧</div>
              <div className="success-sparkle sparkle-three">✦</div>
            </div>

            <div className="success-label">
              <FaCheckCircle />
              THANH TOÁN THÀNH CÔNG
            </div>

            <h1>Đặt vé thành công!</h1>

            <p>
              Cảm ơn bạn đã tin tưởng NFTicket.
              <br />
              Chúc bạn có một trải nghiệm sự kiện thật tuyệt vời!
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
          </section>

          {/* Order information */}
          <section className="payment-info-card">
            <div className="payment-card-heading">
              <div className="payment-heading-icon">
                <FaReceipt />
              </div>

              <div>
                <h2>Thông tin đơn hàng</h2>
                <p>Kiểm tra lại thông tin thanh toán của bạn</p>
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
                  <strong>{order.eventId?.title || order.eventId || 'Sự kiện NFTicket'}</strong>
                </div>
              </div>
            </div>

            <div className="payment-total">
              <div>
                <span>Trạng thái thanh toán</span>
                <strong className="payment-status">
                  <FaCheckCircle /> {order.status || 'Thành công'}
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
                  Vé điện tử đã được ghi nhận. Hãy lưu lại QR Code để sử dụng
                  khi tham gia sự kiện.
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
                  <article className="nft-ticket-card" key={nft._id || index}>
                    <div className="nft-ticket-main">
                      <div className="nft-ticket-top">
                        <div className="nft-ticket-type">
                          <FaTicketAlt />
                          <span>VÉ ĐIỆN TỬ NFT</span>
                        </div>
                        <span className="nft-verified">
                          <FaCheckCircle /> Đã xác nhận
                        </span>
                      </div>

                      <h3>{nft.ticketType || 'Vé tham dự sự kiện'}</h3>

                      <div className="nft-token">
                        <span>Token ID</span>
                        <strong>#{nft.tokenId ?? 'N/A'}</strong>
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

                        <a
                          href={nft.txLink || DEFAULT_TX_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Blockchain <FaExternalLinkAlt />
                        </a>
                      </div>
                    </div>

                    <div className="nft-ticket-qr">
                      {nft.qrCode ? (
                        <img
                          src={nft.qrCode}
                          alt={`QR Token ${nft.tokenId}`}
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
                <FaTicketAlt />
                <h3>Vé NFT đang được cập nhật</h3>
                <p>Thông tin vé sẽ xuất hiện tại đây khi hệ thống hoàn tất xử lý.</p>
              </div>
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
