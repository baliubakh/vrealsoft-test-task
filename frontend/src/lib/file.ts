import axiosInstance from ".";
import { IFile } from "../types/responses";

export const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "";

export const handleFileUpload = (file: File | null, selectedFolder: number) => {
  if (!file || !selectedFolder) return;

  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post(`/file/upload/${selectedFolder}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const fetchFiles = async (parentId?: number) =>
  await axiosInstance.get<IFile[]>(`/file/${parentId ?? ""}`);

export const cloneFile = async (fileId: number) =>
  await axiosInstance.post(`/file/clone/${fileId}`);

export const deleteFile = async (fileId: number) =>
  await axiosInstance.delete(`/file/${fileId}`);

export const renameFile = async (fileId: number, newName: string) =>
  await axiosInstance.patch(`/file/rename/${fileId}`, { newName });

export const editFile = async (fileId: number, newFile: File) => {
  const formData = new FormData();
  formData.append("file", newFile);

  return axiosInstance.post(`/file/edit/${fileId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
