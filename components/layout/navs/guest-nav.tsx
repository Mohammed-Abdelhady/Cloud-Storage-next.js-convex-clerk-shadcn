import Logo from "@/components/base/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
const links = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Solutions",
    href: "#solutions",
  },
  {
    name: "Availability",
    href: "#availability",
  },
  {
    name: "Flow",
    href: "#flow",
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
    <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors">
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
          {links.map((link) => (
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
    <header className="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {/* Logo */}
        <Logo />
        {/* Links */}
        {links.map((link) => (
          <NavLink key={link.name} href={link.href} name={link.name} />
        ))}
      </nav>

      {/* Mobile Slide */}
      <MobileSlide />
      {/* Right side (Actions) */}
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Button color="primary">Sign In</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GuestNav;