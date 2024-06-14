"use client";
import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * Renders the ConvexClientProvider component with the specified children.
 *
 * @param {ReactNode} children - The child elements to be rendered within the ConvexProvider component.
 * @return {ReactElement} The ConvexProvider component with the specified client and children.
 */
export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
