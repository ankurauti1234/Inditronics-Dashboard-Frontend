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

const UCL = 210;
const LCL = 190;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="font-bold">{`Time: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

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

const GradualIncreaseChart = ({ realData, predictionData }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alertStatus = checkGradualIncrease(realData);
    setShowAlert(alertStatus);
    if (alertStatus) {
      toast.error("Alert: Gradual temperature increase detected!");
    }
  }, [realData]);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Timestamp" />
          <YAxis domain={[LCL - 10, UCL + 10]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine
            y={UCL}
            label="UCL"
            stroke="red"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={LCL}
            label="LCL"
            stroke="red"
            strokeDasharray="3 3"
          />
          <Line
            type="monotone"
            data={realData}
            dataKey="Temperature"
            stroke="#ffc658"
            name="Real Temperature"
            dot={{ fill: "#ffc658" }}
          />
          <Line
            type="monotone"
            data={predictionData}
            dataKey="Temperature"
            stroke="#8884d8"
            name="Predicted Temperature"
            dot={{ fill: "#8884d8" }}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
      {showAlert && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>
            Gradual temperature increase detected!
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default GradualIncreaseChart;
