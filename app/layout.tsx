import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Salary Calculator - Calculate Tech Salaries Worldwide",
  description: "Free salary calculator for AI Engineers, Data Scientists, and Tech Professionals. Get accurate salary estimates based on location, experience, and skills.",
  keywords: ["salary calculator", "ai engineer salary", "data scientist salary", "tech salaries", "developer salary"],
  authors: [{ name: "AI Salary Calculator" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aisalarycalculator.com",
    siteName: "AI Salary Calculator",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense - Replace with your Publisher ID */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9530397831230003"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {children}
      </body>
    </html>
  );
}
