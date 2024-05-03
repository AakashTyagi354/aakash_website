import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aakash Tyagi",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-[4500px] md:h-[2000px] relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute inset-0  ">
            <div className="bg-[#FEF0F5] dark:bg-[#15121E]  opacity-60 blur-3xl   fixed top-[80px] right-0     h-[300px] w-[600px] rounded-full  z-0"></div>
            <div className="bg-[#FEF0F5] dark:bg-[#091B23] opacity-60 blur-3xl   fixed top-[100px] left-0     h-[300px] w-[600px] rounded-full  z-0"></div>
            <div className="bg-[#eaf2e8] dark:bg-[#091B23] opacity-60  blur-3xl  fixed top-[500px] right-0     h-[300px] w-[600px] rounded-full  z-0"></div>

            <p className="fixed left-[-40px] top-[620px] font-medium text-[160px]   text-gray-300 opacity-25 dark:text-[#0C1B21] ">
              Aakash.
            </p>
          </div>
          <div className="relative z-10">
            <Header />
            <main>{children}</main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
