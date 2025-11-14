import '../../styles/PrivacyPolicy.css';

import React from 'react';

import Header from './Header';

export default function PrivacyPolicyPage() {
  return (
<div>
  <Header/>
      <div className="privacy-page">
      <div className="privacy-container">
        <h1 className="privacy-title">Chính Sách Bảo Mật Ticket NFT</h1>
        <p className="privacy-updated"><strong>Cập nhật lần cuối: 14/11/2025</strong></p>

        <p className="privacy-intro">
          Chúng tôi cam kết bảo vệ thông tin cá nhân và dữ liệu người dùng khi sử dụng hệ thống LuxGo – Hệ thống bán vé sự kiện trực tuyến.
        </p>

        <section>
          <h2>1. Thông tin chúng tôi thu thập</h2>
          <ul>
            <li>Thông tin cá nhân: Họ tên, email, số điện thoại, địa chỉ.</li>
            <li>Thông tin tài khoản: Username, mật khẩu (mã hóa).</li>
            <li>Thông tin thanh toán: Thẻ ngân hàng, ví điện tử (do đối tác thanh toán lưu trữ).</li>
            <li>Dữ liệu sử dụng: Lịch sử đặt vé, sự kiện quan tâm, hành vi trên website/app.</li>
            <li>Thông tin thiết bị: Địa chỉ IP, trình duyệt, hệ điều hành, cookie.</li>
          </ul>
        </section>

        <section>
          <h2>2. Mục đích sử dụng thông tin</h2>
          <ul>
            <li>Cung cấp dịch vụ bán vé và quản lý sự kiện.</li>
            <li>Liên hệ xác nhận đặt vé, gửi khuyến mãi, thông báo quan trọng.</li>
            <li>Cá nhân hóa trải nghiệm người dùng.</li>
            <li>Phòng chống gian lận và bảo mật hệ thống.</li>
          </ul>
        </section>

        <section>
          <h2>3. Cơ chế bảo vệ dữ liệu</h2>
          <ul>
            <li>Mã hóa dữ liệu nhạy cảm.</li>
            <li>Kết nối an toàn HTTPS/SSL.</li>
            <li>Tường lửa & chống DDoS Cloudflare.</li>
            <li>Kiểm soát truy cập dữ liệu nghiêm ngặt.</li>
            <li>Sao lưu định kỳ.</li>
          </ul>
        </section>

        <section>
          <h2>4. Chia sẻ thông tin</h2>
          <p>Chúng tôi không bán hoặc cho thuê thông tin cá nhân. Chỉ chia sẻ với đối tác thanh toán hoặc khi pháp luật yêu cầu.</p>
        </section>

        <section>
          <h2>5. Cookies và công nghệ tương tự</h2>
          <p>Sử dụng cookies để cải thiện trải nghiệm, phân tích lưu lượng, quản lý phiên đăng nhập.</p>
        </section>

        <section>
          <h2>6. Quyền của người dùng</h2>
          <p>Người dùng có quyền xem, chỉnh sửa, xóa thông tin cá nhân; hủy nhận email; khiếu nại hoặc yêu cầu hỗ trợ về dữ liệu.</p>
        </section>

        <section>
          <h2>7. Thay đổi chính sách bảo mật</h2>
          <p>LuxGo có thể cập nhật chính sách để phù hợp pháp luật và cải thiện dịch vụ. Thông báo sẽ được đăng trên website/app.</p>
        </section>

        <section>
          <h2>8. Liên hệ</h2>
          <p>Email: chamsockhachhang@nftticket.vn</p>
          <p>Điện thoại: 0243.788.00.99 (8:30 - 17:00)</p>
          <p>Hotline: 08.999.80.818</p>
        </section>
      </div>
    </div>
</div>
  );
}
