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
    <header className="sticky top-0 flex w-full justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10">
      <Link className="flex items-center justify-center" href="/">
        <Zap className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold">IoT Insight</span>
      </Link>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button
          variant="ghost"
          className=" size-8 flex items-center justify-center rounded-full"
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
