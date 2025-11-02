import '../../styles/EventInfoTab.css';

// File: src/components/create-event/EventInfoTab.jsx
import React, {
  useEffect,
  useState,
} from 'react';

import { FaFileUpload } from 'react-icons/fa';

import categoryApi from '../../../api/categoryApi';
import locationApi from '../../../api/locationApi';

export default function EventInfoTab({ data, updateData, updateNested, errors }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [prov, cat] = await Promise.all([locationApi.getProvinces(), categoryApi.getAll()]);
        setProvinces(prov.data || []);
        setCategories(cat.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onProvinceChange = async (code) => {
    const loc = { ...data.location, province: code, district: '', ward: '' };
    updateData({ location: loc });
    setDistricts([]); setWards([]);
    if (!code) return;
    try { const res = await locationApi.getDistricts(code); setDistricts(res.data || []); } catch (e) {}
  };

  const onDistrictChange = async (code) => {
    const loc = { ...data.location, district: code, ward: '' };
    updateData({ location: loc });
    setWards([]);
    if (!code) return;
    try { const res = await locationApi.getWards(code); setWards(res.data || []); } catch (e) {}
  };

  const handleFile = (field, file) => {
    if (!file) return updateData({ [field]: null });
    if (file.size > 5 * 1024 * 1024) return alert('Ảnh phải < 5MB');
    updateData({ [field]: file });
  };

  return (
    <div className="event-info-tab">
      <h3>Thông tin sự kiện</h3>

      <div className="upload-section">
        <div className="upload-box small">
          <FaFileUpload />
          <p>Gallery</p>
          <input type="file" multiple accept="image/*" onChange={e => updateData({ gallery: Array.from(e.target.files) })} />
        </div>
        <div className="upload-box large">
          <FaFileUpload />
          <p>Ảnh bìa</p>
          <input type="file" accept="image/*" onChange={e => handleFile('coverImage', e.target.files[0])} />
        </div>
      </div>

      <div className="form-section">
        <label>Tên sự kiện *</label>
        <input value={data.name || ''} onChange={e => updateData({ name: e.target.value })} />
        {errors.name && <div className="input-error">{errors.name}</div>}
      </div>

      <div className="form-section">
        <label>Loại *</label>
        <div className="radio-group">
          <label><input type="radio" name="mode" checked={data.mode === 'offline'} onChange={() => updateData({ mode: 'offline' })} /> Offline</label>
          <label><input type="radio" name="mode" checked={data.mode === 'online'} onChange={() => updateData({ mode: 'online' })} /> Online</label>
        </div>
      </div>

{data.mode === 'offline' && (
  <>
    <h4 className="section-title">Địa điểm tổ chức</h4>

    <div className="form-section">
      <label>Tên địa điểm *</label>
      <input 
        value={data.location?.name || ''} 
        onChange={e => updateData({ location: { ...data.location, name: e.target.value } })} 
      />
      {errors.location_name && <div className="input-error">{errors.location_name}</div>}
    </div>

    <div className="address-card">
      <div className="address-grid">
        <div>
          <label>Tỉnh / Thành phố *</label>
          <select 
            value={data.location?.province || ''} 
            onChange={e => onProvinceChange(e.target.value)}
          >
            <option value="">-- Chọn tỉnh --</option>
            {provinces.map(p => (
              <option key={p.code} value={p.code}>{p.name}</option>
            ))}
          </select>
          {errors.location_province && <div className="input-error">{errors.location_province}</div>}
        </div>

        <div>
          <label>Quận / Huyện *</label>
          <select 
            value={data.location?.district || ''} 
            onChange={e => onDistrictChange(e.target.value)} 
            disabled={!data.location?.province}
          >
            <option value="">-- Chọn quận --</option>
            {districts.map(d => (
              <option key={d.code} value={d.code}>{d.name}</option>
            ))}
          </select>
          {errors.location_district && <div className="input-error">{errors.location_district}</div>}
        </div>
      </div>

      <div className="address-grid">
        <div>
          <label>Phường / Xã *</label>
          <select 
            value={data.location?.ward || ''} 
            onChange={e => updateData({ location: { ...data.location, ward: e.target.value } })}
            disabled={!data.location?.district}
          >
            <option value="">-- Chọn phường --</option>
            {wards.map(w => (
              <option key={w.code} value={w.code}>{w.name}</option>

            ))}
          </select>
          {errors.location_ward && <div className="input-error">{errors.location_ward}</div>}
        </div>

        <div>
          <label>Số nhà, đường *</label>
          <input 
            value={data.location?.addressDetail || ''} 
            onChange={e => updateData({ location: { ...data.location, addressDetail: e.target.value } })}
          />
          {errors.location_addressDetail && <div className="input-error">{errors.location_addressDetail}</div>}
        </div>
      </div>
    </div>
  </>
)}


      <div className="form-section">
        <label>Thể loại *</label>
        {loading ? <p>Đang tải...</p> : (
          <select value={data.category || ''} onChange={e => updateData({ category: e.target.value })}>
            <option value="">Chọn thể loại</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        )}
        {errors.category && <div className="input-error">{errors.category}</div>}
      </div>

      <div className="form-section">
        <label>Mô tả *</label>
        <textarea rows={6} value={data.description || ''} onChange={e => updateData({ description: e.target.value })} />
        {errors.description && <div className="input-error">{errors.description}</div>}
      </div>

      <div className="organizer-section">
        <label>Ban tổ chức *</label>
        <div className="organizer-row">
          <div className="upload-box organizer-logo">
            <FaFileUpload />
            <p>Logo</p>
            <input type="file" accept="image/*" onChange={e => handleFile('organizerLogo', e.target.files[0])} />
            {data.organizerLogo && <img src={URL.createObjectURL(data.organizerLogo)} alt="logo" style={{ width: 80, marginTop: 8, borderRadius: 8 }} />}
          </div>
          <div className="organizer-info">
            <input value={data.organizer || ''} onChange={e => updateData({ organizer: e.target.value })} placeholder="Tên ban tổ chức" />
            {errors.organizer && <div className="input-error">{errors.organizer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}