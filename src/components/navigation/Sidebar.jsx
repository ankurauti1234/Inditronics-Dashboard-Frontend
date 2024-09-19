"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BarChart2, Box, Activity, Users, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Box, label: "Assets Management", href: "/assets_management" },
  { icon: BarChart2, label: "Meter Management", href: "/meter_management" },
  { icon: Activity, label: "Live Monitoring", href: "/live_monitoring" },
  { icon: Users, label: "User Management", href: "/user_management" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      )}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            className={cn(
              "fixed left-0 top-0 h-screen mt-14 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 p-4 flex flex-col space-y-2 z-10",
              isMobile ? "w-full" : "w-16 hover:w-64"
            )}
            initial={isMobile ? { x: "-100%" } : { width: "4rem" }}
            animate={isMobile ? { x: 0 } : { width: isOpen ? "16rem" : "4rem" }}
            exit={isMobile ? { x: "-100%" } : { width: "4rem" }}
            onMouseEnter={() => !isMobile && setIsOpen(true)}
            onMouseLeave={() => !isMobile && setIsOpen(false)}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isMobile && (
              <div className="flex justify-end mb-4">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <X size={24} />
                </Button>
              </div>
            )}
            {sidebarItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center space-x-4 p-2 rounded-lg cursor-pointer",
                  "hover:bg-accent hover:bg-opacity-20 transition-colors duration-300"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, radius:500, rotate: 3 }}
              >
                <motion.div
                  className="w-8 h-8 flex items-center justify-center"
                  initial={false}
                  animate={{ rotate: isOpen ? 0 : 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon size={20} />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: isOpen || isMobile ? 1 : 0,
                    width: isOpen || isMobile ? "auto" : 0,
                    marginLeft: isOpen || isMobile ? "1rem" : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
