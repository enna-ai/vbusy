import AuthProvider from "@/context/AuthProvider";
import "@/styles/main.scss";
import { Inter } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "v busy 🐝",
  description: "Task Manager",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
            {children}
        </body>
      </AuthProvider>
    </html>
  )
}
