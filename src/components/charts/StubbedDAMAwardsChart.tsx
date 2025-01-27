import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { ProductColorMap } from "../../utils/ProductColorMap"
import { hourlyDamAwardsData } from "../../data/daDamAwardsData"

const formatXAxis = (operatingHr: number) => {
  if (operatingHr % 3 !== 0) return ""
  const paddedHour = operatingHr.toString().padStart(2, "0")
  return `${paddedHour}:00`
}

interface StubbedDAMAwardsChartProps {
  className?: string
}

export default function StubbedDAMAwardsChart({ className }: StubbedDAMAwardsChartProps) {
  return (
    <div className={`${className} h-[320px] w-full`}>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={hourlyDamAwardsData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0/10" vertical={false} />
          <XAxis
            dataKey="operating_hr"
            tickFormatter={formatXAxis}
            stroke="#fcfcfc"
            tick={{ fill: "#fcfcfc", fontSize: 12 }}
            tickSize={8}
            tickMargin={8}
            axisLine={{ stroke: "#fcfcfc", strokeOpacity: 0.2 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1c1e24",
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
            labelStyle={{ color: "#fcfcfc" }}
            labelFormatter={(value) => `Hour-Ending: ${formatXAxis(value) || `${value.toString().padStart(2, "0")}:00`}`}
            formatter={(value: number, name: string, props: any) => [
              <span style={{ color: props.color }}>
                {name}: {value} MW
              </span>,
              null,
            ]}
          />
          <ReferenceLine y={0} stroke="#fcfcfc" strokeOpacity={0.5} />
          <Line
            type="stepBefore"
            dataKey="da_energy_award_gen"
            stroke={ProductColorMap["DA Energy"]}
            name="DA Energy Award Gen"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_energy_award_load"
            stroke={ProductColorMap["DA Energy"]}
            name="DA Energy Award Load"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_regup_award_gen"
            stroke={ProductColorMap["Reg Up"]}
            name="DA Reg Up Award Gen"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_regup_award_load"
            stroke={ProductColorMap["Reg Up"]}
            name="DA Reg Up Award Load"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_regdown_award_gen"
            stroke={ProductColorMap["Reg Down"]}
            name="DA Reg Down Award Gen"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_regdown_award_load"
            stroke={ProductColorMap["Reg Down"]}
            name="DA Reg Down Award Load"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_rrs_award_gen"
            stroke={ProductColorMap["RRS"]}
            name="DA RRS Award Gen"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_rrs_award_load"
            stroke={ProductColorMap["RRS"]}
            name="DA RRS Award Load"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_nonspin_award_gen"
            stroke={ProductColorMap["NonSpin"]}
            name="DA Non-Spin Award Gen"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_nonspin_award_load"
            stroke={ProductColorMap["NonSpin"]}
            name="DA Non-Spin Award Load"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_ecrs_award_gen"
            stroke={ProductColorMap["ECRS"]}
            name="DA ECRS Award Gen"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_ecrs_award_load"
            stroke={ProductColorMap["ECRS"]}
            name="DA ECRS Award Load"
            dot={false}
            strokeWidth={1.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}