import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vighnesh B — Portfolio",
  description: "AWS Solutions Architect · Blockchain Developer · AI/ML Researcher · Full-Stack Engineer",
  keywords: ["Vighnesh B", "Portfolio", "AWS", "Blockchain", "React", "Next.js", "AI", "ML"],
  openGraph: {
    title: "Vighnesh B — Portfolio",
    description: "AWS Solutions Architect · Blockchain Developer · AI/ML Researcher",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
