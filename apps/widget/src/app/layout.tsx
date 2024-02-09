import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/main.scss";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#A44A3F"
};

export const metadata: Metadata = {
  title: "Vbusy Widget",
  description: "VBusy Widget Builder",
  icons: "favicon.ico"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
