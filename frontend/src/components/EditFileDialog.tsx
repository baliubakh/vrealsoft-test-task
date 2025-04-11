import { useCallback, useState } from "react";
import DialogModal from "./Dialog";
import { useDropzone } from "react-dropzone";

interface EditFileModalProps {
  open: boolean;
  currentName: string;
  onClose: () => void;
  onConfirm: (file: File) => void;
}

export default function EditFileModal({
  open,
  currentName,
  onClose,
  onConfirm,
}: EditFileModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (selectedFile) onConfirm(selectedFile);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currFile = acceptedFiles[0];

      setSelectedFile(currFile);
    },
    [setSelectedFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
  });

  return (
    <DialogModal
      open={open}
      onClose={onClose}
      title={`Edit File: ${currentName}`}
      actions={
        <div className="flex justify-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedFile}
            className="rounded border border-gray-400 px-4 py-2 hover:bg-gray-100"
          >
            Edit
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
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      <div {...getRootProps()}>
        <input className="w-full text-center" {...getInputProps()} />
        <div className="mt-10 rounded border-2 border-dashed border-gray-400 px-4 py-16 text-center text-xl text-gray-600">
          {isDragActive ? "Drop" : "Drop here or click to upload"}
        </div>
      </div>
    </DialogModal>
  );
}
