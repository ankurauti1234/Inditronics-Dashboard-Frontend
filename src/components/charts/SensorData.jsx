"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
  ReferenceLine,
} from "recharts";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Toaster, toast } from "sonner";

const LCL = 2;
const UCL = 100;
const ALERTS_PER_PAGE = 5;

export default function SensorData() {
  const [sensorData, setSensorData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [alertsPage, setAlertsPage] = useState(1);

  const fetchData = async () => {
    let url = `http://localhost:5000/api/sensor/live?page=${currentPage}&limit=5`;
    if (startDate && endDate) {
      url += `&startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}`;
    }
    try {
      const response = await fetch(url);
      const result = await response.json();
      const processedData = result.data.map((item) => ({
        ...item,
        isAlert: item.distance < LCL || item.distance > UCL,
      }));
      setSensorData(processedData);
      setTotalPages(result.totalPages);
      updateAlerts(processedData);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  const updateAlerts = (data) => {
    const newAlerts = data.filter((item) => item.isAlert);
    setAlerts((prevAlerts) => {
      const updatedAlerts = [...prevAlerts, ...newAlerts];
      // Remove duplicates based on timestamp
      return updatedAlerts.filter(
        (alert, index, self) =>
          index === self.findIndex((t) => t.timestamp === alert.timestamp)
      );
    });
    newAlerts.forEach((alert) => {
      toast.error(
        `Alert: Distance ${alert.distance.toFixed(
          2
        )} CM is out of control limits`,
        {
          description: format(
            new Date(alert.timestamp),
            "MMM d, yyyy h:mm:ss a"
          ),
        }
      );
    });
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds
    return () => clearInterval(intervalId);
  }, [currentPage, startDate, endDate]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAlertPageChange = (newPage) => {
    setAlertsPage(newPage);
  };

  const handleFilterApply = () => {
    setCurrentPage(1);
    fetchData();
    setIsFilterOpen(false);
  };

  const handleFilterReset = () => {
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1);
    fetchData();
    setIsFilterOpen(false);
  };

  const paginatedAlerts = alerts.slice(
    (alertsPage - 1) * ALERTS_PER_PAGE,
    alertsPage * ALERTS_PER_PAGE
  );

  const totalAlertPages = Math.ceil(alerts.length / ALERTS_PER_PAGE);

  return (
    <Card className="bg-transparent bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50">
      {/* <Toaster /> */}
      <CardHeader className="px-4 py-2 border-b">
        <CardTitle className="text-lg">Live UltraSonic Sensor</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row w-full items-center justify-evenly gap-4 p-2">
        <Card className="w-full">
          <CardHeader className="px-4 py-2 border-b">
            <CardTitle className="text-lg">
              Distance Over Time (Line Chart)
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <div className="h-[333px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[...sensorData].reverse()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(timestamp) =>
                      new Date(timestamp).toLocaleTimeString()
                    }
                  />
                  <YAxis />
                  <Tooltip
                    content={({ payload, label }) => {
                      if (payload && payload.length) {
                        const formattedTime = format(
                          new Date(label),
                          "MMM d, yyyy h:mm:ss a"
                        );
                        return (
                          <div className="bg-popover border p-3 rounded-lg">
                            <p>{`Time: ${formattedTime}`}</p>
                            <p>{`Distance: ${payload[0].value.toFixed(
                              2
                            )} CM`}</p>
                            <p>{`Status: ${
                              payload[0].payload.isAlert ? "Alert" : "Normal"
                            }`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine
                    y={LCL}
                    label="LCL"
                    stroke="red"
                    strokeDasharray="3 3"
                  />
                  <ReferenceLine
                    y={UCL}
                    label="UCL"
                    stroke="red"
                    strokeDasharray="3 3"
                  />
                  <Line
                    type="monotone"
                    dataKey="distance"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={<CustomizedDot />}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex justify-between items-center flex-row px-4 py-2 border-b">
            <CardTitle className="text-lg w-fit">Sensor Data Table</CardTitle>
            <div className="flex w-fit justify-between items-center gap-2">
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Date Range</h4>
                      <p className="text-sm text-muted-foreground">
                        Select the start and end dates for filtering.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? (
                              format(startDate, "dd/MM/yy")
                            ) : (
                              <span>Pick a start date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? (
                              format(endDate, "dd/MM/yy")
                            ) : (
                              <span>Pick an end date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button onClick={handleFilterApply}>Apply Filter</Button>
                    <Button variant="outline" onClick={handleFilterReset}>
                      Reset Filter
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="outline" onClick={fetchData}>
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sensorData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {format(
                        new Date(data.timestamp),
                        "MMM d, yyyy h:mm:ss a"
                      )}
                    </TableCell>
                    <TableCell>{data.distance.toFixed(2)} CM</TableCell>
                    <TableCell>{data.isAlert ? "Alert" : "Normal"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
      <CardContent>
        <Card>
          <CardHeader className="flex justify-between items-center flex-row px-4 py-2 border-b">
            <CardTitle className="text-lg">Alerts (Latest on Top)</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleAlertPageChange(alertsPage - 1)}
                disabled={alertsPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <span>
                Page {alertsPage} of {totalAlertPages}
              </span>
              <Button
                variant="outline"
                onClick={() => handleAlertPageChange(alertsPage + 1)}
                disabled={alertsPage === totalAlertPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Distance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAlerts.map((alert, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {format(
                        new Date(alert.timestamp),
                        "MMM d, yyyy h:mm:ss a"
                      )}
                    </TableCell>
                    <TableCell>{alert.distance.toFixed(2)} CM</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

const CustomizedDot = (props) => {
  const { cx, cy, payload } = props;
  const formattedDistance = payload.distance.toFixed(2);
  return (
    <g>
      <Dot
        cx={cx}
        cy={cy}
        stroke={payload.isAlert ? "red" : "#8884d8"}
        strokeWidth={2}
        fill={payload.isAlert ? "red" : "#fff"}
        r={4}
      />
      <text
        x={cx}
        y={cy - 10}
        fill={payload.isAlert ? "red" : "#8884d8"}
        textAnchor="middle"
        fontSize={12}
        fontWeight="bold"
      >
        {formattedDistance}
      </text>
    </g>
  );
};
