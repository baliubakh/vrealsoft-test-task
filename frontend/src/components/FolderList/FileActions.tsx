import { btnClasses } from ".";

interface FileActionsProps {
  fileId: number;
  fileName: string;
  onClone: (fileId: number) => void;
  onEdit: (fileId: number) => void;
  onRename: (fileId: number, fileName: string) => void;
  onDelete: (fileId: number, fileName: string) => void;
}

export default function FileActions({
  fileId,
  fileName,
  onClone,
  onEdit,
  onRename,
  onDelete,
}: FileActionsProps) {
  return (
    <div className="flex gap-1 mt-2">
      <button
        className={btnClasses}
        title="Clone"
        onClick={() => onClone(fileId)}
      >
        🧬
      </button>
      <button
        className={btnClasses}
        title="Edit"
        onClick={() => onEdit(fileId)}
      >
        ✏️
      </button>
      <button
        className={btnClasses}
        title="Rename"
        onClick={() => onRename(fileId, fileName)}
      >
        📝
      </button>
      <button
        className={btnClasses}
        title="Remove"
        onClick={() => onDelete(fileId, fileName)}
      >
        ❌
      </button>
    </div>
  );
}
