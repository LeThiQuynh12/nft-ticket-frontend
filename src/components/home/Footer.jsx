import '../../styles/Footer.css';

import React from 'react';

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { Link } from 'react-router-dom'; // <-- import Link

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1: Liên hệ hợp tác */}
        <div className="footer-column">
          <h4>Liên Hệ Hợp Tác</h4>
          <p>Điện thoại: 0243.788.00.99 (8:30 - 17:00)</p>
          <p>Hotline: 08.999.80.818</p>
          <p>Email: <a href="mailto:chamsockhachhang@nftticket.vn">chamsockhachhang@nftticket.vn</a></p>
          <p>Địa chỉ: Số 22, ngõ 16 Cổ Nhuế, Bắc Từ Liêm, Hà Nội.</p>
          <p>Ứng dụng LuxGo</p>
          <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="app-store" />
        </div>

        {/* Cột 2: Thông tin */}
        <div className="footer-column">
          <h4>Thông tin</h4>
          <ul>
            <li>Về chúng tôi</li>
            <li>Khuyến mãi</li>
            <li>Phương thức thanh toán</li>
            <li>
              {/* Link tới trang chính sách bảo mật */}
              <Link to="/privacy-policy" className="footer-link">
                Chính sách bảo mật và điều khoản
              </Link>
            </li>
            <li>Hướng dẫn đặt vé</li>
            <li>Các câu hỏi thường gặp</li>
            <li>Chính sách điều khoản sử dụng</li>
          </ul>
        </div>

        {/* Cột 3: Khách hàng */}
        <div className="footer-column">
          <h4>Khách hàng</h4>
          <ul>
            <li>Đăng nhập dành cho đối tác</li>
            <li>Tài khoản</li>
            <li>Gửi sự kiện</li>
            <li>Danh sách sự kiện</li>
            <li>Sự kiện đã diễn ra</li>
            <li>Chương trình Go Xu</li>
          </ul>
        </div>

        {/* Cột 4: Đăng ký email */}
        <div className="footer-column">
          <h4>Đăng ký nhận email</h4>
          <div className="email-box">
            <input type="email" placeholder="Email của bạn" />
            <button>→</button>
          </div>
          <div className="social-icons">
            <FaFacebookF className="icon fb" />
            <FaPinterestP className="icon pin" />
            <FaTwitter className="icon tw" />
            <FaInstagram className="icon ig" />
            <FaLinkedinIn className="icon in" />
            <FaYoutube className="icon yt" />
          </div>

          <p className="license">
            Giấy phép Kinh doanh số 0107641285 do<br />
            Sở Kế Hoạch &amp; Đầu Tư TP Hà Nội cấp ngày 21/11/2016
          </p>
          <div className="badges">
            <img src="https://diendantructuyen.com/wp-content/uploads/2025/04/logo-bo-cong-thuong-4.jpg" alt="Thông báo bộ công thương" />
            <img src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_11_19_638360262057517498_dcma-la-gi-1.jpg" alt="DMCA" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Bạn đang truy cập LuxGo phiên bản demo — Clone NftTicket.vn (2025)
        </p>
      </div>
    </footer>
  );
}
