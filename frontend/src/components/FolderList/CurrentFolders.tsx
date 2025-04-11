import { useEffect } from "react";
import { Link } from "react-router";

import useFolderStore from "../../store/useFolderStore";
import CreateFolder from "../Home/CreateFolder";
import { btnClasses } from ".";

import {
  handleCloneFolder,
  handleDeleteFolder,
  handleRenameFolder,
} from "../../lib/folder";

import ConfirmModal from "../ConfirmDialog";
import RenameModal from "../RenameDialog";
import FolderActions from "./FolderActions";
import { fetchFiles } from "../../lib/file";
import useFolderModalStore from "../../store/useFolderModalState";

interface ICurrentFoldersProps {
  parentId?: number;
  search?: string;
}

export default function CurrentFolders({
  parentId,
  search,
}: ICurrentFoldersProps) {
  const { folders, fetchFolders } = useFolderStore();

  const {
    confirmOpen,
    confirmId,
    confirmModalText,
    openConfirmModal,
    closeConfirmModal,

    renameOpen,
    renameFileInfo,
    openRenameModal,
    closeRenameModal,
  } = useFolderModalStore();

  useEffect(() => {
    fetchFolders(parentId);
  }, [fetchFolders, parentId]);

  if (!folders) {
    return (
      <>
        <CreateFolder parentId={parentId} />
        <p>No folders available</p>
      </>
    );
  }

  const filteredFolders = search
    ? folders.children.filter((fol) =>
        fol.name.toLowerCase().includes(search.toLowerCase())
      )
    : folders.children;

  const cloneFolderHandler = async (id: number) => {
    await handleCloneFolder(id);
    fetchFolders(parentId);
  };

  const deleteFolderHandler = async () => {
    if (confirmId !== null) {
      await handleDeleteFolder(confirmId);
      fetchFolders(parentId);
      fetchFiles();
      closeConfirmModal();
    }
  };

  const renameFolderHandler = async (newName: string) => {
    if (renameFileInfo) {
      await handleRenameFolder(newName, renameFileInfo.id);
      fetchFolders(parentId);
      closeRenameModal();
    }
  };

  return (
    <div>
      <h2 className="mb-4">Folders</h2>
      <ul className="flex gap-8 min-h-[38px] flex-wrap">
        {filteredFolders.map((folder) => (
          <li key={folder.id}>
            <div className="flex flex-col items-center">
              <Link to={`/folder${folder.urlPath}`} className={btnClasses}>
                {folder.name}
              </Link>

              <FolderActions
                id={folder.id}
                name={folder.name}
                onClone={cloneFolderHandler}
                onRename={(id: number, name: string) =>
                  openRenameModal(id, name)
                }
                onDelete={(id: number, name: string) =>
                  openConfirmModal(
                    id,
                    `Delete folder "${name}"? All files in folders also will be deleted`
                  )
                }
              />
            </div>
          </li>
        ))}
      </ul>

      <ConfirmModal
        open={confirmOpen}
        onClose={closeConfirmModal}
        onConfirm={deleteFolderHandler}
      >
        {confirmModalText}
      </ConfirmModal>

      {renameFileInfo && (
        <RenameModal
          open={renameOpen}
          currentName={renameFileInfo.name}
          onClose={closeRenameModal}
          onConfirm={renameFolderHandler}
        />
      )}
    </div>
  );
}
