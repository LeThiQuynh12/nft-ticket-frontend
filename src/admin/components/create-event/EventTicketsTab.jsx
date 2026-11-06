import '../../styles/EventTicketsTab.css';

import React, { useState } from 'react';

import {
  FaFileUpload,
  FaPlus,
  FaTrashAlt,
  FaChair,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function EventTicketsTab({ data, updateData, errors }) {
  const [showModal, setShowModal] = useState(false);

  const [sectionDrafts, setSectionDrafts] = useState({});

  const ticketTypes = data.ticketTypes || [];

  // Chuyển nội dung nhập thành mảng ghế
  const parseSeats = (value) => {
    return [...new Set(
      value
        .split(/[,\n;]+/)
        .map((seat) => seat.trim())
        .filter(Boolean)
    )];
  };

  // Cập nhật loại vé
  const updateTicket = (ticketIndex, patch) => {
    const updated = [...ticketTypes];

    updated[ticketIndex] = {
      ...updated[ticketIndex],
      ...patch,
    };

    updateData({ ticketTypes: updated });
  };

  // Thêm loại vé
  const addTicket = (e) => {
    e.preventDefault();

    const f = e.target;

    const name = f.ticketName.value.trim();
    const price = Number(f.ticketPrice.value);
    const totalQuantity = Number(f.ticketTotal.value);
    const minPerOrder = Number(f.ticketMin.value);
    const maxPerOrder = Number(f.ticketMax.value);

    if (!name || price < 0 || totalQuantity <= 0) {
      alert('Vui lòng nhập thông tin loại vé hợp lệ.');
      return;
    }

    if (
      minPerOrder < 1 ||
      maxPerOrder < minPerOrder
    ) {
      alert('Số vé tối thiểu/tối đa không hợp lệ.');
      return;
    }

    const ticket = {
      name,
      price,
      totalQuantity,
      minPerOrder,
      maxPerOrder,
      sections: [],
    };

    updateData({
      ticketTypes: [...ticketTypes, ticket],
    });

    setShowModal(false);
    f.reset();
  };

  // Xóa loại vé
  const removeTicket = (ticketIndex) => {
    const updated = ticketTypes.filter(
      (_, index) => index !== ticketIndex
    );

    updateData({ ticketTypes: updated });
  };

  // Thêm khu vực ghế
  const addSection = (ticketIndex) => {
    const draft = sectionDrafts[ticketIndex] || {
      name: '',
      seats: '',
    };

    const sectionName = draft.name.trim();
    const seats = parseSeats(draft.seats);

    if (!sectionName) {
      alert('Vui lòng nhập tên khu vực.');
      return;
    }

    if (seats.length === 0) {
      alert('Vui lòng nhập ít nhất một số ghế.');
      return;
    }

    const ticket = ticketTypes[ticketIndex];

    // Không cho trùng tên khu vực
    const duplicatedSection = (ticket.sections || []).some(
      (section) =>
        section.name.trim().toLowerCase() ===
        sectionName.toLowerCase()
    );

    if (duplicatedSection) {
      alert('Tên khu vực đã tồn tại.');
      return;
    }

    const updatedSections = [
      ...(ticket.sections || []),
      {
        name: sectionName,
        seats,
        isActive: true,
      },
    ];

    updateTicket(ticketIndex, {
      sections: updatedSections,
    });

    setSectionDrafts((prev) => ({
      ...prev,
      [ticketIndex]: {
        name: '',
        seats: '',
      },
    }));
  };

  // Cập nhật khu vực
  const updateSection = (
    ticketIndex,
    sectionIndex,
    patch
  ) => {
    const updatedSections = [
      ...(ticketTypes[ticketIndex].sections || []),
    ];

    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      ...patch,
    };

    updateTicket(ticketIndex, {
      sections: updatedSections,
    });
  };

  // Xóa khu vực
  const removeSection = (ticketIndex, sectionIndex) => {
    const updatedSections = ticketTypes[
      ticketIndex
    ].sections.filter((_, index) => index !== sectionIndex);

    updateTicket(ticketIndex, {
      sections: updatedSections,
    });
  };

  // Nhập thông tin khu vực mới
  const updateSectionDraft = (ticketIndex, field, value) => {
    setSectionDrafts((prev) => ({
      ...prev,
      [ticketIndex]: {
        name: '',
        seats: '',
        ...prev[ticketIndex],
        [field]: value,
      },
    }));
  };

  // Upload file
  const handleFile = (field, file) => {
    if (!file) {
      updateData({ [field]: null });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ảnh phải nhỏ hơn 5MB');
      return;
    }

    updateData({ [field]: file });
  };

  // Tổng ghế trong một loại vé
  const getTotalSeats = (ticket) => {
    return (ticket.sections || []).reduce(
      (total, section) =>
        total + (section.seats || []).length,
      0
    );
  };

  // Tổng ghế của tất cả loại vé
  const totalConfiguredSeats = ticketTypes.reduce(
    (total, ticket) => total + getTotalSeats(ticket),
    0
  );

  return (
    <div className="event-time-section">
      <h3>Thời gian & Vé</h3>

      <div className="ets-card">

        {/* THỜI GIAN SỰ KIỆN */}
        <div className="ets-form-row">
          <div className="ets-form-group">
            <label>Bắt đầu sự kiện</label>
            <input
              type="datetime-local"
              value={data.startAt ? data.startAt.slice(0, 16) : ''}
              onChange={(e) =>
                updateData({ startAt: e.target.value })
              }
            />
            {errors.startAt && (
              <div className="input-error">{errors.startAt}</div>
            )}
          </div>

          <div className="ets-form-group">
            <label>Kết thúc sự kiện</label>
            <input
              type="datetime-local"
              value={data.endAt ? data.endAt.slice(0, 16) : ''}
              onChange={(e) =>
                updateData({ endAt: e.target.value })
              }
            />
            {errors.endAt && (
              <div className="input-error">{errors.endAt}</div>
            )}
          </div>
        </div>

        {/* THỜI GIAN BÁN VÉ */}
        <div className="ets-form-row">
          <div className="ets-form-group">
            <label>Mở bán vé</label>
            <input
              type="datetime-local"
              value={
                data.saleStartAt
                  ? data.saleStartAt.slice(0, 16)
                  : ''
              }
              onChange={(e) =>
                updateData({ saleStartAt: e.target.value })
              }
            />
            {errors.saleStartAt && (
              <div className="input-error">
                {errors.saleStartAt}
              </div>
            )}
          </div>

          <div className="ets-form-group">
            <label>Đóng bán vé</label>
            <input
              type="datetime-local"
              value={
                data.saleEndAt
                  ? data.saleEndAt.slice(0, 16)
                  : ''
              }
              onChange={(e) =>
                updateData({ saleEndAt: e.target.value })
              }
            />
            {errors.saleEndAt && (
              <div className="input-error">
                {errors.saleEndAt}
              </div>
            )}
          </div>
        </div>

        {/* DANH SÁCH LOẠI VÉ */}
        <div className="ets-ticket-header">
          <div>
            <h4>Danh sách loại vé</h4>
            <p>Thiết lập giá vé và sơ đồ ghế cho từng loại.</p>
          </div>

          <button
            type="button"
            className="ets-add-btn"
            onClick={() => setShowModal(true)}
          >
            <FaPlus /> Thêm loại vé
          </button>
        </div>

        {errors.ticketTypes && (
          <div className="input-error">{errors.ticketTypes}</div>
        )}

        {ticketTypes.length > 0 ? (
          <div className="ets-ticket-list">
            {ticketTypes.map((ticket, ticketIndex) => (
              <div className="ets-ticket-card" key={ticketIndex}>

                <div className="ets-ticket-card-header">
                  <div>
                    <h4>{ticket.name}</h4>
                    <span>
                      {Number(ticket.price).toLocaleString('vi-VN')} đ
                    </span>
                  </div>

                  <button
                    type="button"
                    className="ets-delete-btn"
                    onClick={() => removeTicket(ticketIndex)}
                    title="Xóa loại vé"
                  >
                    <FaTrashAlt />
                  </button>
                </div>

                <div className="ets-ticket-info">
                  <span>
                    Tổng số lượng: <b>{ticket.totalQuantity}</b>
                  </span>
                  <span>
                    Min: <b>{ticket.minPerOrder}</b>
                  </span>
                  <span>
                    Max: <b>{ticket.maxPerOrder}</b>
                  </span>
                  <span>
                    <FaChair /> Đã cấu hình: <b>{getTotalSeats(ticket)}</b> ghế
                  </span>
                </div>

                {/* CÁC KHU VỰC GHẾ */}
                <div className="ets-section-list">
                  <h5>
                    <FaMapMarkerAlt /> Khu vực ghế
                  </h5>

                  {(ticket.sections || []).map(
                    (section, sectionIndex) => (
                      <div
                        className="ets-section-card"
                        key={section._id || sectionIndex}
                      >
                        <div className="ets-section-heading">
                          <input
                            type="text"
                            value={section.name}
                            placeholder="Tên khu vực"
                            onChange={(e) =>
                              updateSection(
                                ticketIndex,
                                sectionIndex,
                                { name: e.target.value }
                              )
                            }
                          />

                          <button
                            type="button"
                            className="ets-delete-btn"
                            onClick={() =>
                              removeSection(ticketIndex, sectionIndex)
                            }
                            title="Xóa khu vực"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>

                        <label>Danh sách số ghế</label>

                        <textarea
                          rows={3}
                          value={(section.seats || []).join(', ')}
                          placeholder="Ví dụ: A01, A02, A03, A04"
                          onChange={(e) =>
                            updateSection(
                              ticketIndex,
                              sectionIndex,
                              {
                                seats: parseSeats(e.target.value),
                              }
                            )
                          }
                        />

                        <div className="ets-section-footer">
                          <span>
                            {section.seats?.length || 0} ghế
                          </span>
                          <span>
                            {section.isActive
                              ? 'Đang hoạt động'
                              : 'Đã tạm khóa'}
                          </span>
                        </div>
                      </div>
                    )
                  )}

                  {/* FORM THÊM KHU VỰC */}
                  <div className="ets-add-section">
                    <div className="ets-form-group">
                      <label>Tên khu vực mới</label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Khu A / VIP / Tầng 1"
                        value={
                          sectionDrafts[ticketIndex]?.name || ''
                        }
                        onChange={(e) =>
                          updateSectionDraft(
                            ticketIndex,
                            'name',
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="ets-form-group">
                      <label>Danh sách số ghế</label>
                      <textarea
                        rows={3}
                        placeholder={
                          'Ví dụ: A01, A02, A03, A04\nHoặc mỗi ghế một dòng'
                        }
                        value={
                          sectionDrafts[ticketIndex]?.seats || ''
                        }
                        onChange={(e) =>
                          updateSectionDraft(
                            ticketIndex,
                            'seats',
                            e.target.value
                          )
                        }
                      />
                      <small>
                        Phân cách bằng dấu phẩy hoặc xuống dòng.
                      </small>
                    </div>

                    <button
                      type="button"
                      className="ets-add-section-btn"
                      onClick={() => addSection(ticketIndex)}
                    >
                      <FaPlus /> Thêm khu vực
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ets-empty">
            <FaChair />
            <p>Chưa có loại vé nào.</p>
            <span>Thêm loại vé để bắt đầu cấu hình ghế.</span>
          </div>
        )}

        <div className="ets-seat-summary">
          <div>
            <span>Tổng loại vé</span>
            <strong>{ticketTypes.length}</strong>
          </div>
          <div>
            <span>Tổng khu vực</span>
            <strong>
              {ticketTypes.reduce(
                (total, ticket) =>
                  total + (ticket.sections || []).length,
                0
              )}
            </strong>
          </div>
          <div>
            <span>Tổng số ghế</span>
            <strong>{totalConfiguredSeats}</strong>
          </div>
        </div>

        {/* SƠ ĐỒ GHẾ */}
        <div className="seatmap-section">
          <label>* Sơ đồ ghế</label>

          <div className="et-upload-box">
            <FaFileUpload />
            <p>PNG, JPG nhỏ hơn 5MB</p>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={(e) =>
                handleFile('seatMap', e.target.files[0])
              }
            />
          </div>

          {errors.seatMap && (
            <div className="input-error">{errors.seatMap}</div>
          )}

          {data.seatMap && (
            <img
              src={URL.createObjectURL(data.seatMap)}
              alt="Sơ đồ ghế"
              style={{
                maxWidth: '100%',
                maxHeight: 400,
                objectFit: 'contain',
                marginTop: 15,
                borderRadius: 12,
              }}
            />
          )}
        </div>
      </div>

      {/* MODAL THÊM LOẠI VÉ */}
      {showModal && (
        <div
          className="ets-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="ets-modal modern"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="ets-close-btn"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <h2 className="modal-title">Thêm loại vé</h2>

            <form className="ticket-form" onSubmit={addTicket}>
              <div className="input-group">
                <label>Tên vé</label>
                <input
                  name="ticketName"
                  placeholder="Ví dụ: Vé VIP / Vé thường"
                  required
                />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Giá vé (VNĐ)</label>
                  <input
                    name="ticketPrice"
                    type="number"
                    min="0"
                    placeholder="500000"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Tổng số lượng</label>
                  <input
                    name="ticketTotal"
                    type="number"
                    min="1"
                    placeholder="100"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Min / đơn</label>
                  <input
                    name="ticketMin"
                    type="number"
                    min="1"
                    defaultValue="1"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Max / đơn</label>
                  <input
                    name="ticketMax"
                    type="number"
                    min="1"
                    defaultValue="5"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="et-btn-save full"
              >
                Lưu loại vé
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
