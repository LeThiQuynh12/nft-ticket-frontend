import axiosClient from './axiosClient';

const eventApi = {
  createEvent: (formData) => {
    return axiosClient.post("/events", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default eventApi;
