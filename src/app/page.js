"use client";

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
} from "lucide-react";

export default function Home() {
  const features = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Get a comprehensive overview of your IoT ecosystem",
    },
    {
      href: "/assets_management",
      label: "Assets Management",
      icon: Box,
      description: "Efficiently manage and track all your IoT assets",
    },
    {
      href: "/meter_management",
      label: "Meter Management",
      icon: Gauge,
      description: "Monitor and control your smart meters with ease",
    },
    {
      href: "/live_monitoring",
      label: "Live Monitoring",
      icon: Activity,
      description: "Real-time monitoring of all your connected devices",
    },
    {
      href: "/user_management",
      label: "User Management",
      icon: Users,
      description: "Manage user access and permissions securely",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Zap className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">IoT Insight</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {feature.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to IoT Insight
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Empower your business with our comprehensive IoT management
                  platform. Monitor, analyze, and control your devices from a
                  single dashboard.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.href}>
                  <CardHeader>
                    <feature.icon className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>{feature.label}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline">
                      <Link href={feature.href}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
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
                  Protect your IoT ecosystem with our advanced security features
                  and protocols.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
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
                  "IoT Insight has revolutionized how we manage our smart
                  devices. The real-time monitoring and analytics have
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
                  "The user management and security features of IoT Insight give
                  us peace of mind. It's an indispensable tool for our growing
                  IoT infrastructure."
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your IoT Management?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of businesses already benefiting from our
                  comprehensive IoT platform.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2023 IoT Insight. All rights reserved.
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
    </div>
  );
}
