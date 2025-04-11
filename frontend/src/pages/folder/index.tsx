import { useParams } from "react-router";
import FolderList from "../../components/FolderList";

import CreateFolder from "../../components/Home/CreateFolder";

export default function FolderPage() {
  const { "*": splat } = useParams();

  if (!splat) throw new Error("No Id");

  const splittedSplat = Array.from(new Set(splat.split("/")));

  const folderId = splittedSplat[splittedSplat.length - 1];

  return (
    <>
      <CreateFolder parentId={+folderId} />

      <FolderList parentId={+folderId} />
    </>
  );
}
