"use client";
import { SignOutButton } from "@clerk/clerk-react";
import React from "react";

/**
 * Renders a sign-out button with the provided children.
 *
 * @param {Object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the sign-out button.
 * @return {JSX.Element} The sign-out button component.
 */
const LogoutAction = ({ children }: { children: React.ReactNode }) => {
  return <SignOutButton>{children}</SignOutButton>;
};

export default LogoutAction;
