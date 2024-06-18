import { ServerCog } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
      <ServerCog className="h-8 w-8 text-primary" />
      <span className="w-full">Cloudix</span>
    </Link>
  );
};

export default Logo;
