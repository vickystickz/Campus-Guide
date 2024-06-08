import type { Metadata } from "next";
import { work_sans, sora } from "@/app/font";
import "./globals.css";


export const metadata: Metadata = {
  title: "Campus Guide",
  description: "A platform that provides easy navigation within Univerisity Campus for students and visitors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${work_sans.variable} ${sora.variable}`}>{children}</body>
    </html>
  );
}
