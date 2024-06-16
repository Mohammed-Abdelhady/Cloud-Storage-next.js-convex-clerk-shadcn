import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  size?: "large" | "medium" | "small";
  tag?: keyof JSX.IntrinsicElements;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
  className?: string;
}

/**
 * Renders a heading element with specified size, alignment, and class name.
 *
 * @param {Object} props - The properties for the heading.
 * @param {React.ComponentType} [props.tag="h1"] - The HTML tag for the heading.
 * @param {"large" | "medium" | "small"} [props.size="large"] - The size of the heading.
 * @param {"left" | "center" | "right"} [props.align="left"] - The alignment of the heading.
 * @param {React.ReactNode} props.children - The content of the heading.
 * @param {string} [props.className=""] - Additional CSS class name for styling.
 * @return {JSX.Element} The rendered heading element.
 */
const Heading = ({
  tag: Tag = "h1",
  size = "large", // default size
  align = "left", // default alignment
  children,
  className = "",
}: HeadingProps) => {
  const sizeClasses = {
    large:
      "text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none sm:leading-snug md:leading-tight lg:leading-snug",
    medium:
      "text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-none sm:leading-normal md:leading-tight lg:leading-snug",
    small:
      "text-lg sm:text-xl md:text-2xl lg:text-3xl leading-none sm:leading-relaxed md:leading-tight lg:leading-snug",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const computedClassName = cn(sizeClasses[size], alignClasses[align], "font-bold", className);

  return <Tag className={computedClassName}>{children}</Tag>;
};

export default Heading;
