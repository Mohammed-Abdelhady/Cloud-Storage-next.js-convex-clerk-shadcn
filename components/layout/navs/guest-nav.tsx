import Logo from "@/components/base/logo";
import ThemeColorSwitcher from "@/components/base/theme-switcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

const LINKS = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Solutions",
    href: "#productivity",
  },
  {
    name: "Availability",
    href: "#availability",
  },
];

interface NavLinkProps {
  href: string;
  name: string;
}

/**
 * Renders a navigation link component.
 *
 * @param {NavLinkProps} props - The props object containing the href and name of the link.
 * @return {JSX.Element} The rendered navigation link component.
 */
const NavLink = ({ href, name }: NavLinkProps) => {
  return (
    <Link href={href} className="text-muted-foreground transition-colors hover:text-foreground">
      {name}
    </Link>
  );
};

/**
 * Renders a mobile slide navigation component.
 *
 * @return {JSX.Element} The rendered mobile slide navigation component.
 */
const MobileSlide = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      {/* @ts-ignore */}
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Logo />
          {LINKS.map((link) => (
            <NavLink key={link.name} href={link.href} name={link.name} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

/**
 * Renders the guest navigation component.
 *
 * @return {JSX.Element} The rendered guest navigation component.
 */
const GuestNav = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {/* Logo */}
        <Logo />
        {/* Links */}
        {LINKS.map((link) => (
          <NavLink key={link.name} href={link.href} name={link.name} />
        ))}
      </nav>

      {/* Mobile Slide */}
      <MobileSlide />
      {/* Right side (Actions) */}
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto" />
        {/* Authnetication */}
        <Button color="primary">Sign In</Button>
        {/* Theme Switcher */}
        <ThemeColorSwitcher />
      </div>
    </header>
  );
};

export default GuestNav;
