import { useState, useEffect } from "react";
import DialogModal from "./Dialog";

interface RenameModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (newName: string) => void;
  currentName: string;
}

export default function RenameModal({
  open,
  onClose,
  onConfirm,
  currentName,
}: RenameModalProps) {
  const [newName, setNewName] = useState(currentName);

  useEffect(() => {
    if (open) setNewName(currentName);
  }, [open, currentName]);

  return (
    <DialogModal
      open={open}
      onClose={onClose}
      title="Rename File"
      actions={
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onConfirm(newName)}
            className="rounded border border-gray-400 px-4 py-2 hover:bg-gray-100"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="rounded border border-gray-400 px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      }
    >
      <input
        autoFocus
        className="w-full border border-gray-400 rounded px-3 py-2 text-sm"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
    </DialogModal>
  );
}
