import {axiosConfig} from '../axiosConfig';

export const getAllProduct = async () => {
  return await axiosConfig({
    method: 'get',
    url: 'product',
  });
};

export const createProduct = async data => {
  return await axiosConfig({
    method: 'post',
    url: 'product/create',
    data,
  });
};

export const updateProduct = async (id, data) => {
  return await axiosConfig({
    method: 'put',
    url: `product/update?id=${id} `,
    data,
  });
};

export const deleteProduct = async id => {
  return await axiosConfig({
    method: 'delete',
    url: `product/delete?id=${id}`,
  });
};
