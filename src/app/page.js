"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  LayoutDashboard,
  Box,
  Gauge,
  Activity,
  Users,
  BarChart3,
  Zap,
  Shield,
  Moon,
  Sun,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import AuthLayout from "@/components/layouts/AuthLayout";
import { motion } from "framer-motion"; // Import Framer Motion
import { useEffect } from "react";

export default function Home() {
  const features = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Get a comprehensive overview of your IoT ecosystem",
      extraDesc:
        "Our Dashboard provides a centralized view of all your IoT devices, their status, and key performance indicators. It offers customizable widgets, real-time alerts, and trend analysis to help you make informed decisions quickly.",
    },
    {
      href: "/assets_management",
      label: "Assets Management",
      icon: Box,
      description: "Efficiently manage and track all your IoT assets",
      extraDesc:
        "The Assets Management feature allows you to maintain a detailed inventory of all your IoT devices. You can track device locations, monitor lifecycle stages, schedule maintenance, and generate comprehensive reports on asset utilization and performance.",
    },
    {
      href: "/meter_management",
      label: "Meter Management",
      icon: Gauge,
      description: "Monitor and control your smart meters with ease",
      extraDesc:
        "Our Meter Management system enables you to remotely monitor and control smart meters. It supports automated meter reading, consumption analysis, billing integration, and anomaly detection to optimize energy management and reduce operational costs.",
    },
    {
      href: "/live_monitoring",
      label: "Live Monitoring",
      icon: Activity,
      description: "Real-time monitoring of all your connected devices",
      extraDesc:
        "The Live Monitoring feature provides real-time data streams from all your connected devices. It offers customizable dashboards, instant notifications for critical events, and the ability to set up complex monitoring rules to ensure optimal performance of your IoT network.",
    },
    {
      href: "/user_management",
      label: "User Management",
      icon: Users,
      description: "Manage user access and permissions securely",
      extraDesc:
        "Our User Management system allows you to control access to your IoT platform with granular permissions. You can create user roles, implement multi-factor authentication, track user activities, and ensure compliance with data protection regulations.",
    },
  ];

  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault(); // Prevent default scroll behavior
      const sections = document.querySelectorAll("section"); // Select all sections
      const currentSection = Math.round(window.scrollY / window.innerHeight); // Determine the current section index
      const nextSection =
        e.deltaY > 0 ? currentSection + 1 : currentSection - 1; // Determine the next section index

      if (nextSection >= 0 && nextSection < sections.length) {
        sections[nextSection].scrollIntoView({ behavior: "smooth" }); // Scroll to the next section
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false }); // Add wheel event listener

    return () => {
      window.removeEventListener("wheel", handleWheel); // Cleanup the event listener
    };
  }, []);

  return (
    <AuthLayout>
      <div className="flex flex-col min-h-screen overflow-hidden">
        {" "}
        {/* Added overflow-hidden */}
        <main className="flex-1">
          {/* Hero Section */}
          <motion.section
            className="w-full h-screen flex items-center py-12 md:py-24 lg:py-32 xl:py-48"
            initial={{ opacity: 0 }} // Initial opacity
            animate={{ opacity: 1 }} // Animate to full opacity
            exit={{ opacity: 0 }} // Exit animation
            transition={{ duration: 0.5 }} // Transition duration
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Welcome to Inditronics Dashboard
                  </h1>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Empower your business with our comprehensive IoT management
                    platform. Monitor, analyze, and control your devices from a
                    single dashboard.
                  </p>
                </div>
                <Button asChild size="lg">
                  <Link href="/login">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            className="w-full h-screen flex items-center py-12 md:py-24 lg:py-32 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 border bg-muted/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Powerful Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <HoverCard key={feature.href}>
                    <HoverCardTrigger asChild>
                      <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg">
                        <CardHeader>
                          <feature.icon className="h-8 w-8 mb-2 text-primary" />
                          <CardTitle>{feature.label}</CardTitle>
                          <CardDescription>
                            {feature.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <h3 className="font-semibold mb-2">{feature.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.extraDesc}
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Key Benefits Section */}
          <motion.section
            className="w-full h-screen flex items-center py-12 md:py-24 lg:py-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Key Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <BarChart3 className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                  <p className="text-muted-foreground">
                    Gain valuable insights from your IoT data with our powerful
                    analytics tools.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Zap className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Energy Efficiency</h3>
                  <p className="text-muted-foreground">
                    Optimize energy consumption and reduce costs with smart
                    monitoring and control.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Enhanced Security</h3>
                  <p className="text-muted-foreground">
                    Protect your IoT ecosystem with our advanced security
                    features and protocols.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <motion.section
            className="w-full h-screen flex items-center py-12 md:py-24 lg:py-32 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 border bg-muted/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                What Our Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="@johndoe"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>John Doe</CardTitle>
                        <CardDescription>CTO, TechCorp</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    "Inditronics Dashboard has revolutionized how we manage our
                    smart devices. The real-time monitoring and analytics have
                    significantly improved our operational efficiency."
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="@janesmith"
                        />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>Jane Smith</CardTitle>
                        <CardDescription>
                          Operations Manager, EnergyX
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    "The user management and security features of Inditronics
                    Dashboard give us peace of mind. It's an indispensable tool
                    for our growing IoT infrastructure."
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.section>

          {/* Contact Form Section */}
          <motion.section
            className="w-full h-screen flex items-center py-12 md:py-24 lg:py-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-8 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Transform Your IoT Management?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Join hundreds of businesses already benefiting from our
                    platform.
                  </p>
                </div>
                <form className="flex flex-col space-y-4 w-full lg:max-w-3xl border rounded-lg bg-card p-2">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="p-2 border rounded"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="p-2 border rounded"
                    required
                  />
                  <Textarea
                    placeholder="Your Message"
                    className="p-2 border rounded"
                    rows="4"
                    required
                  ></Textarea>
                  <Button type="submit" size="lg">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </AuthLayout>
  );
}
