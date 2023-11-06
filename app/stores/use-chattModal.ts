import { create } from 'zustand';

interface ChattModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useChattContainer = create<ChattModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useChattContainer;