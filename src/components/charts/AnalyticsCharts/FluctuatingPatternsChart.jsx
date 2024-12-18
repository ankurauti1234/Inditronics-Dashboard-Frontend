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

// Constants for Upper and Lower Control Limits
const UCL = 210;
const LCL = 190;

// Custom Tooltip Component
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

// Function to generate dummy data
const generateDummyData = () => {
  const baseData = [];
  let baseTemp = 200;

  // Generate 50 data points
  for (let i = 0; i < 50; i++) {
    // Simulate some random fluctuations
    const tempVariation =
      Math.random() > 0.7
        ? (Math.random() - 0.5) * 2 // More random variation
        : (Math.random() - 0.5) * 0.5; // Less variation

    baseTemp += tempVariation;

    // Ensure temperature stays within a reasonable range
    baseTemp = Math.max(180, Math.min(220, baseTemp));

    baseData.push({
      Timestamp: `T${i + 1}`,
      Temperature: Number(baseTemp.toFixed(1)),
    });
  }

  return baseData;
};

// Generate prediction data slightly offset from real data
const generatePredictionData = (realData) => {
  return realData.map((point, index) => ({
    Timestamp: point.Timestamp,
    Temperature: Number(
      (point.Temperature + (Math.random() - 0.5) * 5).toFixed(1)
    ),
  }));
};

// Function to check for fluctuating patterns
const checkFluctuatingPatterns = (data) => {
  for (let i = 0; i < data.length - 5; i++) {
    const temps = [
      data[i].Temperature,
      data[i + 1].Temperature,
      data[i + 2].Temperature,
      data[i + 3].Temperature,
      data[i + 4].Temperature,
      data[i + 5].Temperature,
    ];

    // Check for a specific fluctuation pattern
    if (
      Math.abs(temps[1] - temps[0] - 0.3) < 0.1 &&
      Math.abs(temps[2] - temps[1] - 0.3) < 0.1 &&
      Math.abs(temps[3] - temps[2] + 0.1) < 0.1 &&
      Math.abs(temps[4] - temps[3] - 0.3) < 0.1 &&
      Math.abs(temps[5] - temps[4] - 0.3) < 0.1
    ) {
      return true;
    }
  }
  return false;
};

const FluctuatingPatternsChart = () => {
  const [realData, setRealData] = useState([]);
  const [predictionData, setPredictionData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [truncatedRealData, setTruncatedRealData] = useState([]);

  // Initialize data on component mount
  useEffect(() => {
    const generatedRealData = generateDummyData();
    setRealData(generatedRealData);
    setPredictionData(generatePredictionData(generatedRealData));
  }, []);

  // Check for fluctuating patterns when data changes
  useEffect(() => {
    if (realData && realData.length > 5) {
      const truncated = realData.slice(0, -3);
      setTruncatedRealData(truncated);

      const alertStatus = checkFluctuatingPatterns(truncated);
      setShowAlert(alertStatus);

      if (alertStatus) {
        toast.error(
          "Alert: Unusual temperature fluctuation pattern detected!",
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
      <div className="h-full">
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
              data={truncatedRealData}
              dataKey="Temperature"
              stroke="#00712D"
              name="Real Temperature"
              dot={{ fill: "#00712D" }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              data={predictionData}
              dataKey="Temperature"
              stroke="#FFC100"
              name="Predicted Temperature"
              dot={{ fill: "#FFC100" }}
              strokeDasharray="5 5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {showAlert && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>
            Fluctuating temperature pattern detected!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FluctuatingPatternsChart;
