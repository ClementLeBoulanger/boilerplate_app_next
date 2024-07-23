import { create } from 'zustand';
import { User, StoreState } from './types';

const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useStore;
