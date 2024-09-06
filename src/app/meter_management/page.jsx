"use client";

import MainLayout from "@/components/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventStreamRecords from "@/components/tabs/meter_management/EventStreamRecords";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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

  const renderTabContent = (tab) => {
    switch (tab) {
      case "eventsStream":
        return (
          <Tabs defaultValue="records" className="w-full">
            <TabsList>
              <TabsTrigger
                value="records"
                onClick={() => setActiveEventsStreamTab("records")}
              >
                Records
              </TabsTrigger>
              <TabsTrigger
                value="plot"
                onClick={() => setActiveEventsStreamTab("plot")}
              >
                Plot
              </TabsTrigger>
              <TabsTrigger
                value="retrievalRequest"
                onClick={() => setActiveEventsStreamTab("retrievalRequest")}
              >
                Retrieval Request
              </TabsTrigger>
            </TabsList>
            <TabsContent value="records">
              <EventStreamRecords />
            </TabsContent>
            <TabsContent value="plot">Events Stream - Plot Content</TabsContent>
            <TabsContent value="retrievalRequest">
              Events Stream - Retrieval Request Content
            </TabsContent>
          </Tabs>
        );
      case "alarms":
        return <div>Alarms Content</div>;
      case "configUpdate":
        return (
          <Tabs defaultValue="viewUpdate" className="w-full">
            <TabsList>
              <TabsTrigger
                value="viewUpdate"
                onClick={() => setActiveConfigUpdateTab("viewUpdate")}
              >
                View & Update
              </TabsTrigger>
              <TabsTrigger
                value="history"
                onClick={() => setActiveConfigUpdateTab("history")}
              >
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="viewUpdate">
              Config & Update - View & Update Content
            </TabsContent>
            <TabsContent value="history">
              Config & Update - History Content
            </TabsContent>
          </Tabs>
        );
      case "meterReleaseManagement":
        return (
          <Tabs defaultValue="search" className="w-full">
            <TabsList>
              <TabsTrigger
                value="search"
                onClick={() => setActiveMeterReleaseTab("search")}
              >
                Search
              </TabsTrigger>
              <TabsTrigger
                value="history"
                onClick={() => setActiveMeterReleaseTab("history")}
              >
                History
              </TabsTrigger>
              <TabsTrigger
                value="submitJob"
                onClick={() => setActiveMeterReleaseTab("submitJob")}
              >
                Submit Job
              </TabsTrigger>
              <TabsTrigger
                value="viewJob"
                onClick={() => setActiveMeterReleaseTab("viewJob")}
              >
                View Job
              </TabsTrigger>
            </TabsList>
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
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Meter Management</h1>
        <Tabs defaultValue="eventsStream" className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2">
            <TabsTrigger value="eventsStream">Events Stream</TabsTrigger>
            <TabsTrigger value="alarms">
              Alarms
            </TabsTrigger>
            <TabsTrigger value="configUpdate">Config & Update</TabsTrigger>
            <TabsTrigger value="meterReleaseManagement">
              Meter Release Management
            </TabsTrigger>
            <TabsTrigger value="meterInsightPanel">
              Meter Insight Panel
            </TabsTrigger>
            <TabsTrigger value="installationArchive">
              Installation Archive
            </TabsTrigger>
          </TabsList>
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
                className="bg-secondary p-2 rounded-lg"
              >
                {renderTabContent(tab)}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MeterManagementPage;
