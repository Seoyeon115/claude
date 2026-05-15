import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casino Roulette",
  description: "Spin the wheel and test your luck!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#0D0D0D] antialiased">{children}</body>
    </html>
  );
}
