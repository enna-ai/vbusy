import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import "@/styles/globals.scss";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "v busy 🐝",
  description: 'Task Manager',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}