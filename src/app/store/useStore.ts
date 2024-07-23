import { create } from 'zustand';
import { User } from './types';

interface StoreState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;

}

const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useStore;
