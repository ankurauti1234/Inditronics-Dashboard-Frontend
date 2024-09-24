import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Switch } from "@/components/ui/switch";

const generateDummyData = () => {
  const data = [];
  let value = 0.1;
  for (let i = 0; i < 60; i++) {
    value += Math.random() * 0.1 - 0.05;
    value = Math.max(0, Math.min(0.4, value));
    data.push({
      time: `2019-06-23 00:${i.toString().padStart(2, "0")}:00`,
      value: value,
      status: value > 0.3 ? "high" : value > 0.2 ? "medium" : "low",
    });
  }
  return data;
};

const ConditionChart = () => {
  const [data, setData] = useState(generateDummyData());
  const [predictionOn, setPredictionOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)];
        const lastTime = new Date(newData[newData.length - 1].time);
        lastTime.setSeconds(lastTime.getSeconds() + 1);
        const newValue = Math.max(
          0,
          Math.min(
            0.4,
            newData[newData.length - 1].value + (Math.random() * 0.1 - 0.05)
          )
        );
        newData.push({
          time: lastTime.toISOString().substr(0, 19).replace("T", " "),
          value: newValue,
          status: newValue > 0.3 ? "high" : newValue > 0.2 ? "medium" : "low",
        });
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const CustomizedDot = (props) => {
    const { cx, cy, payload } = props;
    if (payload.status === "high") {
      return <circle cx={cx} cy={cy} r={5} fill="red" />;
    }
    if (payload.status === "medium") {
      return <circle cx={cx} cy={cy} r={4} fill="yellow" />;
    }
    return null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Production Line 1, Filter</h2>
        <div className="flex items-center space-x-2">
          <span>Prediction</span>
          <Switch checked={predictionOn} onCheckedChange={setPredictionOn} />
        </div>
      </div>
      <div className="bg-orange-200 p-2 rounded mb-4">
        <div className="flex justify-between">
          <span>Model 1, target_sensor_1</span>
          <div>
            <span className="font-bold mr-2">Risk: High</span>
            <span>Influence: 20 alarms in 0h 40m</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(tick) => tick.split(" ")[1]}
            />
            <YAxis domain={[0, 0.4]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              dot={<CustomizedDot />}
            />
            {predictionOn && (
              <Line
                type="monotone"
                dataKey="value"
                stroke="#82ca9d"
                strokeDasharray="5 5"
                data={data.slice(-15)}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="bg-gray-200 px-2 py-1 rounded">
          Past 1 hour Condition
        </div>
        <div className="bg-orange-200 px-2 py-1 rounded">
          Current Alarm Period
        </div>
        {predictionOn && (
          <div className="bg-green-200 px-2 py-1 rounded">
            15 min Prediction
          </div>
        )}
      </div>
    </div>
  );
};

export default ConditionChart;
