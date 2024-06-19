import { FileBrowser } from "../_components/file-browser";

/**
 * Renders the FilesPage component which displays a FileBrowser component for the trash folder.
 *
 * @return {JSX.Element} The rendered FilesPage component.
 */
export default function FilesPage() {
  return (
    <div>
      <FileBrowser title="Trash Files" showDeletedOnly />
    </div>
  );
}
