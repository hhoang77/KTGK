import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../src/utils/constants';

// Tạo instance của axios
export const axiosConfig = axios.create({
  baseURL: BASE_URL, // Thay bằng URL API của bạn
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor cho request
axiosConfig.interceptors.request.use(
  async config => {
    // Thêm token vào header nếu có
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Xử lý lỗi khi gửi request
    return Promise.reject(error);
  },
);

// Interceptor cho response
axiosConfig.interceptors.response.use(
  response => {
    // Xử lý response thành công
    return response;
  },
  error => {
    // Xử lý lỗi từ server
    if (error.response && error.response.status === 401) {
      // Nếu nhận lỗi 401 (Unauthorized), có thể redirect đến trang đăng nhập hoặc xử lý token
      console.log('Unauthorized, redirecting...');
    }
    return Promise.reject(error);
  },
);
