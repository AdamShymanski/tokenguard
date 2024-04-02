import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tokenguard - Growth Index",
  description: "Adam Szymański",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-b from-10% from-green-100 via-30% via-slate-50 to-90% to-slate-100 flex flex-col items-center ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
