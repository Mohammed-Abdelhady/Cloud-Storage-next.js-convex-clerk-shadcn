import React from "react";
import GuestNav from "../navs/guest-nav";

interface GuestWrapperProps {
  children: React.ReactNode;
}

/**
 * Renders a guest wrapper component with a guest navigation and the provided children.
 *
 * @param {GuestWrapperProps} props - The props object containing the children.
 * @return {JSX.Element} The guest wrapper component with the guest navigation and children.
 */
const GuestWrapper = ({ children }: GuestWrapperProps) => {
  return (
    <>
      <GuestNav />
      <main>{children}</main>
    </>
  );
};

export default GuestWrapper;
