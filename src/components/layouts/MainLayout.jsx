'use client'

import React, { useEffect, useState } from 'react'; // Added useEffect and useState
import Topbar from '../navigation/Topbar';
import Link from 'next/link';
import Cookies from 'js-cookie'; 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Import AlertDialog components
import { Toaster } from 'sonner';

export default function MainLayout({ children }) {
    const [tokenExpired, setTokenExpired] = useState(false); // State to manage token expiry alert

    useEffect(() => {
        const token = Cookies.get("token");
        const expiry = Cookies.get("expiry"); // Get expiry time from cookies
        if (token && expiry && Date.now() > expiry) {
            setTokenExpired(true); // Set token expired state
            Cookies.remove("token");
            Cookies.remove("name");
            Cookies.remove("role");
            Cookies.remove("expiry");
            Cookies.remove("email");
        }
    }, []);

    const handleLoginRedirect = () => {

        setTokenExpired(false); // Close alert
        window.location.href = "/login"; // Redirect to login
    };

    return (
      <main className="flex flex-col justify-between min-h-screen w-full">
        <Topbar />
        <div className="h-full min-h-[87vh]">{children}</div>
        <Toaster />
        <AlertDialog open={tokenExpired} onOpenChange={setTokenExpired}>
          {" "}
          {/* Use AlertDialog for token expired */}
          <AlertDialogTrigger>
            <div /> {/* Empty div to trigger dialog */}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Token Expired</AlertDialogTitle>
              <AlertDialogDescription>
                Your session has expired. Please log in again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleLoginRedirect}>
                Login Again
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <footer className="flex flex-col gap-2 sm:flex-row py-2 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-muted-foreground">
            © 2024 Inditronics PVT LTD. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </main>
    );
};


