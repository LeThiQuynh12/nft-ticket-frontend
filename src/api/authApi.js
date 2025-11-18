import axiosClient from './axiosClient';

const authApi = {
  register: (data) => axiosClient.post("/auth/register", data),
  verifyOtp: (data) => axiosClient.post("/auth/verify-otp", data),
  login: (data) => axiosClient.post("/auth/login", data),
  refreshToken: (data) => axiosClient.post("/auth/refresh-token", data),
  logout: (data) => axiosClient.post("/auth/logout", data),
};

export default authApi;
