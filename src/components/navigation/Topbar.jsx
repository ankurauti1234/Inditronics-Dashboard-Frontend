"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Package2, Sun, Moon, Zap } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Cookies from "js-cookie";
import logo from '../../../public/inditronics-logo.svg'
import Image from "next/image";

const Topbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.toggle("dark", savedTheme === "dark");

    // Retrieve name from cookies
    const storedName = Cookies.get("name");
    if (storedName) {
      setName(storedName);
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

  const getInitials = (name) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <header className="sticky top-0 flex justify-between px-4 lg:px-6 h-14 items-center  w-full bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 border-b p-2 z-10">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link className="flex items-center justify-center" href="/">
          <Image src={ logo } alt="inditronincs logo" height={20} width={40} />
          <span className="ml-2 text-lg font-bold">Inditronics</span>
        </Link>
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isMobile={true}
              />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button
          variant="outline"
          className="size-8 flex items-center justify-center rounded-lg"
          onClick={toggleTheme}
        >
          <span className="flex items-center justify-center">
            {theme === "light" ? (
              <Moon className="h-4 w-4 transition-transform duration-200 ease-in-out" />
            ) : (
              <Sun className="h-4 w-4 transition-transform duration-200 ease-in-out" />
            )}
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="flex h-8 w-full gap-2 p-2 rounded-lg"
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback>{getInitials(name || "User")}</AvatarFallback>
              </Avatar>
              <p>{name || "User"}</p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-10">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.push("/settings");
              }}
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push("/support");
              }}
            >
              Support
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("name");
                Cookies.remove("role");
                Cookies.remove("email");
                router.push("/login");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;
