import { Metadata } from "next";
import "./globals.css";
import AdSafeArea from "@/components/AdSafeArea";

export const metadata: Metadata = {
  metadataBase: new URL("https://converter-murex.vercel.app"),
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
