import axiosClient from './axiosClient';

const orderApi = {
  /**
   * Tạo đơn hàng & lấy link thanh toán
   * @param {Object} payload - Dữ liệu order
   * @returns Promise
   */
  createOrder: (payload) => {
    return axiosClient
      .post("/payments/create", payload)
      .then((res) => res.data)
      .catch((err) => {
        console.error("createOrder error:", err.response?.data || err.message);
        throw err;
      });
  },

  /**
   * Lấy trạng thái đơn hàng
   * @param {String} orderId
   * @returns Promise
   */
  getOrderStatus: (orderId) => {
    return axiosClient
      .get(`/payments/status/${orderId}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error(
          "getOrderStatus error:",
          err.response?.data || err.message
        );
        throw err;
      });
  },

  /**
   * Simulate webhook (chỉ dùng test, production PayOS sẽ gọi)
   * @param {Object} payload
   */
  triggerWebhook: (payload) => {
    return axiosClient
      .post("/payments/webhook", payload)
      .then((res) => res.data)
      .catch((err) => {
        console.error(
          "triggerWebhook error:",
          err.response?.data || err.message
        );
        throw err;
      });
  },

  // Lấy tất cả vé NFT
  getAllNFTs: () => axiosClient.get("/payments/all-nfts"),

  // Lấy chi tiết một NFT theo tokenId
  getNFTByTokenId: (tokenId) => axiosClient.get(`/payments/nft/${tokenId}`),
};

export default orderApi;
