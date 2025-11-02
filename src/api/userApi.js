import axiosClient from './axiosClient';

const userApi = {
  getAll: () => axiosClient.get("/users"),
  update: (id, data) => axiosClient.put(`/users/${id}`, data),
  delete: (id) => axiosClient.delete(`/users/${id}`),
};

export default userApi;
