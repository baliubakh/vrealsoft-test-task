"use client";

import { memo, useState } from "react";

import CurrentFolders from "./CurrentFolders";
import CurrentFiles from "./CurrentFiles";

interface IFolderListProps {
  parentId?: number;
}
export const btnClasses =
  "cursor-pointer rounded border border-gray-400 px-4 py-2 hover:bg-gray-100";

function FolderList({ parentId }: IFolderListProps) {
  const [search, setSearch] = useState<string>("");
  //   const handleRenameFolderFunc = (id: number) => {
  //     handleRenameFolder(editName, id);
  //     foldersRefetch();
  //     setEditName("");
  //   };

  //   const handleDeleteFolderFunc = (id: number) => {
  //     handleDeleteFolder(id);
  //     foldersRefetch();
  //   };

  //   const handleCloneFolderFunc = (id: number) => {
  //     handleCloneFolder(id);
  //     foldersRefetch();
  //   };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSearch(query);
  };

  return (
    <>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md overflow-hidden rounded-full border border-gray-400"
        >
          <input
            type="text"
            placeholder="Search input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-4 py-2 outline-none"
          />
          <button
            type="submit"
            className="border-l border-gray-400 px-4 py-2 hover:bg-gray-100"
          >
            Search
          </button>
        </form>
      </div>
      <CurrentFolders parentId={parentId} search={search} />
      <CurrentFiles parentId={parentId} search={search} />
    </>
  );
}

export default memo(FolderList);
