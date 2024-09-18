import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const UCL = 260;
const LCL = 180;
const PREDICTION_POINTS = 5;
const DATA_POINTS = 20;

const roundToTwo = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

const generateDataPoint = (time) => {
  const newTemp = roundToTwo(Math.random() * (UCL - LCL) + LCL);
  return {
    time,
    temperature: newTemp,
    ucl: UCL,
    lcl: LCL,
  };
};

const predictFuturePoints = (data) => {
  if (data.length < 2) return [];

  const lastTwo = data.slice(-2);
  const slope =
    (lastTwo[1].temperature - lastTwo[0].temperature) /
    (lastTwo[1].time - lastTwo[0].time);
  const intercept = lastTwo[1].temperature - slope * lastTwo[1].time;

  return Array.from({ length: PREDICTION_POINTS }, (_, i) => {
    const time = data[data.length - 1].time + i + 1;
    const predictedTemp = roundToTwo(
      slope * time + intercept + (Math.random() - 0.5) * 10
    );
    return {
      time,
      prediction: predictedTemp,
      ucl: UCL,
      lcl: LCL,
    };
  });
};

const Analytics = () => {
  const [data, setData] = useState([]);
  const startTimeRef = useRef(Date.now());
  const { toast } = useToast();

  const addDataPoint = useCallback(() => {
    const currentTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const newPoint = generateDataPoint(currentTime);

    if (newPoint.temperature > UCL || newPoint.temperature < LCL) {
      toast({
        title: "Temperature Alert",
        description: `Temperature (${newPoint.temperature}) is outside control limits!`,
        variant: "destructive",
      });
    }

    setData((currentData) => {
      const actualData = currentData.filter(
        (point) => point.temperature !== undefined
      );
      const newActualData = [...actualData, newPoint].slice(-DATA_POINTS);
      const predictedData = predictFuturePoints(newActualData);
      return [...newActualData, ...predictedData];
    });
  }, [toast]);

  useEffect(() => {
    const initialData = Array.from({ length: DATA_POINTS }, (_, i) =>
      generateDataPoint(i)
    );
    const initialPredicted = predictFuturePoints(initialData);
    setData([...initialData, ...initialPredicted]);

    const interval = setInterval(addDataPoint, 1000);
    return () => clearInterval(interval);
  }, [addDataPoint]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-background p-2 border border-border rounded shadow-md">
          <p className="label">{`Time: ${label}s`}</p>
          {payload[0].value && (
            <p className="temp">{`Temperature: ${payload[0].value}`}</p>
          )}
          {payload[1] && payload[1].value && (
            <p className="pred">{`Prediction: ${payload[1].value}`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Real-time Temperature SPC Chart with Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{
                value: "Time (seconds)",
                position: "insideBottomRight",
                offset: -10,
              }}
            />
            <YAxis
              domain={[LCL - 20, UCL + 20]}
              tickFormatter={(value) => roundToTwo(value)}
              label={{
                value: "Temperature",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="ucl"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="lcl"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="prediction"
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Analytics;
