import { Metadata } from "next";
import "./globals.css";
import AdSafeArea from "@/components/AdSafeArea";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>
        <div className="min-h-dvh flex flex-col">{children}</div>
        <AdSafeArea />
      </body>
    </html>
  );
}
