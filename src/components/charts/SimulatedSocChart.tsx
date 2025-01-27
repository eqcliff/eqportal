import React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { simulatedSocChartData, SimulatedSocDataPoint } from "../../data/simulatedSocChartData"

const socData = simulatedSocChartData

interface SimulatedSocChartProps {
  className?: string
}

export default function SimulatedSocChart({ className }: SimulatedSocChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={socData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0/10" vertical={false} />
          <XAxis
            dataKey="timestamp"
            stroke="#fcfcfc"
            tick={{ fill: "#fcfcfc", fontSize: 12 }}
            tickFormatter={(time) => {
              const date = new Date(time)
              return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
            }}
            interval={0}
            tickSize={8}
            tickMargin={8}
            axisLine={{ stroke: "#fcfcfc", strokeOpacity: 0.2 }}
            domain={[socData[0].timestamp, socData[socData.length - 1].timestamp]}
            ticks={[
              socData[0].timestamp,
              ...socData
                .map((_, index) => (index >= 180 && index % 180 === 0 ? socData[index].timestamp : undefined))
                .filter(Boolean),
            ]}
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
            labelFormatter={(label: string) => {
              const date = new Date(label)
              return `Time: ${date.toLocaleTimeString()}`
            }}
            formatter={(value: number, name: string) => [`${value.toFixed(1)} MWh`, "SOC"]}
          />
          <Area
            type="monotone"
            dataKey="soc"
            name="SOC"
            stroke="#2c9978"
            fillOpacity={0.3}
            fill="#2c9978"
            dot={false}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}