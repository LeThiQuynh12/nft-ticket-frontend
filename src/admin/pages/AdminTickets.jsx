import '../styles/admin.css';
import '../styles/AdminTickets.css';

import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { MdRefresh } from 'react-icons/md';

import orderApi from '../../api/orderApi';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await orderApi.getAllNFTs();
      if (res.data.success) {
        const formatted = res.data.nfts.map((nft, idx) => ({
          id: idx + 1,
          code: nft.tokenId,
          buyer: nft.customer.name,
          event: nft.eventId, // Nếu backend trả tên event thì map trực tiếp
          type: nft.ticketType,
          status: nft.txLink ? 'Minted' : 'Pending',
          createdAt: Date.now(),
          txLink: nft.txLink,
          metadataURI: nft.metadataURI,
        }));
        setTickets(formatted);
      }
    } catch (err) {
      console.error("Error fetching NFT tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tickets
      .filter((t) => {
        if (!q) return true;
        return (
          t.code.toLowerCase().includes(q) ||
          t.buyer.toLowerCase().includes(q) ||
          t.event.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [tickets, query]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />

        <div className="categories-content">
          <div className="categories-header">
            <h2>Quản lý Vé NFT</h2>
            <button className="add-btn" onClick={fetchTickets}>
              <MdRefresh size={22} />
              Tải lại
            </button>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', padding: 20 }}>Đang tải...</p>
          ) : (
            <table className="categories-table">
              <thead>
                <tr>
                  <th>Token ID</th>
                  <th>Người mua</th>
                  <th>Sự kiện</th>
                  <th>Loại vé</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Giao dịch</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: 20 }}>
                      Không có vé nào
                    </td>
                  </tr>
                ) : (
                  filtered.map((t) => (
                    <tr key={t.id}>
                      <td>{t.code}</td>
                      <td>{t.buyer}</td>
                      <td>{t.event}</td>
                      <td>{t.type}</td>
                      <td>
                        <span className={`status-tag status-${t.status.toLowerCase()}`}>
                          {t.status}
                        </span>
                      </td>
                      <td>{new Date(t.createdAt).toLocaleString()}</td>
                      <td>
                        {t.txLink ? (
                          <a href={t.txLink} target="_blank" rel="noopener noreferrer">
                            Xem giao dịch
                          </a>
                        ) : (
                          'Chưa mint'
                        )}
                      </td>
                      <td>
                        <button className="edit-btn" onClick={() => setSelectedTicket(t)}>
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selectedTicket && (
        <div className="popup-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="popup" onClick={(e) => e.stopPropagation()} style={{ width: 450 }}>
            <h3>Chi tiết Token {selectedTicket.code}</h3>
            <p><strong>Người mua:</strong> {selectedTicket.buyer}</p>
            <p><strong>Sự kiện:</strong> {selectedTicket.event}</p>
            <p><strong>Loại vé:</strong> {selectedTicket.type}</p>
            <p><strong>Trạng thái:</strong> {selectedTicket.status}</p>
            <p><strong>Ngày tạo:</strong> {new Date(selectedTicket.createdAt).toLocaleString()}</p>
            <p>
              <strong>Metadata:</strong>{' '}
              <a href={selectedTicket.metadataURI} target="_blank" rel="noopener noreferrer">
                Xem IPFS
              </a>
            </p>
            <p>
              <strong>Giao dịch:</strong>{' '}
              {selectedTicket.txLink ? (
                <a href={selectedTicket.txLink} target="_blank" rel="noopener noreferrer">
                  Xem trên Polygonscan
                </a>
              ) : (
                'Chưa mint'
              )}
            </p>
            <div className="popup-actions">
              <button className="btn-cancel" onClick={() => setSelectedTicket(null)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
