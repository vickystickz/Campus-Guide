import type { Metadata } from "next";
import { work_sans, sora } from "@/app/font";
import { Providers } from "@/lib/context/Providers";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

export const metadata: Metadata = {
  title: "Campus Guide",
  description:
    "A platform that provides easy navigation within Univerisity Campus for students and visitors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${work_sans.variable} ${sora.variable}`}>
        <Providers>
          <div className="h-screen min-w-screen">{children} </div>
        </Providers>
      </body>
    </html>
  );
}
