import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AfterLife Care",
  description: "Wallet, payments, and a Soroban contract on Stellar testnet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
