import { create } from "zustand";

interface ConfirmModalState {
  confirmOpen: boolean;
  confirmId: number | null;
  confirmModalText: string;
  openConfirmModal: (id: number, text: string) => void;
  closeConfirmModal: () => void;
}

interface RenameModalState {
  renameOpen: boolean;
  renameFileInfo: { id: number; name: string } | null;
  openRenameModal: (id: number, name: string) => void;
  closeRenameModal: () => void;
}

interface EditModalState {
  editOpen: boolean;
  editFileInfo: { id: number; name: string } | null;
  openEditModal: (id: number, name: string) => void;
  closeEditModal: () => void;
}

type ModalStore = ConfirmModalState & RenameModalState & EditModalState;

const useFolderModalStore = create<ModalStore>((set) => ({
  // Confirm Modal
  confirmOpen: false,
  confirmId: null,
  confirmModalText: "",
  openConfirmModal: (id, text) =>
    set({ confirmOpen: true, confirmId: id, confirmModalText: text }),
  closeConfirmModal: () =>
    set({ confirmOpen: false, confirmId: null, confirmModalText: "" }),

  // Rename Modal
  renameOpen: false,
  renameFileInfo: null,
  openRenameModal: (id, name) =>
    set({ renameOpen: true, renameFileInfo: { id, name } }),
  closeRenameModal: () => set({ renameOpen: false, renameFileInfo: null }),

  // Edit Modal
  editOpen: false,
  editFileInfo: null,
  openEditModal: (id, name) =>
    set({ editOpen: true, editFileInfo: { id, name } }),
  closeEditModal: () => set({ editOpen: false, editFileInfo: null }),
}));

export default useFolderModalStore;
