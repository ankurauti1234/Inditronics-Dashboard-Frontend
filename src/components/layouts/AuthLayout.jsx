import React from "react";
import { Heart } from "lucide-react";
import AuthTopbar from "../navigation/AuthTopbar";

export default function AuthLayout({ children }) {
  return (
    <main className="flex flex-col justify-between min-h-screen w-full">
      <AuthTopbar />
      <div className="h-full min-h-[87vh]">{children}</div>
      <footer className="w-full border-t bg-card p-2">
        <p className="flex items-center gap-1 text-sm mb-2 sm:mb-0">
          Made with <Heart size={14} className="text-red-500" /> by Ankur
        </p>
      </footer>
    </main>
  );
}
