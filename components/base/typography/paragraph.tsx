import { cn } from "@/lib/utils";
import React from "react";

interface ParagraphProps {
  size?: "large" | "medium" | "small";
  align?: "left" | "center" | "right";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
  children: React.ReactNode;
  className?: string;
}

/**
 * Renders a paragraph element with specified size, alignment, max width, and class name.
 *
 * @param {Object} props - The properties for the Paragraph component.
 * @param {string} [props.size="medium"] - The size of the paragraph.
 * @param {string} [props.align="left"] - The alignment of the paragraph.
 * @param {string} [props.maxWidth="4xl"] - The max width of the paragraph.
 * @param {React.ReactNode} props.children - The content of the paragraph.
 * @param {string} [props.className=""] - Additional CSS class name for styling.
 * @return {JSX.Element} The rendered paragraph element.
 */
const Paragraph = ({
  size = "medium", // default size
  align = "left", // default alignment
  maxWidth = "4xl", // default max width
  children,
  className = "",
}: ParagraphProps) => {
  const sizeClasses = {
    large: "text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed sm:leading-loose",
    medium: "text-base sm:text-lg md:text-xl lg:text-2xl leading-normal sm:leading-relaxed",
    small: "text-sm sm:text-base md:text-lg lg:text-xl leading-snug sm:leading-normal",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    full: "max-w-full",
  };

  const computedClassName = cn(
    sizeClasses[size],
    alignClasses[align],
    maxWidthClasses[maxWidth],
    "font-light text-gray-500",
    className,
  );

  return <p className={computedClassName}>{children}</p>;
};

export default Paragraph;
