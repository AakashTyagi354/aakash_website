"use client";
import { useTheme } from "next-themes";
import { useState } from "react";
import { VscColorMode } from "react-icons/vsc";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HiDownload } from "react-icons/hi";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
export default function Header() {
  const { setTheme } = useTheme();
  console.log(setTheme);

  return (
    <div className="h-[100px] w-full  fixed z-10 top-0 bg-[#FEFCFD]  ">
      <div className="w-[70%] h-full mx-auto border-b flex items-center">
        <div className="w-[200px] hidden  md:flex items-center">
          <a href="/Aakash_Tyagi.pdf" download="Aakash_Tyagi.pdf">
            <p className="  text-gray-500 flex items-center gap-1">
              Download Resume
              <HiDownload size={18} />
            </p>
          </a>
        </div>
        <div className="flex gap-8 flex-grow  md:justify-end items-center   ">
          <a href="#skills">
            <p className="text-gray-600 tracking-wide cursor-pointer text-sm">
              Skills
            </p>
          </a>
          <a href="#projects">
            <p className="text-gray-600 tracking-wide cursor-pointer text-sm">
              Projects
            </p>
          </a>
          <a href="#contact">
            <p className="text-gray-600 tracking-wide cursor-pointer text-sm">
              Contact
            </p>
          </a>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  {/* <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                   */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
