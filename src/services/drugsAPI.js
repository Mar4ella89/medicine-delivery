import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://medicine-delivery-ztb4.onrender.com/api/drugs',
  params: {
    limit: 12,
  },
});

export const allDrugs = async () => {
  const { data } = await instance.get(`/`);
  return data;
};
