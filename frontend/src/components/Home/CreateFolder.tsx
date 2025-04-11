import { useState } from "react";
import { handleCreateFolder } from "../../lib/folder";
import DialogModal from "../Dialog";
import useFolderStore from "../../store/useFolderStore";

const btnClasses = "rounded border border-gray-400 px-4 py-2 hover:bg-gray-100";

interface ICreateFolder {
  parentId?: number;
}

export default function CreateFolder({ parentId }: ICreateFolder) {
  const { fetchFolders } = useFolderStore();

  const [open, setOpen] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState("");

  const onClose = () => setOpen(false);

  const handleSave = async () => {
    await handleCreateFolder(newFolderName, parentId);
    setNewFolderName("");
    await fetchFolders(parentId);
    onClose();
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div className="text-center">
        <h2>Create Folder</h2>
        <button className={`${btnClasses} mt-2`} onClick={() => setOpen(true)}>
          Create
        </button>
      </div>
      <DialogModal
        open={open}
        onClose={onClose}
        title="Create/Edit Folder"
        actions={
          <>
            <button onClick={handleSave} className={btnClasses}>
              Save changes
            </button>
            <button onClick={onClose} className={btnClasses}>
              Cancel
            </button>
          </>
        }
      >
        <input
          type="text"
          placeholder="Text input"
          className="w-full rounded border border-gray-400 px-3 py-2 focus:outline-none"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
      </DialogModal>
    </div>
  );
}
