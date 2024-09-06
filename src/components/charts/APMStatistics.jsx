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

// Dummy data
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
  APM1: generateData("APM1", dates),
  APM2: generateData("APM2", dates),
  APM3: generateData("APM3", dates),
};

export default function APMStatistics() {
  const [selectedAPM, setSelectedAPM] = useState("ALL");
  const [selectedMetric, setSelectedMetric] = useState("installed");

  const chartData =
    selectedAPM === "ALL"
      ? dates.map((date) => ({
          date,
          APM1: dummyData.APM1.find((d) => d.date === date)[selectedMetric],
          APM2: dummyData.APM2.find((d) => d.date === date)[selectedMetric],
          APM3: dummyData.APM3.find((d) => d.date === date)[selectedMetric],
        }))
      : dummyData[selectedAPM];

  // Set color based on the selected APM
  const barColor =
    selectedAPM === "APM1"
      ? "hsl(var(--chart-1))"
      : selectedAPM === "APM2"
      ? "hsl(var(--chart-2))"
      : selectedAPM === "APM3"
      ? "hsl(var(--chart-3))"
      : "hsl(var(--chart-1))"; // Default color for ALL

  return (
    <div className="w-full -z-0">
      <Card className="w-full">
        <CardHeader className="px-4 py-2 border-b">
          <CardTitle className="text-lg">All Device Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row justify-between space-x-4 my-4 gap-2">
            <div className="flex justify-between gap-2">
              <Select value={selectedAPM} onValueChange={setSelectedAPM}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select APM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">ALL</SelectItem>
                  <SelectItem value="APM1">APM1</SelectItem>
                  <SelectItem value="APM2">APM2</SelectItem>
                  <SelectItem value="APM3">APM3</SelectItem>
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
                <span className="text-sm">APM1</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2  bg-[hsl(var(--chart-2))]"></div>
                <span className="text-sm">APM2</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 bg-[hsl(var(--chart-3))]"></div>
                <span className="text-sm">APM3</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} className="z-0">
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              {selectedAPM === "ALL" ? (
                <>
                  <Bar dataKey="APM1" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="APM2" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="APM3" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
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
