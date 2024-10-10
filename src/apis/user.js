import {axiosConfig} from '../axiosConfig';

export const register = async data => {
  return await axiosConfig({
    method: 'post',
    url: 'user/register',
    data,
  });
};

export const login = async data => {
  return await axiosConfig({
    method: 'post',
    url: 'user/login',
    data,
  });
};
