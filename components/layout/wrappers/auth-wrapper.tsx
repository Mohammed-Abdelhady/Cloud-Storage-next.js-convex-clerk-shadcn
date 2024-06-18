import React from "react";
import AuthNav from "../navs/auth-nav";
import { SideNav } from "../navs/side-nav";

interface AuthWrapperProps {
  children: React.ReactNode;
}

/**
 * Renders a auth wrapper component with a auth navigation and the provided children.
 *
 * @param {AuthWrapperProps} props - The props object containing the children.
 * @return {JSX.Element} The auth wrapper component with the auth navigation and children.
 */
const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return (
    <>
      <AuthNav />
      <SideNav />
      <main className="md:container md:mx-auto">{children}</main>
    </>
  );
};

export default AuthWrapper;
