"use client";
import React, { useState, useEffect } from "react";
import {
  ComposedChart,
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

const checkCombinedEffect = (data) => {
  for (let i = 1; i < data.length; i++) {
    if (
      data[i].Temperature > data[i - 1].Temperature &&
      data[i].Conveyor_Speed < data[i - 1].Conveyor_Speed
    ) {
      return true;
    }
  }
  return false;
};

const CombinedEffectChart = ({ realData, predictionData }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alertStatus = checkCombinedEffect(realData);
    setShowAlert(alertStatus);
    if (alertStatus) {
      toast.error(
        "Alert: Combined effect of increasing temperature and decreasing conveyor speed detected!"
      );
    }
  }, [realData]);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Timestamp" />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#8884d8"
            domain={[LCL - 10, UCL + 10]}
            label={{
              value: "Temperature (°C)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#82ca9d"
            label={{
              value: "Conveyor Speed",
              angle: 90,
              position: "insideRight",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine
            yAxisId="left"
            y={UCL}
            label="UCL"
            stroke="red"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            yAxisId="left"
            y={LCL}
            label="LCL"
            stroke="red"
            strokeDasharray="3 3"
          />
          <Line
            yAxisId="left"
            type="monotone"
            data={realData}
            dataKey="Temperature"
            stroke="#8884d8"
            name="Real Temperature"
          />
          <Line
            yAxisId="left"
            type="monotone"
            data={predictionData}
            dataKey="Temperature"
            stroke="#82ca9d"
            name="Predicted Temperature"
            strokeDasharray="5 5"
          />
          <Line
            yAxisId="right"
            type="monotone"
            data={realData}
            dataKey="Conveyor_Speed"
            stroke="#ffc658"
            name="Real Conveyor Speed"
          />
          <Line
            yAxisId="right"
            type="monotone"
            data={predictionData}
            dataKey="Conveyor_Speed"
            stroke="#ff7300"
            name="Predicted Conveyor Speed"
            strokeDasharray="5 5"
          />
        </ComposedChart>
      </ResponsiveContainer>
      {showAlert && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>
            Combined effect of increasing temperature and decreasing conveyor
            speed detected!
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default CombinedEffectChart;
