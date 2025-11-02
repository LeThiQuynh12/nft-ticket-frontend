import '../styles/CreateEvent.css';

import React, { useState } from 'react';

import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import EventInfoTab from '../components/create-event/EventInfoTab';
import EventPaymentTab from '../components/create-event/EventPaymentTab';
import EventSettingsTab from '../components/create-event/EventSettingsTab';
import EventTicketsTab from '../components/create-event/EventTicketsTab';

export default function CreateEvent() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // dữ liệu form từng bước
  const [eventData, setEventData] = useState({
    name: "",
    type: "",
    description: "",
  });

  const steps = [
    { id: 1, title: "Thông tin sự kiện" },
    { id: 2, title: "Thời gian & Loại vé" },
    { id: 3, title: "Cài đặt" },
    { id: 4, title: "Thông tin thanh toán" },
  ];

  const nextStep = () => {
    // Kiểm tra hợp lệ ở bước 1
    if (currentStep === 1) {
      if (!eventData.name || !eventData.type || !eventData.description) {
        alert("⚠️ Vui lòng nhập đầy đủ thông tin sự kiện trước khi tiếp tục!");
        return;
      }
    }

    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <EventInfoTab data={eventData} setData={setEventData} />;
      case 2:
        return <EventTicketsTab onPrev={prevStep} />;
      case 3:
        return <EventSettingsTab onPrev={prevStep} />;
      case 4:
        return <EventPaymentTab onPrev={prevStep} />;
      default:
        return null;
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
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`progress-step ${
                    currentStep === step.id
                      ? "active"
                      : currentStep > step.id
                      ? "completed"
                      : ""
                  }`}
                >
                  <div className="circle">{step.id}</div>
                  <p>{step.title}</p>

                  {index < steps.length - 1 && (
                    <div className="progress-line"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="tabs-actions">
              {currentStep > 1 && (
                <button className="btn-back" onClick={prevStep}>
                  Quay lại
                </button>
              )}
              <button className="btn-save">Lưu</button>
              <button
                className="btn-next"
                onClick={nextStep}
                disabled={currentStep === totalSteps}
              >
                Tiếp tục
              </button>
            </div>
          </div>

          <div className="tab-content">{renderStepContent()}</div>
        </div>
      </div>
    </div>
  );
}
