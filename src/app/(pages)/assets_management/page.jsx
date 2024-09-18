"use client";
import MainLayout from "@/components/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploadAssets from "@/components/tabs/asset_management/FileUploadAssets";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

import Meter from "@/components/tabs/asset_management/stock_tracker/Meter";
import Remote from "@/components/tabs/asset_management/stock_tracker/Remote";
import Summary from "@/components/tabs/asset_management/stock_tracker/Summary";

import MasterData_Meter from "@/components/tabs/asset_management/master_data/MasterData_Meter";
import MasterData_Remote from "@/components/tabs/asset_management/master_data/MasterData_Remote";


const Page = () => {
  const [activeStockTab, setActiveStockTab] = useState("meter");
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
          <Tabs defaultValue="meter" className="w-full ">
            <TabsList className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 bg-transparent border">
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="meter"
                onClick={() => setActiveStockTab("meter")}
              >
                Meter
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="plot"
                onClick={() => setActiveStockTab("plot")}
              >
                Remote
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="retrievalRequest"
                onClick={() => setActiveStockTab("retrievalRequest")}
              >
                Summary
              </TabsTrigger>
            </TabsList>
            <TabsContent value="meter">
              <Meter />
            </TabsContent>
            <TabsContent value="plot">
              <Remote />
            </TabsContent>
            <TabsContent value="retrievalRequest">
              <Summary />
            </TabsContent>
          </Tabs>
        );
      case "masterData":
        return (
          <Tabs defaultValue="meter" className="w-full">
            <TabsList className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 bg-transparent border">
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="meter"
                onClick={() => setActiveMasterDataTab("meter")}
              >
                Meter
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary"
                value="remote"
                onClick={() => setActiveMasterDataTab("remote")}
              >
                Remote
              </TabsTrigger>
            </TabsList>
            <TabsContent value="meter">
              <MasterData_Meter />
            </TabsContent>
            <TabsContent value="remote">
              <MasterData_Remote />
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
        return <FileUploadAssets />;
      case "hhInfoHistory":
        return <div>HH Info History Content</div>;
      case "hhFieldStatus":
        return <div>HH Field Status Content</div>;
      default:
        return <div>Select a tab</div>;
    }
  };

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

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Assets Management</h1>
        <Tabs defaultValue="stockTracker" className="w-full">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 bg-transparent border">
            <TabsTrigger
              className="data-[state=active]:text-primary"
              value="stockTracker"
            >
              Stock Tracker
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-primary"
              value="masterData"
            >
              Master Data
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-primary"
              value="fieldActivityLedger"
            >
              Field Activity Ledger
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-primary"
              value="testArchive"
            >
              Test Archive
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-primary"
              value="conflictsHarmonizer"
            >
              Conflicts Harmonizer
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-primary"
              value="fileUploadAssets"
            >
              File Upload Assets
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-primary"
              value="hhInfoHistory"
            >
              HH Info History
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-primary"
              value="hhFieldStatus"
            >
              HH Field Status
            </TabsTrigger>
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
                className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 border p-2 rounded-lg"
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


