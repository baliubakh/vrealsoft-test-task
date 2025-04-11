import { create } from "zustand";

interface UploadState {
  isPublic: boolean;
  file: File | null;
  open: boolean;
  setIsPublic: (value: boolean) => void;
  setFile: (files: File | null) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  isPublic: true,
  file: null,
  open: false,
  setIsPublic: (value) => set({ isPublic: value }),
  setFile: (file) => set({ file }),
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
}));
