"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const generateDataPoint = (time, index) => {
  const baseTemperature = 215; // Midpoint between UCL and LCL
  const baseHumidity = 50;

  // Create cyclic patterns
  const temperatureCycle = Math.sin(index / 10) * 30;
  const humidityCycle = Math.cos(index / 8) * 20;

  // Add some randomness
  const temperatureNoise = (Math.random() - 0.5) * 10;
  const humidityNoise = (Math.random() - 0.5) * 5;

  // Occasionally generate out-of-control points
  const outOfControlChance = 0.05;
  const isOutOfControl = Math.random() < outOfControlChance;

  let temperature = baseTemperature + temperatureCycle + temperatureNoise;
  let humidity = baseHumidity + humidityCycle + humidityNoise;

  if (isOutOfControl) {
    temperature += (Math.random() > 0.5 ? 1 : -1) * Math.random() * 50;
    humidity += (Math.random() > 0.5 ? 1 : -1) * Math.random() * 30;
  }

  return {
    Timestamp: time.toLocaleTimeString(),
    Temperature: temperature,
    Humidity: Math.max(0, Math.min(100, humidity)),
  };
};

const generateInitialData = () => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < 60; i++) {
    const time = new Date(now.getTime() - (60 - i) * 5000);
    data.push(generateDataPoint(time, i));
  }
  return data;
};

const SPC = ({ device }) => {
  const [data, setData] = useState(() => generateInitialData());
  const [index, setIndex] = useState(60);

  const temperatureUCL = 250;
  const temperatureLCL = 180;
  const averageTemperature = (temperatureUCL + temperatureLCL) / 2;

  const humidityUCL = 80;
  const humidityLCL = 20;
  const averageHumidity = (humidityUCL + humidityLCL) / 2;

  useEffect(() => {
    const interval = setInterval(() => {
      const newDataPoint = generateDataPoint(new Date(), index);

      setData((prevData) => {
        const newData = [...prevData.slice(1), newDataPoint]; // Keep last 60 data points (5 minutes)

        // Check for out-of-control points
        if (
          newDataPoint.Temperature > temperatureUCL ||
          newDataPoint.Temperature < temperatureLCL
        ) {
          toast.warning(
            `Temperature out of control: ${newDataPoint.Temperature.toFixed(
              2
            )}°C`,
            {
              description: `Time: ${newDataPoint.Timestamp}`,
            }
          );
        }
        if (
          newDataPoint.Humidity > humidityUCL ||
          newDataPoint.Humidity < humidityLCL
        ) {
          toast.warning(
            `Humidity out of control: ${newDataPoint.Humidity.toFixed(2)}%`,
            {
              description: `Time: ${newDataPoint.Timestamp}`,
            }
          );
        }

        return newData;
      });

      setIndex((prevIndex) => prevIndex + 1);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [index]);

  return (
    <Card className="bg-transparent bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50">
      {device && (
        <CardHeader className="px-4 py-2 border-b">
          <CardTitle className="text-lg">{device} ddd</CardTitle>
        </CardHeader>
      )}
      <CardContent className=" flex flex-col md:flex-row gap-4 p-2">
        <Card className="w-full">
          <CardHeader className="px-4 py-2 border-b">
            <CardTitle className="text-lg">
              Temprature Over Time (Line Chart)
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full p-2">
            <ResponsiveContainer
              width="100%"
              height={400}
              className="bg-card border rounded-lg  pt-4"
            >
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="Timestamp"
                  label={{ value: "Time", position: "bottom" }}
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  label={{
                    value: "Temperature (°C)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  domain={[
                    Math.min(
                      temperatureLCL - 20,
                      Math.floor(Math.min(...data.map((d) => d.Temperature)))
                    ),
                    Math.max(
                      temperatureUCL + 20,
                      Math.ceil(Math.max(...data.map((d) => d.Temperature)))
                    ),
                  ]}
                />
                <Tooltip
                  content={({ payload, label }) => {
                    if (payload && payload.length) {
                      return (
                        <div className="bg-popover border p-3 rounded-lg">
                          <p>{`Time: ${label}`}</p>
                          <p>{`Temperature: ${payload[0].value.toFixed(
                            2
                          )} °C`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="Temperature"
                  stroke="#8884d8"
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    if (
                      payload.Temperature > temperatureUCL ||
                      payload.Temperature < temperatureLCL
                    ) {
                      return <circle cx={cx} cy={cy} r={4} fill="red" />;
                    }
                    return null;
                  }}
                />
                <ReferenceLine
                  y={averageTemperature}
                  stroke="green"
                  strokeDasharray="3 3"
                  label={{ value: "Average", position: "insideTopLeft" }}
                />
                <ReferenceLine
                  y={temperatureUCL}
                  stroke="red"
                  strokeDasharray="3 3"
                  label={{ value: "UCL", position: "insideTopLeft" }}
                />
                <ReferenceLine
                  y={temperatureLCL}
                  stroke="red"
                  strokeDasharray="3 3"
                  label={{ value: "LCL", position: "insideBottomLeft" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="px-4 py-2 border-b">
            <CardTitle className="text-lg">
              Humidity Over Time (Line Chart)
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full p-2">
            <ResponsiveContainer
              width="100%"
              height={400}
              className="bg-card border rounded-lg pt-4"
            >
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="Timestamp"
                  label={{ value: "Time", position: "bottom" }}
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  label={{
                    value: "Humidity (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  domain={[0, 100]}
                />
                <Tooltip
                  content={({ payload, label }) => {
                    if (payload && payload.length) {
                      return (
                        <div className="bg-popover border p-3 rounded-lg">
                          <p>{`Time: ${label}`}</p>
                          <p>{`Humidity: ${payload[0].value.toFixed(2)} %`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="Humidity"
                  stroke="#82ca9d"
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    if (
                      payload.Humidity > humidityUCL ||
                      payload.Humidity < humidityLCL
                    ) {
                      return <circle cx={cx} cy={cy} r={4} fill="red" />;
                    }
                    return null;
                  }}
                />
                <ReferenceLine
                  y={averageHumidity}
                  stroke="green"
                  strokeDasharray="3 3"
                  label={{ value: "Average", position: "insideTopLeft" }}
                />
                <ReferenceLine
                  y={humidityUCL}
                  stroke="red"
                  strokeDasharray="3 3"
                  label={{ value: "UCL", position: "insideTopLeft" }}
                />
                <ReferenceLine
                  y={humidityLCL}
                  stroke="red"
                  strokeDasharray="3 3"
                  label={{ value: "LCL", position: "insideBottomLeft" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default SPC;
