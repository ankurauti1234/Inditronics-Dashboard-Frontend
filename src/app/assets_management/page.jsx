'use client'
import MainLayout from "@/components/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import APMStatistics from "@/components/charts/APMStatistics";
import Records from "@/components/tabs/asset_management/Records";
import FileUploadAssets from "@/components/tabs/asset_management/FileUploadAssets";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Page = () => {
  const [activeStockTab, setActiveStockTab] = useState("records");
  const [activeMasterDataTab, setActiveMasterDataTab] = useState("meter");
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
      case "stockTracker":
        return (
          <Tabs defaultValue="records" className="w-full">
            <TabsList>
              <TabsTrigger
                value="records"
                onClick={() => setActiveStockTab("records")}
              >
                Records
              </TabsTrigger>
              <TabsTrigger
                value="plot"
                onClick={() => setActiveStockTab("plot")}
              >
                Plot
              </TabsTrigger>
              <TabsTrigger
                value="retrievalRequest"
                onClick={() => setActiveStockTab("retrievalRequest")}
              >
                Retrieval Request
              </TabsTrigger>
            </TabsList>
            <TabsContent value="records">
              <Records/>
            </TabsContent>
            <TabsContent value="plot">Stock Tracker - Plot Content</TabsContent>
            <TabsContent value="retrievalRequest">
              Stock Tracker - Retrieval Request Content
            </TabsContent>
          </Tabs>
        );
      case "masterData":
        return (
          <Tabs defaultValue="meter" className="w-full">
            <TabsList>
              <TabsTrigger
                value="meter"
                onClick={() => setActiveMasterDataTab("meter")}
              >
                Meter
              </TabsTrigger>
              <TabsTrigger
                value="remote"
                onClick={() => setActiveMasterDataTab("remote")}
              >
                Remote
              </TabsTrigger>
            </TabsList>
            <TabsContent value="meter">Master Data - Meter Content</TabsContent>
            <TabsContent value="remote">
              Master Data - Remote Content
            </TabsContent>
          </Tabs>
        );
      case "fieldActivityLedger":
        return <div>Field Activity Ledger Content</div>;
      case "testArchive":
        return <div>Test Archive Content</div>;
      case "conflictsHarmonizer":
        return <div>Conflicts Harmonizer Content</div>;
      case "fileUploadAssets":
        return <FileUploadAssets/>;
      case "hhInfoHistory":
        return <div>HH Info History Content</div>;
      case "hhFieldStatus":
        return <div>HH Field Status Content</div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Assets Management</h1>
        <Tabs defaultValue="stockTracker" className="w-full">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="stockTracker">Stock Tracker</TabsTrigger>
            <TabsTrigger value="masterData">Master Data</TabsTrigger>
            <TabsTrigger value="fieldActivityLedger">
              Field Activity Ledger
            </TabsTrigger>
            <TabsTrigger value="testArchive">Test Archive</TabsTrigger>
            <TabsTrigger value="conflictsHarmonizer">
              Conflicts Harmonizer
            </TabsTrigger>
            <TabsTrigger value="fileUploadAssets">
              File Upload Assets
            </TabsTrigger>
            <TabsTrigger value="hhInfoHistory">HH Info History</TabsTrigger>
            <TabsTrigger value="hhFieldStatus">HH Field Status</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            {[
              "stockTracker",
              "masterData",
              "fieldActivityLedger",
              "testArchive",
              "conflictsHarmonizer",
              "fileUploadAssets",
              "hhInfoHistory",
              "hhFieldStatus",
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

export default Page;
