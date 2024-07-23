// types.ts
export interface User {
  id: string;
  email: string;
  token: string;
  // Ajoute d'autres propriétés si nécessaire
}

export interface StoreState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}
