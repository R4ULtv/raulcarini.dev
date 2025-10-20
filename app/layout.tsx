import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { baseURL } from "@/lib/url";
import { ThemeProvider } from "next-themes";
import ThemeSwitch from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { FolderCogIcon, RssIcon } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: {
    default: "Raul Carini",
    template: "%s | Raul Carini",
  },
  description:
    "Full Stack Developer working on solo projects and freelancing, currently based in Milan, Italy",
  openGraph: {
    url: new URL(baseURL),
    images: [
      {
        url: `/api/dynamic-og`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Toaster position="top-center" duration={2000} />
          <main className="max-w-[45rem] mx-auto py-10 sm:py-16 px-4 sm:px-6">
            <header className="mb-10 sm:mb-16 flex items-start gap-1">
              <div className="flex flex-col items-start">
                <Link
                  href={"/"}
                  className="text-base inline-block font-medium no-underline"
                >
                  Raul Carini
                </Link>
                <span className="text-base font-medium leading-none text-muted-foreground">
                  Full Stack Developer
                </span>
              </div>
              <nav className="ml-auto flex gap-1 text-sm">
                <Button variant="link" size="sm" asChild>
                  <Link href="/blog" aria-label="Blog Page">
                    <RssIcon className="sm:hidden" />
                    <span className="hidden sm:inline">Blog</span>
                  </Link>
                </Button>
                <Button variant="link" size="sm" asChild>
                  <Link href="/projects" aria-label="Projects Page">
                    <FolderCogIcon className="sm:hidden" />
                    <span className="hidden sm:inline">Projects</span>
                  </Link>
                </Button>
              </nav>
              <ThemeSwitch />
            </header>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
