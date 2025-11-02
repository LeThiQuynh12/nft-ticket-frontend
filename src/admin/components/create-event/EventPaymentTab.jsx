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
  const set = (field, value) => updateData({ paymentInfo: { ...pay, [field]: value } });

  const handleBankChange = (bank) => set('bankName', bank);

  return (
    <div className="payment-tab">
      <h3>Thông tin thanh toán</h3>

      <div className="section">
        <label>Chủ tài khoản *</label>
        <input placeholder="Nguyễn Văn A" value={pay.accountName || ''} onChange={e => set('accountName', e.target.value)} maxLength={100} />
        {errors.accountName && <div className="input-error">{errors.accountName}</div>}

        <label>Số tài khoản *</label>
        <input placeholder="0123456789" value={pay.accountNumber || ''} onChange={e => set('accountNumber', e.target.value.replace(/\D/g, ''))} maxLength={20} />
        {errors.accountNumber && <div className="input-error">{errors.accountNumber}</div>}

        <label>Ngân hàng *</label>
        <select value={pay.bankName || ''} onChange={e => handleBankChange(e.target.value)}>
          <option value="">Chọn ngân hàng</option>
          {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        {errors.bankName && <div className="input-error">{errors.bankName}</div>}

        <label>Chi nhánh (không bắt buộc)</label>
        <input placeholder="Hà Nội, TP.HCM..." value={pay.branch || ''} onChange={e => set('branch', e.target.value)} maxLength={100} />
      </div>

      {(pay.accountName || pay.accountNumber || pay.bankName) && (
        <div style={{ marginTop: 25, padding: '18px 20px', background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', border: '2px solid #1976d2', borderRadius: 16 }}>
          <strong style={{ fontSize: '16px', color: '#1976d2' }}>Khách chuyển khoản tới:</strong>
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{pay.accountName || '___'}</div>
          <div style={{ fontSize: '20px', letterSpacing: '1px', margin: '8px 0' }}>{pay.accountNumber || '___'}</div>
          <div style={{ color: '#1976d2', fontWeight: '600' }}>{pay.bankName || 'Ngân hàng'} - Chi nhánh: {pay.branch || 'Toàn quốc'}</div>
        </div>
      )}
    </div>
  );
}