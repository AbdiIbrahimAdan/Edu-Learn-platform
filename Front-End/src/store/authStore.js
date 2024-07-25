import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: async () => {
    try {
      await axios.post('http://localhost:5000/api/user/logout', {}, { withCredentials: true });
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
  fetchUser: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/user/me', { withCredentials: true });
      if (response.data.success) {
        set({ user: response.data.user, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error('Fetch user failed:', error);
      set({ user: null, isAuthenticated: false });
    }
  }
}));

export default useAuthStore;
