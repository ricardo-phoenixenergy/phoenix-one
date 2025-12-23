import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phoenix EPC Dashboard",
  description: "Professional renewable energy project management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-stone-50`}>
        <div className="min-h-screen bg-gray-100">
          <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64">
              <Header />
              <main className="p-8">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}