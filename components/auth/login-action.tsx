"use client";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface LoginActionProps {
  children: React.ReactNode;
  mode?: "sign-only" | "sign-logout-switch" | "sign-dash-switch";
}
/**
 * LoginAction component for handling user authentication.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the sign-in button.
 * @param {string} [props.mode="sign-only"] - The mode for rendering the component.
 * @returns {React.ReactElement} The rendered component.
 */
const LoginAction = ({ children, mode = "sign-only" }: LoginActionProps) => {
  const router = useRouter();

  /**
   * Renders the sign-in button.
   *
   * @returns {React.ReactElement} The sign-in button component.
   */
  const renderSignInButton = () => (
    <SignInButton mode="modal">
      <Button color="primary" size="lg">
        {children}
      </Button>
    </SignInButton>
  );

  /**
   * Renders the sign-out button.
   *
   * @returns {React.ReactElement} The sign-out button component.
   */
  const renderSignOutButton = () => (
    <SignOutButton>
      <Button>Sign Out</Button>
    </SignOutButton>
  );

  /**
   * Renders the redirect to dashboard button.
   *
   * @returns {React.ReactElement} The redirect to dashboard button component.
   */
  const renderRedirectToDashboardButton = () => (
    <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
  );

  // Render the component based on the mode
  if (mode === "sign-only") {
    return renderSignInButton();
  }

  if (mode === "sign-logout-switch") {
    return (
      <>
        {/* Render the sign-out button when user is signed in */}
        <SignedIn>{renderSignOutButton()}</SignedIn>
        {/* Render the sign-in button when user is signed out */}
        <SignedOut>{renderSignInButton()}</SignedOut>
      </>
    );
  }

  if (mode === "sign-dash-switch") {
    return (
      <>
        {/* Render the redirect to dashboard button when user is signed in */}
        <SignedIn>{renderRedirectToDashboardButton()}</SignedIn>
        {/* Render the sign-in button when user is signed out */}
        <SignedOut>{renderSignInButton()}</SignedOut>
      </>
    );
  }
};

export default LoginAction;
