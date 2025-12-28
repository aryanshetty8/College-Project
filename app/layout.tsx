

import ReminderChecker from "@/components/ReminderChecker";

import { Outfit } from "next/font/google";
import type { Metadata } from "next";

import { Toaster } from "sonner";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "../lib/edgestore";

const outfit = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quickflow",
  description: "A Better & Open-Source Notion Alternative",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.jpg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="quickflow-theme"
            >
              {/* ✅ CLIENT REMINDER CHECKER */}
              <ReminderChecker />

              {children}

              <Toaster position="bottom-center" />
              <ModalProvider />
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
