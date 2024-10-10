import {create} from 'zustand';
import {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} from '../apis/product';

export const productStore = create(set => ({
  data: null,
  error: null,
  isLoading: false,

  getAllProduct: async () => {
    try {
      set({isLoading: true});
      const response = await getAllProduct();
      set({isLoading: false});
      if (response.status === 200) {
        console.log(response.data.content);

        set({data: response.data.content});
      }
    } catch (error) {
      console.log(error);
      set({error: error.message});
    }
  },

  createProduct: async data => {
    try {
      set({loading: true});
      const response = await createProduct(data);
      set(state => {
        isLoading: false;
        data: [response.data.content, ...state.data];
      });
    } catch (error) {
      console.log(error);
      set({error: error.message});
    }
  },

  //   const updateProduct = async (id,data) => {
  //     try {

  //     } catch (error) {
  //         console.log(error);
  //         set({error: error.message});
  //     }
  //   }

  deleteProduct: async id => {
    try {
      set({isLoading: true});
      const response = await deleteProduct(id);
      set(state => {
        isLoading: false;
        data: state.data.filter(product => product._id !== id);
      });
    } catch (error) {
      console.log(error);
      set({error: error.message});
    }
  },
}));
