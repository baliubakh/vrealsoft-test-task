import { btnClasses } from ".";

interface FolderActionsProps {
  id: number;
  name: string;
  onClone: (id: number) => void;
  onRename: (id: number, name: string) => void;
  onDelete: (id: number, name: string) => void;
}

export default function FolderActions({
  id,
  name,
  onClone,
  onRename,
  onDelete,
}: FolderActionsProps) {
  return (
    <div className="mt-2 flex gap-2">
      <button className={btnClasses} title="Clone" onClick={() => onClone(id)}>
        🧬
      </button>
      <button
        className={btnClasses}
        title="Rename"
        onClick={() => onRename(id, name)}
      >
        📝
      </button>
      <button
        className={btnClasses}
        title="Delete"
        onClick={() => onDelete(id, name)}
      >
        ❌
      </button>
    </div>
  );
}
