import {create} from 'zustand';
import {login, register} from '../apis/user';

export const userStore = create(set => ({
  user: null,
  error: null,
  isLoading: false,

  register: async data => {
    try {
      set({isLoading: true});
      const response = await register(data);
      set({isLoading: false});
      if (response.status === 201) {
        console.log(response.data.content);
      }
    } catch (error) {
      console.log(error);
      set({error: error.message});
    }
  },

  login: async data => {
    try {
      set({isLoading: true});
      const response = await login(data);
      set({isLoading: false});
      if (response.status === 200) {
        set({user: response.data.content});
      }
    } catch (error) {
      console.log(error);
      set({error: error.message});
    }
  },
}));
