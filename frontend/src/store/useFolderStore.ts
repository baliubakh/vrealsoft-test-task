import { create } from "zustand";
import { IFolder, IGetFoldersResponse } from "../types/responses";
import { fetchFolders } from "../lib/folder";

interface FolderState {
  currentFolder: IFolder | null;
  setCurrentFolder: (folder: IFolder | null) => void;
  folders: IGetFoldersResponse | null;
  fetchFolders: (parentId?: number) => Promise<void>;
}

const useFolderStore = create<FolderState>((set) => ({
  currentFolder: null,
  setCurrentFolder: (folder) => set({ currentFolder: folder }),
  folders: null,
  fetchFolders: async (parentId?: number) => {
    const data = await fetchFolders(parentId);
    set({ folders: data.data });
  },
}));

export default useFolderStore;
