import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

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
      <body className={`${inter.className} h-[3000px] relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute inset-0  ">
            <div className="bg-[#FEF0F5] opacity-60 blur-3xl   fixed top-[80px] right-0     h-[300px] w-[600px] rounded-full  z-0"></div>
            <div className="bg-[#FEF0F5] opacity-40 blur-3xl   fixed top-[100px] left-0     h-[300px] w-[600px] rounded-full  z-0"></div>
            <div className="bg-[#eaf2e8] opacity-40  blur-3xl  fixed top-[500px] right-0     h-[300px] w-[600px] rounded-full  z-0"></div>

            <p className="fixed left-[-40px] top-[620px] font-medium text-[160px]   text-gray-300 opacity-25 ">
              Aakash.
            </p>
          </div>
          <div className="relative z-10">
            <Header />
            <main >{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
