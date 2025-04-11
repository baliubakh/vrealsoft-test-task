import { useCallback } from "react";
import DialogModal from "../Dialog";
import { useUploadStore } from "../../store/useUploadFileStore";
import { useDropzone } from "react-dropzone";
import { handleFileUpload } from "../../lib/file";
import { useFileStore } from "../../store/useFileStore";

const btnClasses =
  "cursor-pointer rounded border border-gray-400 px-4 py-2 hover:bg-gray-100";

interface IUploadFileProps {
  folderId: number;
}

export default function UploadFile({ folderId }: IUploadFileProps) {
  const { fetchFiles } = useFileStore();
  const { isPublic, file, open, setIsPublic, setFile, closeModal, openModal } =
    useUploadStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currFile = acceptedFiles[0];

      setFile(currFile);
    },
    [setFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
  });

  const handleSave = async () => {
    try {
      console.log({ file });
      if (!file) return;

      await handleFileUpload(file, folderId);
      await fetchFiles(folderId);
      setFile(null);
      closeModal();
    } catch (err) {
      console.error({ err });
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div className="text-center">
        <h2>Upload File to this folder</h2>
        <button className={`${btnClasses} mt-2`} onClick={openModal}>
          Upload!
        </button>
      </div>
      <DialogModal
        open={open}
        onClose={closeModal}
        title="File Upload"
        actions={
          <>
            <button className={btnClasses} onClick={handleSave}>
              Save changes
            </button>
            <button className={btnClasses} onClick={closeModal}>
              Cancel
            </button>
          </>
        }
      >
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          <label htmlFor="isPublic" className="text-sm">
            is public
          </label>
        </div>

        <div {...getRootProps()}>
          <div className="mt-4 flex items-center space-x-2">
            <label
              htmlFor="fileUpload"
              className="border border-gray-400 px-4 py-2 rounded w-full"
            >
              {file ? file.name : "File upload"}
            </label>
            <input {...getInputProps()} />
            <label htmlFor="fileUpload" className={btnClasses}>
              Choose...
            </label>
          </div>

          <div className="mt-10 rounded border-2 border-dashed border-gray-400 px-4 py-16 text-center text-xl text-gray-600">
            {isDragActive ? "Drop" : "Drop files to upload"}
          </div>
        </div>
      </DialogModal>
    </div>
  );
}
