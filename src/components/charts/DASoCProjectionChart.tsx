import React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { hourlySocProjectionData } from "../../data/daSocProjectionData"

const hourlyData = hourlySocProjectionData

const formatXAxis = (hour: number) => {
  const paddedHour = hour.toString().padStart(2, "0")
  return hour % 3 === 0 ? `${paddedHour}:00` : ""
}

interface DASoCProjectionChartProps {
  className?: string
}

export default function DASoCProjectionChart({ className }: DASoCProjectionChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={hourlyData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="socGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2c9978" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2c9978" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0/10" vertical={false} />
          <XAxis
            dataKey="operating_hr"
            tickFormatter={formatXAxis}
            stroke="#fcfcfc"
            tick={{ fill: "#fcfcfc", fontSize: 12 }}
            interval={0}
            tickSize={8}
            tickMargin={8}
            axisLine={{ stroke: "#fcfcfc", strokeOpacity: 0.2 }}
            ticks={[3, 6, 9, 12, 15, 18, 21, 24]}
            domain={[1, 24]}
          />
          <YAxis
            stroke="#fcfcfc"
            tick={{ fill: "#fcfcfc", fontSize: 12 }}
            tickSize={8}
            tickMargin={8}
            axisLine={{ stroke: "#fcfcfc", strokeOpacity: 0.2 }}
            domain={[0, 250]}
            ticks={[0, 50, 100, 150, 200, 250]}
            type="number"
            hide={true}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1c1e24",
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
            labelStyle={{ color: "#fcfcfc" }}
            itemStyle={{ color: "#fcfcfc" }}
            labelFormatter={(value) =>
              `Hour-Ending: ${formatXAxis(value) || `${value.toString().padStart(2, "0")}:00`}`
            }
            formatter={(value: number) => [`${value.toFixed(1)} MWh`, "SoC"]}
          />
          <Area
            type="monotone"
            dataKey="da_soc_projection"
            stroke="#2c9978"
            fillOpacity={0.3}
            fill="#2c9978"
            strokeWidth={2}
          />
          <ReferenceLine y={0} stroke="#fcfcfc" strokeOpacity={0.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}