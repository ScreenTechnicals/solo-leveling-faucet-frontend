import { ClientProvider } from "@/providers";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solo Leveling Token's Faucet",
  description: "This is a faucet for claming Solo Levelig Token (SLT)",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <ClientProvider>{children}</ClientProvider>
        </body>
      </html>
    </>
  );
}
