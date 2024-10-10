import {axiosConfig} from '../axiosConfig';

export const getAllCategory = async () => {
  return await axiosConfig({
    method: 'get',
    url: 'category',
  });
};

export const createCategory = async data => {
  return await axiosConfig({
    method: 'post',
    url: 'category/create',
    data,
  });
};

export const updateCategory = async (id, data) => {
  return await axiosConfig({
    method: 'put',
    url: `category/update?id=${id} `,
    data,
  });
};

export const deleteCategory = async id => {
  return await axiosConfig({
    method: 'delete',
    url: `Category/delete?id=${id}`,
  });
};
