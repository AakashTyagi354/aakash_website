"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, Download, Terminal, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { label: "work",    hash: "projects" },
  { label: "skills",  hash: "skills"   },
  { label: "contact", hash: "contact"  },
];

export default function Header() {
  const { setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // If on home page — scroll to section directly
  // If on any other page (e.g. /projects/delma) — navigate to home with hash
  const handleNavClick = (hash: string) => {
    setMobileOpen(false);
    if (pathname === "/") {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${hash}`);
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-[72px] w-full fixed z-50 top-0
                   bg-background/80 backdrop-blur-md
                   border-b border-border/60"
      >
        <div className="max-w-[1100px] h-full mx-auto px-6
                        flex items-center justify-between">

          {/* Brand mark */}
          <button
            onClick={() => {
              setMobileOpen(false);
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                router.push("/");
              }
            }}
            className="flex items-center gap-2 group"
          >
            <Terminal
              size={16}
              className="text-[#78355b] group-hover:rotate-12
                         transition-transform duration-300"
            />
            <span className="font-mono-custom text-sm font-medium
                             tracking-widest text-foreground/80
                             group-hover:text-[#78355b] transition-colors">
              aakash.dev
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.hash}
                onClick={() => handleNavClick(link.hash)}
                className="font-mono-custom text-xs tracking-widest
                           text-muted-foreground hover:text-[#78355b]
                           transition-colors uppercase"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/Aakash_Tyagi.pdf"
              download="Aakash_Tyagi.pdf"
              className="flex items-center gap-1.5 font-mono-custom text-xs
                         tracking-wider text-muted-foreground
                         hover:text-[#78355b] transition-colors border
                         border-border/80 hover:border-[#78355b]/40
                         px-3 py-1.5 rounded-md"
            >
              <Download size={12} />
              resume
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon"
                        className="h-8 w-8 rounded-md hover:bg-muted">
                  <Sun className="h-3.5 w-3.5 rotate-0 scale-100
                                  transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0
                                   transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end"
                                   className="font-mono-custom text-xs">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  system
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile right side — theme + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon"
                        className="h-8 w-8 rounded-md hover:bg-muted">
                  <Sun className="h-3.5 w-3.5 rotate-0 scale-100
                                  transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0
                                   transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end"
                                   className="font-mono-custom text-xs">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  system
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X size={18} className="text-foreground" />
                : <Menu size={18} className="text-foreground" />
              }
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40
                       bg-background/95 backdrop-blur-md
                       border-b border-border/60 md:hidden"
          >
            <nav className="max-w-[1100px] mx-auto px-6 py-6
                            flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.hash}
                  onClick={() => handleNavClick(link.hash)}
                  className="font-mono-custom text-sm tracking-widest
                             uppercase text-muted-foreground
                             hover:text-[#78355b] transition-colors
                             py-3 border-b border-border/40
                             last:border-0 text-left w-full"
                >
                  {link.label}
                </button>
              ))}

              {/* Resume link in mobile menu */}
              <a
                href="/Aakash_Tyagi.pdf"
                download="Aakash_Tyagi.pdf"
                onClick={() => setMobileOpen(false)}
                className="font-mono-custom text-sm tracking-widest
                           uppercase text-[#78355b] py-3 flex
                           items-center gap-2 mt-1"
              >
                <Download size={13} />
                resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}