'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MainLayout from "@/components/layouts/MainLayout";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ArrowLeft } from "lucide-react";

function SupportPage() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, [router]);

    const handleGoBack = () => {
      router.back();
    };

    return (
      <MainLayout>
        <div className="container mx-auto py-10">
        <div className="flex items- flex-col gap-4 mb-6">
          <Button variant="secondary" onClick={handleGoBack} className="mr-4 w-fit">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold mb-6">Support Center</h1>
        </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find quick answers to common questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How do I reset my password?
                  </AccordionTrigger>
                  <AccordionContent>
                    To reset your password, click on the "Forgot Password" link
                    on the login page. Follow the instructions sent to your
                    email to create a new password.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I change my username?</AccordionTrigger>
                  <AccordionContent>
                    Unfortunately, usernames cannot be changed once an account
                    is created. However, you can update your display name in
                    your account settings.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How do I cancel my subscription?
                  </AccordionTrigger>
                  <AccordionContent>
                    To cancel your subscription, go to your account settings and
                    navigate to the "Subscription" tab. Click on "Cancel
                    Subscription" and follow the prompts.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Send us a message.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide details about your issue or question"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Submit Request</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>
                Explore our knowledge base and community forums.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  Knowledge Base
                </Button>
                <Button variant="outline" className="w-full">
                  Community Forums
                </Button>
                <Button variant="outline" className="w-full">
                  Video Tutorials
                </Button>
                <Button variant="outline" className="w-full">
                  System Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
}

export default  SupportPage