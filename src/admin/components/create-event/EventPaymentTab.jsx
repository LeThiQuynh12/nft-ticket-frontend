import '../../styles/EventPaymentTab.css';

import React from 'react';

const BANKS = [
  "Vietcombank","BIDV","VietinBank","Agribank","Techcombank",
  "MB Bank","ACB","Sacombank","VPBank","SHB","Eximbank",
  "HDBank","VIB","TPBank","SCB","PVcomBank","Nam A Bank",
  "Bac A Bank","LPBank","SeABank","OCB"
];

export default function EventPaymentTab({ data, updateData, errors }) {
  const pay = data.paymentInfo || {};
  const set = (field, value) =>
    updateData({ paymentInfo: { ...pay, [field]: value } });

  return (
    <div className="payment-tab">
      <h3 className="payment-title">Thông tin thanh toán</h3>
      <p className="payment-subtext">
        Vui lòng nhập thông tin tài khoản nhận thanh toán
      </p>

      <div className="pay-grid">
        {/* Chủ tài khoản */}
        <div className="form-group">
          <label>Chủ tài khoản *</label>
          <input
            className={errors.accountName ? 'error' : ''}
            placeholder="Nguyễn Văn A"
            value={pay.accountName || ''}
            onChange={e => set('accountName', e.target.value)}
            maxLength={100}
          />
          {errors.accountName && (
            <span className="input-error">{errors.accountName}</span>
          )}
        </div>

        {/* Số tài khoản */}
        <div className="form-group">
          <label>Số tài khoản *</label>
          <input
            className={errors.accountNumber ? 'error' : ''}
            placeholder="0123456789"
            value={pay.accountNumber || ''}
            onChange={e =>
              set('accountNumber', e.target.value.replace(/\D/g, ''))
            }
            maxLength={20}
          />
          {errors.accountNumber && (
            <span className="input-error">{errors.accountNumber}</span>
          )}
        </div>

        {/* Ngân hàng */}
        <div className="form-group">
          <label>Ngân hàng *</label>
          <select
            className={errors.bankName ? 'error' : ''}
            value={pay.bankName || ''}
            onChange={e => set('bankName', e.target.value)}
          >
            <option value="">Chọn ngân hàng</option>
            {BANKS.map(b => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {errors.bankName && (
            <span className="input-error">{errors.bankName}</span>
          )}
        </div>

        {/* Chi nhánh */}
        <div className="form-group">
          <label>Chi nhánh</label>
          <input
            placeholder="Hà Nội / TP.HCM..."
            value={pay.branch || ''}
            onChange={e => set('branch', e.target.value)}
            maxLength={100}
          />
        </div>
      </div>

      {/* Preview thẻ ngân hàng */}
      {(pay.accountName || pay.accountNumber || pay.bankName) && (
        <div className="bank-card">
          <div className="bank-chip" />
          <div className="bank-name">{pay.bankName || 'Ngân hàng'}</div>
          <div className="bank-number">
            {pay.accountNumber || '•••• •••• ••••'}
          </div>
          <div className="bank-owner">{pay.accountName || 'Tên người nhận'}</div>
          <div className="bank-branch">
            Chi nhánh: {pay.branch || 'Toàn quốc'}
          </div>
        </div>
      )}
    </div>
  );
}
