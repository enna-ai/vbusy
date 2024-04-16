import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/main.scss";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#181926"
};

const meta = {
  title: "Vbusy",
  description: "A versatile task manager web app",
  icon: "favicon.png",
  banner: "/banner.png",
  url: "https://vbusy.vercel.app",
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    keywords: ["Task Manager", "Productivity", "Vbusy"],
    creator: "enna-ai",
    authors: [{ name: "enna-ai", url: "https://github.com/enna-ai/vbusy" }],
    publisher: "enna-ai",
    icons: { icon: meta.icon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.banner],
      type: "website",
      siteName: meta.title,
    },
    twitter: {
      card: "summary_large_image",
      site: "Vbusy",
      creator: "enna-ai",
      title: meta.title,
      description: meta.description,
      images: [meta.banner],
    },
  };
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
