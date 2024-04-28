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
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
export default function Header() {
  const { setTheme } = useTheme();
  console.log(setTheme);

  return (
    <div className="h-[100px] w-full  fixed z-10 top-0 bg-[#FEFCFD]  ">
      <div className="w-[70%] h-full mx-auto border-b flex items-center">
        <div className="w-[200px]">
          <a href="#home">
            <p className="text-3xl  text-gray-500">ADT</p>
          </a>
        </div>
        <div className="flex gap-8 flex-grow  justify-end items-center ">
          <a href="#skills">
            <p className="text-gray-600 tracking-wide cursor-pointer text-sm">
              Skills
            </p>
          </a>
          <p className="text-gray-600 tracking-wide cursor-pointer text-sm">
            Projects
          </p>
          <p className="text-gray-600 tracking-wide cursor-pointer text-sm">
            Contact
          </p>
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
