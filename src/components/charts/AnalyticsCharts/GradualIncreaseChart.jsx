"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

// Constants for control limits
const UCL = 210; // Upper Control Limit
const LCL = 190; // Lower Control Limit

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white shadow-md border border-gray-200 rounded-lg">
        <p className="font-bold">{`Time: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm">
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Function to check gradual temperature increase
const checkGradualIncrease = (data) => {
  let consecutiveIncreases = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i].Temperature - data[i - 1].Temperature === 0.5) {
      consecutiveIncreases++;
      if (consecutiveIncreases >= 5) return true;
    } else {
      consecutiveIncreases = 0;
    }
  }
  return false;
};

// Dummy Data Generation
const generateDummyData = () => {
  const data = [];
  const startTemp = 195;
  const startSpeed = 75;

  for (let i = 0; i < 30; i++) {
    // Simulate gradual temperature increase
    const temperature = startTemp + (i < 15 ? i * 0.5 : 7.5);

    // Simulate varying conveyor speed
    const conveyorSpeed = startSpeed - (i < 10 ? i : 9);

    data.push({
      name: `Time ${i + 1}`,
      Temperature: Number(temperature.toFixed(1)),
      ConveyorSpeed: conveyorSpeed,
      UCL: UCL,
      LCL: LCL,
    });
  }

  return data;
};

// Main Chart Component
const GradualIncreaseChart = () => {
  // Generate dummy data
  const [realData, setRealData] = useState(generateDummyData());
  const [showAlert, setShowAlert] = useState(false);
  const [truncatedRealData, setTruncatedRealData] = useState([]);

  useEffect(() => {
    if (realData && realData.length > 3) {
      const truncated = realData.slice(0, -3);
      setTruncatedRealData(truncated);

      const alertStatus = checkGradualIncrease(truncated);
      setShowAlert(alertStatus);

      if (alertStatus) {
        toast.error(
          "Alert: Combined effect of increasing temperature and decreasing conveyor speed detected!",
          {
            style: {
              background: "rgb(220, 38, 38)", // Tailwind's red-600
              color: "white",
              border: "none",
            },
          }
        );
      }
    }
  }, [realData]);

  return (
    <div className="w-full h-[500px] p-4">
      {showAlert && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Gradual temperature increase detected!
          </AlertDescription>
        </Alert>
      )}

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={realData}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          <Line
            type="monotone"
            dataKey="Temperature"
            stroke="#8884d8"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="ConveyorSpeed"
            stroke="#82ca9d"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="UCL"
            stroke="red"
            strokeDasharray="5 5"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="LCL"
            stroke="green"
            strokeDasharray="5 5"
            dot={false}
          />
          <ReferenceLine
            y={UCL}
            label="UCL"
            stroke="red"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={LCL}
            label="LCL"
            stroke="green"
            strokeDasharray="3 3"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradualIncreaseChart;
