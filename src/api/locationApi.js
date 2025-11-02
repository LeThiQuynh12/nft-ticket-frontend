import axiosClient from './axiosClient';

const locationApi = {
  getProvinces: () => axiosClient.get('/locations/provinces'),
  getDistricts: (code) => axiosClient.get(`/locations/provinces/${code}/districts`),
  getWards: (code) => axiosClient.get(`/locations/districts/${code}/wards`),
};

export default locationApi;