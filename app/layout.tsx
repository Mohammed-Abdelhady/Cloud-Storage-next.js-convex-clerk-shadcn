import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./custom.css";
import ConvexClientProvider from "./ConvexClientProvider";
import { ThemeProvider } from "./ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloudix",
  description:
    "A cutting-edge cloud storage solution similar to Google Drive, built with modern technologies including React, Next.js, Shadcn, Convex, and Clerk. Seamlessly manage and share your files with high performance, security, and user-friendly interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <>{children}</>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
