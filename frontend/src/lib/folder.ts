import axiosInstance from ".";
import { IGetFoldersResponse } from "../types/responses";

export const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "";

export const fetchFolders = async (parentId?: number) =>
  await axiosInstance.get<IGetFoldersResponse>(`/folders/${parentId ?? ""}`);

export const handleCreateFolder = async (name: string, parentId?: number) => {
  if (!name) return;

  return await axiosInstance.post("/folders/create", { name, parentId });
};

export const handleDeleteFolder = async (id: number) => {
  return await axiosInstance.delete(`/folders/${id}`);
};

export const handleCloneFolder = (id: number) => {
  return axiosInstance.post(`/folders/clone/${id}`, {});
};

export const handleRenameFolder = async (name: string, id: number) => {
  if (!name) return;

  return await axiosInstance.put(`/folders/rename/${id}`, { name });
};
