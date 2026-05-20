import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lulu Yang | AI Product Portfolio",
  description: "AI 产品经理 × AI Agent 开发者作品集",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
