"use client";

import { motion } from "framer-motion"; // Import Framer Motion
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming you have Card components
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/"); // Navigate to the home page
  };

  const handleGoBack = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }} // Initial state
        animate={{ opacity: 1, scale: 1 }} // Animate to this state
        exit={{ opacity: 0, scale: 0.5 }} // Exit state
        transition={{ duration: 0.5 }} // Transition duration
      >
        <img src="/404.svg" alt="404 Not Found" className="mb-4" /> 
        <div className="flex gap-4 justify-center min-w-[35vw]">
              <Button variant={"secondary"} onClick={handleGoBack} className="w-full">Go Back</Button>
              <Button onClick={handleGoHome}  className="w-full">Go to Home</Button>
            
            
            </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
