"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
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
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const UCL = 180
const LCL = 120
const PREDICTION_POINTS = 5
const DATA_POINTS = 20
const MOVING_AVERAGE_PERIOD = 2

const roundToTwo = (num) => Math.round((num + Number.EPSILON) * 100) / 100

const generateDataPoint = (time) => {
  const newTemp = roundToTwo(Math.random() * (UCL - LCL) + LCL)
  return {
    time,
    temperature: newTemp,
  }
}

const predictFuturePoints = (data) => {
  if (data.length < 2) return []

  const lastTwo = data.slice(-2)
  const slope = (lastTwo[1].temperature - lastTwo[0].temperature) / (lastTwo[1].time - lastTwo[0].time)
  const intercept = lastTwo[1].temperature - slope * lastTwo[1].time

  return Array.from({ length: PREDICTION_POINTS }, (_, i) => {
    const time = data[data.length - 1].time + i + 1
    const predictedTemp = roundToTwo(slope * time + intercept + (Math.random() - 0.5) * 10)
    return {
      time,
      prediction: predictedTemp,
    }
  })
}

const calculateMovingAverage = (data, period) => {
  return data.map((point, index, array) => {
    if (index < period - 1) return { ...point, movingAverage: null }
    const sum = array.slice(index - period + 1, index + 1).reduce((acc, curr) => acc + curr.temperature, 0)
    return { ...point, movingAverage: roundToTwo(sum / period) }
  })
}

const calculateSummaryStats = (data) => {
  const temperatures = data.map(point => point.temperature)
  const mean = roundToTwo(temperatures.reduce((acc, curr) => acc + curr, 0) / temperatures.length)
  const sortedTemps = [...temperatures].sort((a, b) => a - b)
  const median = roundToTwo((sortedTemps[Math.floor((temperatures.length - 1) / 2)] + sortedTemps[Math.ceil((temperatures.length - 1) / 2)]) / 2)
  const min = Math.min(...temperatures)
  const max = Math.max(...temperatures)
  return { mean, median, min, max }
}

const getControlStatus = (data) => {
  const outOfControl = data.some(point => point.temperature > UCL || point.temperature < LCL)
  return outOfControl ? "Out of Control" : "In Control"
}

export default function EnhancedAnalytics() {
  const [data, setData] = useState([])
  const [summaryStats, setSummaryStats] = useState({ mean: 0, median: 0, min: 0, max: 0 })
  const [controlStatus, setControlStatus] = useState("In Control")
  const startTimeRef = useRef(Date.now())
  const { toast } = useToast()

  const addDataPoint = useCallback(() => {
    const currentTime = Math.floor((Date.now() - startTimeRef.current) / 1000)
    const newPoint = generateDataPoint(currentTime)

    if (newPoint.temperature > UCL || newPoint.temperature < LCL) {
      toast({
        title: "Temperature Alert",
        description: `Temperature (${newPoint.temperature}) is outside control limits!`,
        variant: "destructive",
      })
    }

    setData((currentData) => {
      const actualData = currentData.filter((point) => point.temperature !== undefined)
      const newActualData = [...actualData, newPoint].slice(-DATA_POINTS)
      const predictedData = predictFuturePoints(newActualData)
      const dataWithMovingAverage = calculateMovingAverage(newActualData, MOVING_AVERAGE_PERIOD)
      return [...dataWithMovingAverage, ...predictedData]
    })
  }, [toast])

  useEffect(() => {
    const initialData = Array.from({ length: DATA_POINTS }, (_, i) => generateDataPoint(i))
    const initialPredicted = predictFuturePoints(initialData)
    const initialDataWithMovingAverage = calculateMovingAverage(initialData, MOVING_AVERAGE_PERIOD)
    setData([...initialDataWithMovingAverage, ...initialPredicted])

    const interval = setInterval(addDataPoint, 1000)
    return () => clearInterval(interval)
  }, [addDataPoint])

  useEffect(() => {
    const actualData = data.filter((point) => point.temperature !== undefined)
    setSummaryStats(calculateSummaryStats(actualData))
    setControlStatus(getControlStatus(actualData))
  }, [data])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-background p-2 border border-border rounded shadow-md">
          <p className="label">{`Time: ${label}s`}</p>
          {payload[0].value && <p className="temp">{`Temperature: ${payload[0].value}`}</p>}
          {payload[1] && payload[1].value && <p className="pred">{`Prediction: ${payload[1].value}`}</p>}
          {payload[2] && payload[2].value && <p className="ma">{`Moving Average: ${payload[2].value}`}</p>}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
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
                label={{ value: "Time (seconds)", position: "insideBottomRight", offset: -10 }}
              />
              <YAxis
                domain={[LCL - 20, UCL + 20]}
                tickFormatter={(value) => roundToTwo(value)}
                label={{ value: "Temperature", angle: -90, position: "insideLeft" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceLine y={UCL} label="UCL" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
              <ReferenceLine y={LCL} label="LCL" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
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
                dataKey="prediction"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="movingAverage"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div>Mean: {summaryStats.mean}</div>
              <div>Median: {summaryStats.median}</div>
              <div>Min: {summaryStats.min}</div>
              <div>Max: {summaryStats.max}</div>
            </div>
            <div className="mt-4">
              Control Status: 
              <Badge 
                variant={controlStatus === "In Control" ? "default" : "destructive"}
                className="ml-2"
              >
                {controlStatus}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Data Points</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Temperature</TableHead>
                  <TableHead>Moving Average</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.slice(-5).map((point, index) => (
                  <TableRow key={index}>
                    <TableCell>{point.time}s</TableCell>
                    <TableCell>{point.temperature || '-'}</TableCell>
                    <TableCell>{point.movingAverage || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}