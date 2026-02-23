import { create } from 'zustand';

export const useUIStore = create((set) => ({
  toast: {
    message: '',
    isVisible: false,
    type: 'success', // success or error
  },
  
  showToast: (message, type = 'success') => {
    set({ toast: { message, isVisible: true, type } });
    
    // 3 seconds baad automatic hide ho jayega
    setTimeout(() => {
      set({ toast: { message: '', isVisible: false, type: 'success' } });
    }, 3000);
  },
}));