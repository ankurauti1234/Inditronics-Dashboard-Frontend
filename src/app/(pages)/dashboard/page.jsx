"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layouts/MainLayout";
import APMStatistics from "@/components/charts/APMStatistics";
import dynamic from "next/dynamic";

const APMLocations = dynamic(() => import("@/components/maps/APMLocations"), {
  ssr: false, // This will disable server-side rendering for this component
});
import SPC from "@/components/charts/SPC";
import { cn } from "@/lib/utils";
import {
  BatteryWarning,
  MonitorCog,
  PocketKnife,
  RadioTower,
  Siren,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
} from "lucide-react";
import Analytics from "@/components/charts/Analytics";
import SensorData from "@/components/charts/SensorData";
import AlertCards from "@/components/tabs/dashboard/AlertCards";
import ConditionChart from "@/components/charts/ConditionChart";

const iconMap = {
  TAMPER_ALARM: <PocketKnife className="h-4 w-4 text-primary" />,
  SYSTEM_ALARM: <MonitorCog className="h-4 w-4 text-primary" />,
  BATTERY_ALARM: <BatteryWarning className="h-4 w-4 text-primary" />,
  SIM_ALERT: <RadioTower className="h-4 w-4 text-primary" />,
  SOS_ALARM: <Siren className="h-4 w-4 text-primary" />,
};

const alertTypeMap = {
  TAMPER_ALARM: 5,
  SOS_ALARM: 6,
  BATTERY_ALARM: 7,
  SIM_ALERT: 16,
  SYSTEM_ALARM: 17,
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [selectedAlarm, setSelectedAlarm] = useState(null);
  const [alarmData, setAlarmData] = useState([]);
  const [alertDetails, setAlertDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [deviceId, setDeviceId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
      fetchAlarmData();
    }
  }, [router]);

  const alertTypes = [
    "TAMPER_ALARM",
    "SOS_ALARM",
    "BATTERY_ALARM",
    "SIM_ALERT",
    "SYSTEM_ALARM",
  ];

  const fetchAlarmData = async () => {
    try {
      const response = await fetch(
        "https://apmapis.webdevava.live/api/events/alertsCount"
      );
      const data = await response.json();

      const alarmDataWithDefaults = alertTypes.map((type) => {
        const existingData = data.find((alarm) => alarm.alert === type);
        return (
          existingData || {
            alert: type,
            total: 0,
            generated: 0,
            pending: 0,
            resolved: 0,
          }
        );
      });

      setAlarmData(alarmDataWithDefaults);
    } catch (error) {
      console.error("Error fetching alarm data:", error);
      const defaultAlarmData = alertTypes.map((type) => ({
        alert: type,
        total: 0,
        generated: 0,
        pending: 0,
        resolved: 0,
      }));
      setAlarmData(defaultAlarmData);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const fetchAlertDetails = async (alarm, page = 1) => {
    try {
      const type = alertTypeMap[alarm.alert];
      const response = await fetch(
        `https://apmapis.webdevava.live/api/events/alerts?Type=${type}&page=${page}&limit=${pageSize}&DEVICE_ID=${deviceId}`
      );
      const data = await response.json();

      const sortedEvents = data.events.sort((a, b) => b.TS - a.TS);

      setAlertDetails({ ...data, events: sortedEvents });
      setCurrentPage(page);
      setPageSize(data.limit);
    } catch (error) {
      console.error("Error fetching alert details:", error);
    }
  };

  const handleCardClick = (alarm) => {
    setSelectedAlarm(alarm);
    fetchAlertDetails(alarm);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(alertDetails.total / pageSize))
      return;
    fetchAlertDetails(selectedAlarm, newPage);
  };

  const handleRefresh = () => {
    fetchAlarmData();
  };

  const handleSearch = () => {
    fetchAlertDetails(selectedAlarm, 1);
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
      <main className="flex flex-1 flex-col gap-6 ">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 bg-transparent border mb-4">
            <TabsTrigger
              className="data-[state=active]:text-primary"
              r
              value="overview"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-primary"
              value="live"
            >
              Live Charts
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-primary"
              value="analytics"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <AlertCards onCardClick={handleCardClick} />

            <div className="flex flex-col gap-8 lg:flex-row mt-8">
              <APMStatistics />
              <APMLocations />
            </div>
          </TabsContent>
          <TabsContent value="live">
            <div className="grid gap-8">
              <SensorData />
              <SPC device="Device 001" />
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-8">
              <Analytics />
              {/* <ConditionChart/> */}
              {/* <Analytics2/> */}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog
          open={selectedAlarm !== null}
          onOpenChange={() => setSelectedAlarm(null)}
        >
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{selectedAlarm?.alert} Details</DialogTitle>
            </DialogHeader>
            <div className="flex justify-end items-center gap-2">
              <Input
                type="text"
                placeholder="Search by Device ID"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                className="w-1/2"
              />
              <Button onClick={handleSearch}>
                <Search size={18} />
              </Button>
            </div>
            <ScrollArea className="h-[400px] w-full">
              {alertDetails && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device ID</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Alert Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alertDetails.events.map((event) => (
                      <TableRow key={event._id}>
                        <TableCell>{event.DEVICE_ID}</TableCell>
                        <TableCell>{formatTimestamp(event.TS)}</TableCell>
                        <TableCell>{event.AlertType}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </ScrollArea>

            {alertDetails && (
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <span>
                  Page {currentPage} of{" "}
                  {Math.ceil(alertDetails.total / pageSize)}
                </span>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage * pageSize >= alertDetails.total}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </MainLayout>
  );
}
