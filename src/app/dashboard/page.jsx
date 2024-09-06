"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  BatteryWarning,
  MonitorCog,
  PocketKnife,
  RadioTower,
  Siren,
  ChevronLeft,
  ChevronRight,
  RefreshCw, // Add Refresh icon from lucide-react
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

import APMStatistics from "@/components/charts/APMStatistics";
import APMLocations from "@/components/charts/APMLocations";
import MainLayout from "@/components/layouts/MainLayout";

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
        "http://localhost:5000/api/events/alertsCount"
      );
      const data = await response.json();

      // Ensure that all alert types are present
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
      // Set default data with all alert types and zero values in case of error
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
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    return date.toLocaleString(); // Format to locale string (e.g., "9/6/2024, 12:34:56 PM")
  };


const fetchAlertDetails = async (alarm, page = 1) => {
  try {
    const type = alertTypeMap[alarm.alert];
    const response = await fetch(
      `http://localhost:5000/api/events/alerts?Type=${type}&page=${page}`
    );
    const data = await response.json();

    // Sort events by timestamp in descending order
    const sortedEvents = data.events.sort((a, b) => b.TS - a.TS);

    setAlertDetails({ ...data, events: sortedEvents });
    setCurrentPage(page);
  } catch (error) {
    console.error("Error fetching alert details:", error);
  }
};


  const handleCardClick = (alarm) => {
    setSelectedAlarm(alarm);
    fetchAlertDetails(alarm);
  };

  const handlePageChange = (newPage) => {
    fetchAlertDetails(selectedAlarm, newPage);
  };

  const handleRefresh = () => {
    fetchAlarmData();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="bg-card border rounded-lg">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <p className="text-xl font-bold">Alerts</p>
            <RefreshCw
              className="h-6 w-6 cursor-pointer hover:bg-secondary border p-1 rounded"
              onClick={handleRefresh}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 p-2">
            {alarmData.map((alarm, index) => (
              <Card
                key={index}
                onClick={() => handleCardClick(alarm)}
                className="cursor-pointer bg-background hover:bg-primary/20 hover:border-ring transition-colors"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {alarm.alert.replace("_", " ")}
                  </CardTitle>
                  {iconMap[alarm.alert]}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{alarm.total || 0}</div>
                  <div className="flex w-full flex-wrap gap-2">
                    <p className="text-xs text-muted-foreground">
                      Generated: {alarm.generated || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Pending: {alarm.pending || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Resolved: {alarm.resolved || 0}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Dialog
          open={selectedAlarm !== null}
          onOpenChange={() => setSelectedAlarm(null)}
        >
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{selectedAlarm?.alert} Details</DialogTitle>
            </DialogHeader>
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
                  {Math.ceil(alertDetails.total / alertDetails.limit)}
                </span>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage * alertDetails.limit >= alertDetails.total
                  }
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="flex flex-col gap-8 lg:flex-row">
          <APMStatistics />
          <APMLocations />
        </div>
      </main>
    </MainLayout>
  );
}
