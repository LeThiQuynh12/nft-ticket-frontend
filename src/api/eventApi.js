// src/api/eventApi.js
import axiosClient from './axiosClient';

const eventApi = {
  createEvent: (formData) => axiosClient.post('/events', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),

  getEvents: (params) => axiosClient.get('/events', { params }),

  getEventById: (id) => axiosClient.get(`/events/${id}`),

  updateEvent: (id, formData) => axiosClient.put(`/events/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),

  deleteEvent: (id) => axiosClient.delete(`/events/${id}`),

getEventsByCategory: (categorySlug) =>
    axiosClient
      .get(`/events?category=${categorySlug}`)
      .then((res) => res.data),
};

export default eventApi;
