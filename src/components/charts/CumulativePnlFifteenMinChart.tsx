import React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { cumulativePnlFifteenMinData } from "../../data/cumulativePnlFifteenMinData"

interface CumulativePnlFifteenMinChartProps {
  className?: string
}

export default function CumulativePnlFifteenMinChart({ className }: CumulativePnlFifteenMinChartProps) {
  const formatXAxis = (timestamp: string) => {
    const date = new Date(timestamp)
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
  }

  const formatTooltipTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return `Through Interval-Ending: ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
  }

  const firstDataPointTime = new Date("2024-01-15T00:15:00")
  const lastDataPointTime = new Date("2024-01-16T00:00:00")

  const tickValues = []
  for (let i = 3; i <= 24; i += 3) {
    const tickTime = new Date(`2024-01-15T${i.toString().padStart(2, "0")}:00:00`)
    tickValues.push(tickTime.toISOString())
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={cumulativePnlFifteenMinData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0/10" vertical={false} />
          <XAxis
            dataKey="timestamp"
            stroke="#fcfcfc"
            tick={{ fill: "#fcfcfc", fontSize: 12 }}
            tickFormatter={formatXAxis}
            interval={0}
            domain={[firstDataPointTime.toISOString(), lastDataPointTime.toISOString()]}
            ticks={tickValues}
            tickSize={8}
            tickMargin={8}
            axisLine={{ stroke: "#fcfcfc", strokeOpacity: 0.2 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1c1c1e",
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
            labelStyle={{ color: "#fcfcfc" }}
            labelFormatter={formatTooltipTimestamp}
            formatter={(value: number) => [
              `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              "Cumulative PnL",
            ]}
          />
          <Area
            type="monotone"
            dataKey="cumulativePnL"
            stroke="#14b8a6"
            dot={false}
            strokeWidth={2}
            fill="#14b8a6"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}