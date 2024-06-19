import { FileBrowser } from "../_components/file-browser";

/**
 * Renders a component that displays a FileBrowser with the title "Favorites" and the "showFavoritesOnly" prop set to true.
 *
 * @return {JSX.Element} The rendered component.
 */
export default function Favorites() {
  return (
    <div>
      <FileBrowser title="Favorites" showFavoritesOnly />
    </div>
  );
}
