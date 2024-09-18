"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CircleUser, Menu, Package2, Sun, Moon, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Cookies from "js-cookie";
import Image from "next/image";
import logo from "../../../public/inditronics-logo.svg";

const AuthTopbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.toggle("dark", savedTheme === "dark");

    // Retrieve username from cookies
    const storedUsername = Cookies.get("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark");
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/assets_management", label: "Assets Management" },
    { href: "/meter_management", label: "Meter Management" },
    { href: "/live_monitoring", label: "Live Monitoring" },
    { href: "/user_management", label: "User Management" },
  ];

  const NavLink = ({ href, label, isMobile = false }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`${
          isActive
            ? "text-primary font-semibold"
            : "text-muted-foreground hover:text-foreground"
        } transition-colors ${isMobile ? "text-lg" : "text-sm"}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky z-10 top-0 px-4 lg:px-6 h-14 flex justify-between items-center w-full bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 border-b p-2">
      <Link className="flex items-center justify-center" href="/">
        <Image src={logo} alt="inditronincs logo" height={20} width={40} />
        <span className="ml-2 text-lg font-bold">Inditronics</span>
      </Link>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button
          variant="outline"
          className=" size-8 flex items-center justify-center rounded-lg"
          onClick={toggleTheme}
        >
          <span className="flex items-center justify-center">
            {theme === "light" ? (
              <Moon className=" h-4 w-4 transition-transform duration-200 ease-in-out" />
            ) : (
              <Sun className=" h-4 w-4 transition-transform duration-200 ease-in-out" />
            )}
          </span>
        </Button>
      </div>
    </header>
  );
};

export default AuthTopbar;
