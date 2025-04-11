import { useEffect, useState } from "react";
import UploadFile from "../Home/UploadFile";
import useFolderStore from "../../store/useFolderStore";
import { useFileStore } from "../../store/useFileStore";
import { btnClasses } from ".";
import FileActions from "./FileActions";
import { cloneFile, deleteFile, editFile, renameFile } from "../../lib/file";
import ConfirmModal from "../ConfirmDialog";
import RenameModal from "../RenameDialog";
import EditFileModal from "../EditFileDialog";
import useFileModalStore from "../../store/useFileModalState";

interface ICurrentFilesProps {
  parentId?: number;
  search?: string;
}

export default function CurrentFiles({ parentId, search }: ICurrentFilesProps) {
  const { folders } = useFolderStore();
  const { files, fetchFiles } = useFileStore();

  const {
    confirmId,
    confirmOpen,
    confirmModalText,
    renameOpen,
    renameFileInfo,
    editOpen,
    editFileInfo,
    openConfirmModal,
    closeConfirmModal,
    openRenameModal,
    closeRenameModal,
    openEditModal,
    closeEditModal,
  } = useFileModalStore();

  const currFolder = folders?.current;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles(parentId);
  }, [fetchFiles, parentId]);

  const handleClone = async (fileId: number) => {
    setLoading(true);
    try {
      await cloneFile(fileId);
      fetchFiles(parentId);
    } catch {
      setError("Failed to clone the file.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (file: File) => {
    if (!editFileInfo) return;
    setLoading(true);
    try {
      await editFile(editFileInfo.id, file);
      fetchFiles(parentId);
    } catch {
      setError("Failed to update the file.");
    } finally {
      setLoading(false);
      closeEditModal();
    }
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setLoading(true);
    try {
      await deleteFile(confirmId);
      fetchFiles(parentId);
    } catch {
      setError("Failed to delete the file.");
    } finally {
      setLoading(false);
      closeConfirmModal();
    }
  };

  const handleRename = async (newName: string) => {
    if (!renameFileInfo) return;
    setLoading(true);
    try {
      await renameFile(renameFileInfo.id, newName);
      fetchFiles(parentId);
    } catch {
      setError("Failed to rename the file.");
    } finally {
      setLoading(false);
      closeRenameModal();
    }
  };

  const filteredFiles = search
    ? files?.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    : files;

  if (!filteredFiles || loading) return <p>Loading folder...</p>;

  return (
    <div className="mb-4">
      {(currFolder && (
        <>
          <p>Your current folder: {currFolder.name}</p>
          <UploadFile folderId={currFolder.id} />
          <h2 className="mb-4">Files in {currFolder.name}</h2>
        </>
      )) || <h2>All Files</h2>}

      {error && <p className="text-red-500">{error}</p>}

      <ul className="flex flex-wrap gap-8">
        {filteredFiles.map((currFile) => (
          <li key={currFile.id}>
            <div className="flex flex-col items-center">
              <button className={btnClasses}>{currFile.name}</button>
              <FileActions
                fileId={currFile.id}
                fileName={currFile.name}
                onClone={handleClone}
                onEdit={() => openEditModal(currFile.id, currFile.name)}
                onRename={() => openRenameModal(currFile.id, currFile.name)}
                onDelete={() =>
                  openConfirmModal(
                    currFile.id,
                    `Are you sure you want to delete "${currFile.name}"?`
                  )
                }
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Modals */}
      <ConfirmModal
        open={confirmOpen}
        onClose={closeConfirmModal}
        onConfirm={handleDelete}
      >
        {confirmModalText}
      </ConfirmModal>

      {renameOpen && renameFileInfo && (
        <RenameModal
          open={renameOpen}
          onClose={closeRenameModal}
          onConfirm={handleRename}
          currentName={renameFileInfo.name}
        />
      )}

      {editOpen && editFileInfo && (
        <EditFileModal
          open={editOpen}
          currentName={editFileInfo.name}
          onClose={closeEditModal}
          onConfirm={handleEdit}
        />
      )}
    </div>
  );
}
