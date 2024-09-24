"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Cookies from "js-cookie";
import AuthLayout from "@/components/layouts/AuthLayout";

function LoginPage() {
  const [emailOrname, setEmailOrname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://apmapis.webdevava.live/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailOrname, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.message === "Please verify your email before logging in") {
          router.push(`/verify-email?email=${encodeURIComponent(emailOrname)}`);
        } else {
          Cookies.set("token", data.token);
          Cookies.set("name", data.name);
          Cookies.set("role", data.role);
          Cookies.set("email", data.email);
          Cookies.set("expiry", data.expiry);

          router.push("/dashboard");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center h-[87vh]">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="emailOrname">Email or name</Label>
                  <Input
                    id="emailOrname"
                    placeholder="Enter your email or name"
                    value={emailOrname}
                    onChange={(e) => setEmailOrname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Login"
              )}
            </Button>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
              </span>
              <Link
                href="/register"
                className="text-sm text-blue-600 hover:underline"
              >
                Register here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
