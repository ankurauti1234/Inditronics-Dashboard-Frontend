"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

// Dummy data generation function (unchanged)
const generateData = (apm, dates) => {
  return dates.map((date) => ({
    date,
    installed: Math.floor(Math.random() * 100),
    connected: Math.floor(Math.random() * 80),
    "EoD received": Math.floor(Math.random() * 60),
    "installed household": Math.floor(Math.random() * 40),
  }));
};

const dates = [
  "2023-01-01",
  "2023-02-01",
  "2023-03-01",
  "2023-04-01",
  "2023-05-01",
];
const dummyData = {
  Device1: generateData("Device1", dates),
  Device2: generateData("Device2", dates),
  Device3: generateData("Device3", dates),
};

// Custom tooltip component
const CustomTooltip = ({
  active,
  payload,
  label,
  selectedAPM,
  selectedMetric,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <p className="text-[0.70rem] uppercase text-muted-foreground">
          {label}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {selectedAPM === "ALL" ? (
            payload.map((entry, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {entry.dataKey}
                </span>
                <span className="font-bold text-muted-foreground">
                  {entry.value}
                </span>
              </div>
            ))
          ) : (
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {selectedMetric}
              </span>
              <span className="font-bold text-muted-foreground">
                {payload[0].value}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function APMStatistics() {
  const [selectedAPM, setSelectedAPM] = useState("ALL");
  const [selectedMetric, setSelectedMetric] = useState("installed");

  const chartData =
    selectedAPM === "ALL"
      ? dates.map((date) => ({
          date,
          Device1: dummyData.Device1.find((d) => d.date === date)[selectedMetric],
          Device2: dummyData.Device2.find((d) => d.date === date)[selectedMetric],
          Device3: dummyData.Device3.find((d) => d.date === date)[selectedMetric],
        }))
      : dummyData[selectedAPM];

  // Set color based on the selected APM
  const barColor =
    selectedAPM === "Device1"
      ? "hsl(var(--chart-1))"
      : selectedAPM === "Device2"
      ? "hsl(var(--chart-2))"
      : selectedAPM === "Device3"
      ? "hsl(var(--chart-3))"
      : "hsl(var(--chart-1))"; // Default color for ALL

  return (
    <div className="w-full -z-0">
      <Card className="w-full bg-transparent bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 border  rounded-lg">
        <CardHeader className="px-4 py-2 border-b">
          <CardTitle className="text-lg">All Device Status</CardTitle>
        </CardHeader>
        <CardContent className=" p-2">
          <div className="flex flex-col lg:flex-row justify-between pb-2 gap-2">
            <div className="flex justify-between gap-2">
              <Select value={selectedAPM} onValueChange={setSelectedAPM}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select APM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">ALL</SelectItem>
                  <SelectItem value="Device1">Device1</SelectItem>
                  <SelectItem value="Device2">Device2</SelectItem>
                  <SelectItem value="Device3">Device3</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="installed">Installed</SelectItem>
                  <SelectItem value="connected">Connected</SelectItem>
                  <SelectItem value="EoD received">EoD Received</SelectItem>
                  <SelectItem value="installed household">
                    Installed Household
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 justify-center border px-2 rounded-lg h-10 ">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 bg-[hsl(var(--chart-1))]"></div>
                <span className="text-sm">Device1</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2  bg-[hsl(var(--chart-2))]"></div>
                <span className="text-sm">Device2</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 bg-[hsl(var(--chart-3))]"></div>
                <span className="text-sm">Device3</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              className="z-0 bg-card border rounded-lg pt-4"
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                content={
                  <CustomTooltip
                    selectedAPM={selectedAPM}
                    selectedMetric={selectedMetric}
                  />
                }
              />
              {selectedAPM === "ALL" ? (
                <>
                  <Bar
                    dataKey="Device1"
                    fill="hsl(var(--chart-1))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Device2"
                    fill="hsl(var(--chart-2))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Device3"
                    fill="hsl(var(--chart-3))"
                    radius={[4, 4, 0, 0]}
                  />
                </>
              ) : (
                <Bar
                  dataKey={selectedMetric}
                  fill={barColor}
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
