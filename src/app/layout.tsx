import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Depoii | Commercial Intelligence Platform",
  description:
    "Cross-referencing satellite roof aging, Doppler hail swaths, and true building owner records for North Texas commercial roofers.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: ["/icon.svg"],
    apple: ["/icon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-[#191918] bg-white selection:bg-[#cce5ff]">
        {children}
      </body>
    </html>
  );
}
