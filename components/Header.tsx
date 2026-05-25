"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, Download, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { label: "work",    href: "#projects" },
  { label: "skills",  href: "#skills"   },
  { label: "contact", href: "#contact"  },
];

export default function Header() {
  const { setTheme } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[72px] w-full fixed z-50 top-0
                 bg-background/80 backdrop-blur-md
                 border-b border-border/60"
    >
      <div className="max-w-[1100px] h-full mx-auto px-6 flex items-center justify-between">

        {/* Brand mark */}
        <a href="#home" className="flex items-center gap-2 group">
          <Terminal
            size={16}
            className="text-[#78355b] group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="font-mono-custom text-sm font-medium tracking-widest
                           text-foreground/80 group-hover:text-[#78355b] transition-colors">
            aakash.dev
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono-custom text-xs tracking-widest
                         text-muted-foreground hover:text-[#78355b]
                         transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="/Aakash_Tyagi.pdf"
            download="Aakash_Tyagi.pdf"
            className="hidden md:flex items-center gap-1.5
                       font-mono-custom text-xs tracking-wider
                       text-muted-foreground hover:text-[#78355b]
                       transition-colors border border-border/80
                       hover:border-[#78355b]/40 px-3 py-1.5 rounded-md"
          >
            <Download size={12} />
            resume
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon"
                      className="h-8 w-8 rounded-md hover:bg-muted">
                <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-mono-custom text-xs">
              <DropdownMenuItem onClick={() => setTheme("light")}>light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>system</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </motion.header>
  );
}