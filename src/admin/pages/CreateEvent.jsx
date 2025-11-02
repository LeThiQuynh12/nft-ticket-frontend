import '../styles/CreateEvent.css';

// File: src/pages/admin/CreateEvent.jsx
import React, { useState } from 'react';

import eventApi from '../../api/eventApi';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import EventInfoTab from '../components/create-event/EventInfoTab';
import EventPaymentTab from '../components/create-event/EventPaymentTab';
import EventSettingsTab from '../components/create-event/EventSettingsTab';
import EventTicketsTab from '../components/create-event/EventTicketsTab';

// Minimal styles assumed to exist in CSS files.

const TOTAL_STEPS = 4;

export default function CreateEvent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    mode: 'offline',
    organizer: '',
    category: '',
    startAt: '',
    endAt: '',
    location: { name: '', province: '', district: '', ward: '', addressDetail: '' },
    coverImage: null,
    gallery: [],
    seatMap: null,
    organizerLogo: null,
    ticketTypes: [],
    privacy: 'public',
    confirmationMessage: '',
    paymentInfo: { accountName: '', accountNumber: '', bankName: '', branch: '', invoice: { businessType: 'Cá nhân', fullName: '', address: '', taxCode: '' } },
  });

  // errors state structured as { step: { field: 'message', nested: {}} }
  const [errors, setErrors] = useState({});

  const updateFormData = (patch) => setFormData(prev => ({ ...prev, ...patch }));
  const updateNested = (path, value) => {
    // helper to update nested values like paymentInfo.bankName or location.name
    const keys = path.split('.');
    setFormData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      let node = copy;
      for (let i = 0; i < keys.length - 1; i++) node = node[keys[i]] = node[keys[i]] || {};
      node[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  const validateAllSteps = () => {
    const e = {};

    // Step 1 validations
    const s1 = {};
    if (!formData.name?.trim()) s1.name = 'Tên sự kiện bắt buộc';
    if (!formData.description?.trim()) s1.description = 'Mô tả bắt buộc';
    if (!formData.organizer?.trim()) s1.organizer = 'Ban tổ chức bắt buộc';
    if (!formData.category) s1.category = 'Chọn thể loại';
    if (formData.mode === 'offline') {
      const loc = formData.location || {};
      if (!loc.name?.trim()) s1.location_name = 'Tên địa điểm bắt buộc';
      if (!loc.province) s1.location_province = 'Chọn tỉnh/TP';
      if (!loc.district) s1.location_district = 'Chọn quận/huyện';
      if (!loc.ward) s1.location_ward = 'Chọn phường/xã';
      if (!loc.addressDetail?.trim()) s1.location_addressDetail = 'Số nhà/đường bắt buộc';
    }
    if (Object.keys(s1).length) e[1] = s1;

    // Step 2 validations
    const s2 = {};
    if (!formData.startAt) s2.startAt = 'Chọn thời gian bắt đầu';
    if (!formData.endAt) s2.endAt = 'Chọn thời gian kết thúc';
    if (formData.startAt && formData.endAt && new Date(formData.startAt) >= new Date(formData.endAt)) s2.time = 'Thời gian kết thúc phải sau thời gian bắt đầu';
    if (!formData.ticketTypes || formData.ticketTypes.length === 0) s2.ticketTypes = 'Thêm ít nhất 1 loại vé';
    if (!formData.seatMap) s2.seatMap = 'Upload sơ đồ ghế';
    if (Object.keys(s2).length) e[2] = s2;

    // Step 3 validations
    const s3 = {};
    if (!formData.privacy) s3.privacy = 'Chọn quyền riêng tư';
    if (!formData.confirmationMessage?.trim()) s3.confirmationMessage = 'Nhập tin nhắn xác nhận';
    if (Object.keys(s3).length) e[3] = s3;

    // Step 4 validations
    const s4 = {};
    const p = formData.paymentInfo || {};
    if (!p.accountName?.trim()) s4.accountName = 'Tên chủ tài khoản bắt buộc';
    if (!p.accountNumber?.trim()) s4.accountNumber = 'Số tài khoản bắt buộc';
    if (!p.bankName) s4.bankName = 'Chọn ngân hàng';
    if (Object.keys(s4).length) e[4] = s4;

    setErrors(e);
    return e;
  };

  const goToFirstError = (errs) => {
    if (!errs || Object.keys(errs).length === 0) return;
    const firstStep = Math.min(...Object.keys(errs).map(n => Number(n)));
    setCurrentStep(firstStep);
  };

  const handleNext = () => {
    // validate current step only
    const partial = validateAllSteps();
    if (partial[currentStep]) return setCurrentStep(currentStep); // keep on same step and show errors
    setCurrentStep(s => Math.min(s + 1, TOTAL_STEPS));
  };

  const handlePrev = () => setCurrentStep(s => Math.max(s - 1, 1));

const buildFormData = (fd, obj, parentKey = '') => {
  for (const key in obj) {
    const value = obj[key];
    const formKey = parentKey ? `${parentKey}.${key}` : key;

    if (value instanceof File) {
      fd.append(formKey, value);
    } else if (Array.isArray(value)) {
      value.forEach(v => {
        if (v instanceof File) fd.append(formKey, v);
        else fd.append(formKey, JSON.stringify(v));
      });
    } else if (typeof value === 'object' && value !== null) {
      fd.append(formKey, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      fd.append(formKey, String(value));
    }
  }
};

  const handleSubmit = async () => {
    setGlobalError(null);
    const errs = validateAllSteps();
    if (Object.keys(errs).length) {
      goToFirstError(errs);
      return;
    }

    setIsSubmitting(true);

    try {
      const fd = new FormData();
      // Append simple fields
      fd.append('name', formData.name);
      fd.append('description', formData.description);
      fd.append('mode', formData.mode);
      fd.append('organizer', formData.organizer);
      fd.append('category', formData.category);
      fd.append('startAt', formData.startAt);
      fd.append('endAt', formData.endAt);
      fd.append('privacy', formData.privacy);
      fd.append('confirmationMessage', formData.confirmationMessage || '');

      // nested objects as JSON
      // fd.append('location', JSON.stringify(formData.location || {}));
      Object.entries(formData.location || {}).forEach(([key, value]) => {
  if (value !== undefined && value !== null) {
    fd.append(`location[${key}]`, value);
  }
});

      fd.append('ticketTypes', JSON.stringify(formData.ticketTypes || []));
      fd.append('paymentInfo', JSON.stringify(formData.paymentInfo || {}));

      // files
      if (formData.coverImage) fd.append('coverImage', formData.coverImage);
      if (formData.organizerLogo) fd.append('organizerLogo', formData.organizerLogo);
      if (formData.seatMap) fd.append('seatMap', formData.seatMap);
      (formData.gallery || []).forEach(f => fd.append('gallery', f));

      const res = await eventApi.createEvent(fd);
      alert('Tạo sự kiện THÀNH CÔNG!');
      // reset form
      setFormData({
        name: '',
        description: '',
        mode: 'offline',
        organizer: '',
        category: '',
        startAt: '',
        endAt: '',
        location: { name: '', province: '', district: '', ward: '', addressDetail: '' },
        coverImage: null,
        gallery: [],
        seatMap: null,
        organizerLogo: null,
        ticketTypes: [],
        privacy: 'public',
        confirmationMessage: '',
        paymentInfo: { accountName: '', accountNumber: '', bankName: '', branch: '', invoice: { businessType: 'Cá nhân', fullName: '', address: '', taxCode: '' } },
      });
      setErrors({});
      setCurrentStep(1);
      console.log('Created event:', res.data);
    } catch (err) {
      console.error(err);
      setGlobalError(err.response?.data?.message || err.message || 'Lỗi server');
      // backend may return field-level errors -> map them
      if (err.response?.data?.errors) {
        // expect structure like { step: { field: message } } or flat object
        setErrors(err.response.data.errors);
        goToFirstError(err.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <div className="create-event-container">

          <div className="tabs-header">
            <div className="progress-container">
              {[1,2,3,4].map(i => (
                <div key={i} className={`progress-step ${currentStep===i? 'active':''} ${errors[i] ? 'error' : ''}`}>
                  <div className="circle">{i}</div>
                  <p>{['Thông tin','Thời gian & Vé','Cài đặt','Thanh toán'][i-1]}</p>
                </div>
              ))}
            </div>

            <div className="tabs-actions">
              <button className="btn-save" onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? 'Đang lưu...' : 'Lưu'}</button>
              {currentStep < TOTAL_STEPS && <button className="btn-next" onClick={handleNext} disabled={isSubmitting}>Tiếp tục</button>}
              {currentStep > 1 && <button className="btn-prev" onClick={handlePrev} disabled={isSubmitting}>Quay lại</button>}
            </div>
          </div>

          {globalError && <div className="error-message">{globalError}</div>}

          <div className="tab-content">
            {currentStep === 1 && <EventInfoTab data={formData} updateData={updateFormData} updateNested={updateNested} errors={errors[1] || {}} />}
            {currentStep === 2 && <EventTicketsTab data={formData} updateData={updateFormData} updateNested={updateNested} errors={errors[2] || {}} />}
            {currentStep === 3 && <EventSettingsTab data={formData} updateData={updateFormData} updateNested={updateNested} errors={errors[3] || {}} />}
            {currentStep === 4 && <EventPaymentTab data={formData} updateData={updateFormData} updateNested={updateNested} errors={errors[4] || {}} />}
          </div>
        </div>
      </div>
    </div>
  );
}
