import { create } from "zustand";
import { IFile } from "../types/responses";
import { fetchFiles } from "../lib/file";
import { ReactNode } from "react";

interface FileStore {
  files: IFile[] | null;
  fetchFiles: (parentId?: number) => Promise<void>;
  confirmModalText: ReactNode | null;
  renameFileInfo: { id: number; name: string } | null;
  editFileInfo: { id: number; name: string } | null;
}

export const useFileStore = create<FileStore>((set) => ({
  files: null,
  fetchFiles: async (parentId) => {
    const data = await fetchFiles(parentId);
    set({ files: data.data });
  },
  confirmModalText: null,
  renameFileInfo: null,
  editFileInfo: null,
}));
