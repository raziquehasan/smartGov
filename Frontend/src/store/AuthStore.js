import { create } from 'zustand';

// 'export const' likhna zaroori hai tabhi { useAuthStore } kaam karega
export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));