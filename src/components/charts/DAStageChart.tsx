import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { ProductColorMap } from "../../utils/ProductColorMap"
import { hourlyData } from "../../data/daStageChartData"

const formatXAxis = (operatingHr: number) => {
  const paddedHour = operatingHr.toString().padStart(2, "0")
  return operatingHr % 3 === 0 ? `${paddedHour}:00` : ""
}

interface DAStageChartProps {
  className?: string
}

export default function DAStageChart({ className }: DAStageChartProps) {
  return (
    <div className={`${className} h-[320px] w-full`}>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={hourlyData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
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
          <Tooltip
            contentStyle={{
              backgroundColor: "#1c1e24",
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
            labelStyle={{ color: "#fcfcfc" }}
            labelFormatter={(value) =>
              `Hour-Ending: ${formatXAxis(value) || `${value.toString().padStart(2, "0")}:00`}`
            }
            formatter={(value: number, name: string, props: any) => [
              <span key={name} style={{ color: props.color }}>
                {name}: ${value.toFixed(2)}
              </span>,
              null,
            ]}
          />
          <ReferenceLine y={0} stroke="#fcfcfc" strokeOpacity={0.5} />
          <Line
            type="stepBefore"
            dataKey="rt_energy_price_fcst"
            stroke={ProductColorMap["RT Energy"]}
            name="RT Energy"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_energy_price_fcst"
            stroke={ProductColorMap["DA Energy"]}
            name="DA Energy"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_regup_price_fcst"
            stroke={ProductColorMap["Reg Up"]}
            name="DA Reg Up"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_regdown_price_fcst"
            stroke={ProductColorMap["Reg Down"]}
            name="DA Reg Down"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_rrs_price_fcst"
            stroke={ProductColorMap["RRS"]}
            name="DA RRS"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_non_spin_price_fcst"
            stroke={ProductColorMap["NonSpin"]}
            name="DA Non Spin"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_ecrs_price_fcst"
            stroke={ProductColorMap["ECRS"]}
            name="DA ECRS"
            dot={false}
            strokeWidth={1.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}