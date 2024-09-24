"use client";
import MainLayout from "@/components/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploadAssets from "@/components/tabs/asset_management/FileUploadAssets";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

import dynamic from "next/dynamic";

const Meter = dynamic(() =>
  import("@/components/tabs/asset_management/stock_tracker/Meter")
);
const Remote = dynamic(() =>
  import("@/components/tabs/asset_management/stock_tracker/Remote")
);
const Summary = dynamic(() =>
  import("@/components/tabs/asset_management/stock_tracker/Summary")
);

const MasterData_Meter = dynamic(() =>
  import("@/components/tabs/asset_management/master_data/MasterData_Meter")
);
const MasterData_Remote = dynamic(() =>
  import("@/components/tabs/asset_management/master_data/MasterData_Remote")
);
const FieldActivity_Meter = dynamic(() =>
  import(
    "@/components/tabs/asset_management/field_ativity_ledger/FieldActivity_Meter"
  )
);
const TestArchive = dynamic(() =>
  import("@/components/tabs/asset_management/TestArchive")
);
const ConflictHarmonizer = dynamic(() =>
  import("@/components/tabs/asset_management/ConflictHarmonizer")
);
const HHInfoHistory = dynamic(() =>
  import("@/components/tabs/asset_management/HHInfoHistory")
);
const HHFieldStatus = dynamic(() =>
  import("@/components/tabs/asset_management/HHFieldStatus")
);
const InstallationComponent = dynamic(() =>
  import("@/components/tabs/asset_management/install_asset/Installation")
);
const ReplacementComponent = dynamic(() =>
  import("@/components/tabs/asset_management/install_asset/Replacement")
);
const UninstallationComponent = dynamic(() =>
  import("@/components/tabs/asset_management/install_asset/Unistallation")
);
const InProgressInstallationComponent = dynamic(() =>
  import("@/components/tabs/asset_management/install_asset/InProgress")
);
const FailedInstallationComponent = dynamic(() =>
  import("@/components/tabs/asset_management/install_asset/FailedInstallation")
);


const Page = () => {
  const [activeStockTab, setActiveStockTab] = useState("meter");
  const [activeMasterDataTab, setActiveMasterDataTab] = useState("meter");
  const [activeInstallAssetsTab, setActiveInstallAssetsTab] = useState("install");
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
                Device
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
                Device
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
        return <FieldActivity_Meter />;
      case "testArchive":
        return <TestArchive />;
      case "conflictsHarmonizer":
        return <ConflictHarmonizer/>;
      case "fileUploadAssets":
        return <FileUploadAssets />;
      case "hhInfoHistory":
        return <HHInfoHistory/>;
      case "hhFieldStatus":
        return <HHFieldStatus/>;
      case "installAssets":
                return (
                  <Tabs defaultValue="install" className="w-full">
                    <TabsList className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 bg-transparent border">
                      <TabsTrigger
                        className="data-[state=active]:text-primary"
                        value="install"
                        onClick={() => setActiveInstallAssetsTab("install")}
                      >
                        Installation
                      </TabsTrigger>
                      <TabsTrigger
                        className="data-[state=active]:text-primary"
                        value="replace"
                        onClick={() => setActiveInstallAssetsTab("replace")}
                      >
                        Replacement
                      </TabsTrigger>
                      <TabsTrigger
                        className="data-[state=active]:text-primary"
                        value="uninstall"
                        onClick={() => setActiveInstallAssetsTab("uninstall")}
                      >
                        Uninstall
                      </TabsTrigger>
                      <TabsTrigger
                        className="data-[state=active]:text-primary"
                        value="inprogress"
                        onClick={() => setActiveInstallAssetsTab("inprogress")}
                      >
                        In Progress
                      </TabsTrigger>
                      <TabsTrigger
                        className="data-[state=active]:text-primary"
                        value="failed"
                        onClick={() => setActiveInstallAssetsTab("failed")}
                      >
                        Failed Installation
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="install">
                      <InstallationComponent />
                    </TabsContent>
                    <TabsContent value="replace">
                      <ReplacementComponent />
                    </TabsContent>
                    <TabsContent value="uninstall">
                      <UninstallationComponent />
                    </TabsContent>
                    <TabsContent value="inprogress">
                      <InProgressInstallationComponent />
                    </TabsContent>
                    <TabsContent value="failed">
                      <FailedInstallationComponent />
                    </TabsContent>
                  </Tabs>
                );
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
      <div className=" ">
        <h1 className="text-2xl font-bold mb-6">Assets Management</h1>
        <Tabs defaultValue="stockTracker" className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex min-w-full bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 bg-transparent border">
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="stockTracker"
              >
                Stock Tracker
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="masterData"
              >
                Master Data
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="fieldActivityLedger"
              >
                Field Activity Ledger
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="testArchive"
              >
                Test Archive
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="conflictsHarmonizer"
              >
                Conflicts Harmonizer
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="fileUploadAssets"
              >
                File Upload Assets
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="hhInfoHistory"
              >
                HH Info History
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="hhFieldStatus"
              >
                HH Field Status
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-primary w-full whitespace-nowrap"
                value="installAssets"
              >
                Install Assets
              </TabsTrigger>
            </TabsList>
          </div>
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
              "installAssets",
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
