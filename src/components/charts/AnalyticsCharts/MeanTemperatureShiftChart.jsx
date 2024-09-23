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

const checkMeanTemperatureShift = (data) => {
  let consecutiveIncrease = 0;
  let consecutiveDecrease = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i].Temperature > data[i - 1].Temperature) {
      consecutiveIncrease++;
      consecutiveDecrease = 0;
      if (consecutiveIncrease >= 8) return true;
    } else if (data[i].Temperature < data[i - 1].Temperature) {
      consecutiveDecrease++;
      consecutiveIncrease = 0;
      if (consecutiveDecrease >= 6) return true;
    } else {
      consecutiveIncrease = 0;
      consecutiveDecrease = 0;
    }
  }
  return false;
};

const parseTimestamp = (timestamp) => {
  if (typeof timestamp === "number") {
    return new Date(timestamp);
  }
  if (typeof timestamp === "string") {
    const parsedDate = new Date(timestamp);
    return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  }
  return new Date();
};

const MeanTemperatureShiftChart = ({ realData, predictionData }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [shiftedPredictionData, setShiftedPredictionData] = useState([]);

  useEffect(() => {
    const alertStatus = checkMeanTemperatureShift(realData);
    setShowAlert(alertStatus);
    if (alertStatus) {
      toast.error("Alert: Significant mean temperature shift detected!");
    }

    // Shift prediction data 5 seconds ahead
    const shiftedData = predictionData.map((item) => {
      const timestamp = parseTimestamp(item.Timestamp);
      timestamp.setSeconds(timestamp.getSeconds() + 5);
      return {
        ...item,
        Timestamp: timestamp.toISOString(),
        PredictedTemperature: item.Temperature, // Rename Temperature to PredictedTemperature
      };
    });
    setShiftedPredictionData(shiftedData);
  }, [realData, predictionData]);

  // Combine real and shifted prediction data
  const combinedData = [...realData, ...shiftedPredictionData].sort(
    (a, b) => parseTimestamp(a.Timestamp) - parseTimestamp(b.Timestamp)
  );

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Timestamp"
            tickFormatter={(timestamp) => {
              const date = parseTimestamp(timestamp);
              return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            }}
          />
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
            dataKey="Temperature"
            stroke="#8884d8"
            name="Real Temperature"
            dot={{ fill: "#8884d8" }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="PredictedTemperature"
            stroke="#181C14"
            name="Predicted Temperature"
            dot={{ fill: "#181C14" }}
            strokeDasharray="5 5"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      {showAlert && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>
            Significant mean temperature shift detected!
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default MeanTemperatureShiftChart;
