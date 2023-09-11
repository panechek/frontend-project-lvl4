import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const response = await axios.get(routes.userPath(), { headers: getAuthHeader() });
    console.log(response.data);
    return response.data;
  },
);

export default fetchData;
