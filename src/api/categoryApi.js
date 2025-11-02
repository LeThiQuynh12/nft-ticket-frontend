import axiosClient from './axiosClient';

const categoryApi = {
  // ✅ Lấy toàn bộ danh mục
  getAll: () => axiosClient.get("/categories"),

  // ✅ Tạo mới danh mục (cần token admin)
  create: (data) => axiosClient.post("/categories", data),

  // ✅ Cập nhật danh mục theo id
  update: (id, data) => axiosClient.put(`/categories/${id}`, data),

  // ✅ Xóa danh mục theo id
  delete: (id) => axiosClient.delete(`/categories/${id}`),
};

export default categoryApi;
