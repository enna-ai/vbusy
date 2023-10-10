import "@/styles/main.scss";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "v busy 🐝",
  description: "Task Manager",
  icons: "favicon.ico",
  themeColor: "#f5e48b"
}

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
