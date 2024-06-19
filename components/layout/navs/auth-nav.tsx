"use client";
import LoginAction from "@/components/auth/login-action";
import Logo from "@/components/base/logo";
import ThemeColorSwitcher from "@/components/base/theme-switcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { OrganizationSwitcher, UserButton } from "@clerk/clerk-react";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { dark } from "@clerk/themes";

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
        </nav>
      </SheetContent>
    </Sheet>
  );
};

/**
 * Renders the auth navigation component.
 *
 * @return {JSX.Element} The rendered auth navigation component.
 */
const AuthNav = () => {
  const { theme } = useTheme();
  console.log(theme, "theme");
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {/* Logo */}
        <Logo />
      </nav>

      {/* Mobile Slide */}
      <MobileSlide />
      {/* Right side (Actions) */}
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto" />
        {/* Authnetication */}
        <div>
          <OrganizationSwitcher appearance={theme == "dark" ? (dark as any) : undefined} />
        </div>
        <div>
          <UserButton />
        </div>
        {/* Theme Switcher */}
        <ThemeColorSwitcher />
      </div>
    </header>
  );
};

export default AuthNav;
