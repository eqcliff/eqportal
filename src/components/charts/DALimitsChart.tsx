import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { ProductColorMap } from "../../utils/ProductColorMap"
import { hourlyLimitsData } from "../../data/daLimitsChartData"

const hourlyData = hourlyLimitsData

const formatXAxis = (hour: number) => {
  const paddedHour = hour.toString().padStart(2, "0")
  return `${paddedHour}:00`
}

interface DALimitsChartProps {
  className?: string
}

export default function DALimitsChart({ className }: DALimitsChartProps) {
  return (
    <div className={className}>
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
              <span style={{ color: props.color }}>
                {name}: {value} MW
              </span>,
              null,
            ]}
          />
          <ReferenceLine y={0} stroke="#fcfcfc" strokeOpacity={0.5} />
          <Line
            type="stepAfter"
            dataKey="rt_energy_limit_gen"
            stroke={ProductColorMap["RT Energy"]}
            name="RT Energy Limit Gen"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="rt_energy_limit_load"
            stroke={ProductColorMap["RT Energy"]}
            name="RT Energy Limit Load"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_energy_limit_gen"
            stroke={ProductColorMap["DA Energy"]}
            name="DA Energy Limit Gen"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_energy_limit_load"
            stroke={ProductColorMap["DA Energy"]}
            name="DA Energy Limit Load"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_regup_limit_gen"
            stroke={ProductColorMap["Reg Up"]}
            name="DA Reg Up Limit Gen"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_regup_limit_load"
            stroke={ProductColorMap["Reg Up"]}
            name="DA Reg Up Limit Load"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_regdown_limit_gen"
            stroke={ProductColorMap["Reg Down"]}
            name="DA Reg Down Limit Gen"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_regdown_limit_load"
            stroke={ProductColorMap["Reg Down"]}
            name="DA Reg Down Limit Load"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_rrs_limit_gen"
            stroke={ProductColorMap["RRS"]}
            name="DA RRS Limit Gen"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_rrs_limit_load"
            stroke={ProductColorMap["RRS"]}
            name="DA RRS Limit Load"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_nonspin_limit_gen"
            stroke={ProductColorMap["NonSpin"]}
            name="DA Non-Spin Limit Gen"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_nonspin_limit_load"
            stroke={ProductColorMap["NonSpin"]}
            name="DA Non-Spin Limit Load"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_ecrs_limit_gen"
            stroke={ProductColorMap["ECRS"]}
            name="DA ECRS Limit Gen"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_ecrs_limit_load"
            stroke={ProductColorMap["ECRS"]}
            name="DA ECRS Limit Load"
            dot={false}
            strokeWidth={1.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}