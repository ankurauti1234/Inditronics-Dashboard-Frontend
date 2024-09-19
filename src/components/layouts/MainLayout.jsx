import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Topbar from "../navigation/Topbar";
import Link from "next/link";
import Cookies from "js-cookie";
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
} from "@/components/ui/alert-dialog";
import { Toaster } from "sonner";

export default function MainLayout({ children }) {
  const [tokenExpired, setTokenExpired] = useState(false);
  const [isContainerEnabled, setIsContainerEnabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = Cookies.get("token");
      const expiry = Cookies.get("expiry");
      if (token && expiry && Date.now() > Number(expiry)) {
        setTokenExpired(true);
        Cookies.remove("token");
        Cookies.remove("name");
        Cookies.remove("role");
        Cookies.remove("expiry");
        Cookies.remove("email");
      }
    };

    const getContainerState = () => {
      if (typeof localStorage !== "undefined") {
        const containerState = localStorage.getItem("containerEnabled");
        setIsContainerEnabled(
          containerState === null ? true : JSON.parse(containerState)
        );
      }
    };

    checkTokenExpiry();
    getContainerState();
  }, []);

  useEffect(() => {
    const handleContainerToggle = (event) => {
      setIsContainerEnabled(event.detail);
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("containerEnabled", JSON.stringify(event.detail));
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("toggleContainer", handleContainerToggle);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("toggleContainer", handleContainerToggle);
      }
    };
  }, []);

  const handleLoginRedirect = () => {
    setTokenExpired(false);
    router.push("/login");
  };

  return (
    <main className="flex flex-col justify-between min-h-screen w-full">
      <Topbar />
      <div
        className={`h-full min-h-[87vh] p-6  ${
          isContainerEnabled ? "container " : ""
        }`}
      >
        {children}
      </div>
      <Toaster />
      <AlertDialog open={tokenExpired} onOpenChange={setTokenExpired}>
        <AlertDialogTrigger>
          <div />
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
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </main>
  );
}
