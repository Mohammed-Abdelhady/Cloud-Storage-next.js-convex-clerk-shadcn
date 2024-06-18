"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Renders the side navigation bar with links and icons.
 *
 * @return {JSX.Element} The JSX element representing the side navigation bar.
 */
export function SideNav() {
  const currentPath = usePathname();
  const { theme } = useTheme();
  const sideNavLinks = [
    { name: "All Files", href: "/dashboard/files", icon: FileIcon },
    { name: "Favorites", href: "/dashboard/favorites", icon: StarIcon },
    { name: "Trash", href: "/dashboard/trash", icon: TrashIcon },
  ];

  return (
    <div className="flex h-screen w-40 flex-col gap-4 border-r p-2 pt-10">
      {sideNavLinks.map(({ name, href, icon: Icon }) => (
        <Link key={name} href={href}>
          <Button
            variant="link"
            className={clsx(
              `text flex w-full flex-row justify-start gap-2 ${theme == "dark" ? "text-white" : "text-black"}`,
              {
                "bg-primary text-white": currentPath.includes(href),
              },
            )}
          >
            <Icon /> {name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
