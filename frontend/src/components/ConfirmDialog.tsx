import { PropsWithChildren } from "react";
import DialogModal from "./Dialog";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  children,
}: PropsWithChildren<ConfirmModalProps>) {
  return (
    <DialogModal
      open={open}
      onClose={onClose}
      title="Are you sure?"
      actions={
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="rounded border border-gray-400 px-4 py-2 hover:bg-gray-100"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="rounded border border-gray-400 px-4 py-2 hover:bg-gray-100"
          >
            No
          </button>
        </div>
      }
    >
      <p className="text-center text-gray-700">{children}</p>
    </DialogModal>
  );
}
