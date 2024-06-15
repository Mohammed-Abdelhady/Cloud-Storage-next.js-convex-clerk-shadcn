import { cn } from "@/lib/utils";
import React from "react";

interface CenterProps {
  isCol?: boolean;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Renders a centered container with optional flex column layout.
 *
 * @param {boolean} isCol - Determines if the container should be laid out in a column. Defaults to true.
 * @param {React.ReactNode} children - The content to be rendered inside the container.
 * @param {string} className - Additional CSS classes to be applied to the container.
 * @param {string} id - The ID attribute for the container.
 * @return {JSX.Element} The centered container.
 */
const Center = ({ isCol = true, children, className, id }: CenterProps) => {
  return (
    <div
      id={id || ""}
      className={cn(
        `flex items-center justify-center text-center ${isCol ? "flex-col" : "flex-row"}`,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Center;
