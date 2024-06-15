"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * Renders the ThemeProvider component with the provided children and props.
 *
 * @param {ReactNode} children - The child elements to be rendered within the ThemeProvider.
 * @param {ThemeProviderProps} props - The props to be passed to the ThemeProvider.
 * @return {ReactElement} The rendered ThemeProvider component.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
