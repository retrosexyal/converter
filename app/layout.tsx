import "./globals.css";
import PropellerInPagePush from "@/components/PropellerInPagePush";
import AdSafeArea from "@/components/AdSafeArea";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>
        <div className="min-h-dvh flex flex-col">{children}</div>
        <AdSafeArea />
        <PropellerInPagePush />
      </body>
    </html>
  );
}
