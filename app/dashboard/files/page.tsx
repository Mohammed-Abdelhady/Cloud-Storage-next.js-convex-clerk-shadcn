import { FileBrowser } from "../_components/file-browser";

/**
 * Renders the FilesPage component, which displays a div containing a FileBrowser component with the title "Your Files".
 *
 * @return {JSX.Element} The rendered FilesPage component.
 */
export default function FilesPage() {
  return (
    <div>
      <FileBrowser title="Your Files" />
    </div>
  );
}
