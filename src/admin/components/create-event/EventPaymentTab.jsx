import '../../styles/EventPaymentTab.css';

import React from 'react';

export default function EventPaymentTab() {
  return (
    <div className="payment-tab">
      <h3 className="payment-title">Thanh toán qua Payos</h3>
      <p className="payment-subtext">
        Tất cả thanh toán sẽ được xử lý qua Payos. Admin sẽ nhận tiền trực tiếp.
      </p>
      <div className="payos-info">
        <p>Không cần nhập thông tin ngân hàng khi tạo sự kiện.</p>
      </div>
    </div>
  );
}
