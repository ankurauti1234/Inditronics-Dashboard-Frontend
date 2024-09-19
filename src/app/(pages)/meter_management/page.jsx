"use client";

import MainLayout from "@/components/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventStreamRecords from "@/components/tabs/meter_management/EventStreamRecords";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

const MeterManagementPage = () => {
  const [activeEventsStreamTab, setActiveEventsStreamTab] = useState("records");
  const [activeConfigUpdateTab, setActiveConfigUpdateTab] =
    useState("viewUpdate");
  const [activeMeterReleaseTab, setActiveMeterReleaseTab] = useState("search");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className={cn(
            "w-16 h-16 border-4 border-dashed rounded-full animate-spin",
            "border-gray-400 border-t-transparent"
          )}
        ></div>
      </div>
    );
  }

  const renderTabContent = (tab) => {
    switch (tab) {
      case "eventsStream":
        return (
          <Tabs defaultValue="records" className="w-full">
            <TabsList className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 bg-transparent border">
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="records"
                onClick={() => setActiveEventsStreamTab("records")}
              >
                Records
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="plot"
                onClick={() => setActiveEventsStreamTab("plot")}
              >
                Plot
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="retrievalRequest"
                onClick={() => setActiveEventsStreamTab("retrievalRequest")}
              >
                Retrieval Request
              </TabsTrigger>
            </TabsList>

            <div key={activeEventsStreamTab} className="opacity-100 scale-1">
              {" "}
              {/* Removed motion */}
              <TabsContent value="records">
                <EventStreamRecords />
              </TabsContent>
              <TabsContent value="plot">
                Events Stream - Plot Content
              </TabsContent>
              <TabsContent value="retrievalRequest">
                Events Stream - Retrieval Request Content
              </TabsContent>
            </div>
          </Tabs>
        );
      case "alarms":
        return <div>Alarms Content</div>;
      case "configUpdate":
        return (
          <Tabs defaultValue="viewUpdate" className="w-full">
            <TabsList className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 bg-transparent border">
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="viewUpdate"
                onClick={() => setActiveConfigUpdateTab("viewUpdate")}
              >
                View & Update
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="history"
                onClick={() => setActiveConfigUpdateTab("history")}
              >
                History
              </TabsTrigger>
            </TabsList>

            <div key={activeConfigUpdateTab} className="opacity-100 scale-1">
              {" "}
              {/* Removed motion */}
              <TabsContent value="viewUpdate">
                Config & Update - View & Update Content
              </TabsContent>
              <TabsContent value="history">
                Config & Update - History Content
              </TabsContent>
            </div>
          </Tabs>
        );
      case "meterReleaseManagement":
        return (
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 bg-transparent border">
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="search"
                onClick={() => setActiveMeterReleaseTab("search")}
              >
                Search
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="history"
                onClick={() => setActiveMeterReleaseTab("history")}
              >
                History
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="submitJob"
                onClick={() => setActiveMeterReleaseTab("submitJob")}
              >
                Submit Job
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="viewJob"
                onClick={() => setActiveMeterReleaseTab("viewJob")}
              >
                View Job
              </TabsTrigger>
            </TabsList>

            <div key={activeMeterReleaseTab} className="opacity-100 scale-1">
              {" "}
              {/* Removed motion */}
              <TabsContent value="search">
                Meter Release Management - Search Content
              </TabsContent>
              <TabsContent value="history">
                Meter Release Management - History Content
              </TabsContent>
              <TabsContent value="submitJob">
                Meter Release Management - Submit Job Content
              </TabsContent>
              <TabsContent value="viewJob">
                Meter Release Management - View Job Content
              </TabsContent>
            </div>
          </Tabs>
        );
      case "meterInsightPanel":
        return <div>Meter Insight Panel Content</div>;
      case "installationArchive":
        return <div>Installation Archive Content</div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Meter Management</h1>
        <Tabs defaultValue="eventsStream" className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex min-w-full bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 bg-transparent border">
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="eventsStream"
              >
                Events Stream
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="alarms"
              >
                Alarms
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="configUpdate"
              >
                Config & Update
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="meterReleaseManagement"
              >
                Meter Release Management
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="meterInsightPanel"
              >
                Meter Insight Panel
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="installationArchive"
              >
                Installation Archive
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="mt-6">
            {[
              "eventsStream",
              "alarms",
              "configUpdate",
              "meterReleaseManagement",
              "meterInsightPanel",
              "installationArchive",
            ].map((tab) => (
              <TabsContent
                key={tab}
                value={tab}
                className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 border p-2 rounded-lg"
              >
                <div key={tab} className="opacity-100 scale-1">
                  {" "}
                  {/* Removed motion */}
                  {renderTabContent(tab)}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MeterManagementPage;
