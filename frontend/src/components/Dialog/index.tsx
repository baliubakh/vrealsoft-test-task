import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { ReactNode } from "react";

interface IDialogModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function DialogModal({
  open,
  onClose,
  title,
  children,
  actions,
}: IDialogModalProps) {
  return (
    <Transition appear show={open}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded border border-gray-500 bg-white p-6">
              <DialogTitle className="border-b border-gray-500 pb-2 text-center font-semibold">
                {title}
              </DialogTitle>

              <div className="mt-6">{children}</div>

              {actions && (
                <div className="mt-8 flex justify-end space-x-2">{actions}</div>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
