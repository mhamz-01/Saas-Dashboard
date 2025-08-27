import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/ui/layoutwrapper"; // <-- client wrapper
import { Red_Hat_Display } from "next/font/google";
import { AuthProvider } from "../../lib/AuthProvider";

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-red-hat",
});

export const metadata = {
  title: "Devworks-Saas-Dashboard",
  description: "Powered by devworks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${redHat.variable} font-sans`}>
        <AuthProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
