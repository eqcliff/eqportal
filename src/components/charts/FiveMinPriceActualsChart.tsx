import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { fiveMinPriceActualsData } from "../../data/rtPriceActualsData"
import { ProductColorMap } from "../../utils/ProductColorMap"

const formatXAxis = (dateTime: string) => {
  const date = new Date(dateTime)
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}

interface FiveMinPriceActualsChartProps {
  cardBg?: string
  className?: string
}

export default function FiveMinPriceActualsChart({ className }: FiveMinPriceActualsChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={fiveMinPriceActualsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0/10" vertical={false} />
          <XAxis
            dataKey="operating_dt"
            stroke="#ffffff"
            tick={{ fill: "#fcfcfc", fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value)
              return `${date.getHours().toString().padStart(2, "0")}:00`
            }}
            ticks={fiveMinPriceActualsData
              .filter((_, index) => index % (12 * 3) === 0)
              .map((item) => item.operating_dt)}
            interval={0}
            tickSize={8}
            tickMargin={8}
            axisLine={{ stroke: "#fcfcfc", strokeOpacity: 0.2 }}
            domain={["auto", "auto"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1c1e24",
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
            labelStyle={{ color: "#fcfcfc" }}
            labelFormatter={(label: string) => `Interval-Ending: ${formatXAxis(label)}`}
            formatter={(value: number, name: string, props: any) => [
              <span style={{ color: props.color }}>
                {name}: ${value.toFixed(2)}
              </span>,
              null,
            ]}
          />
          <ReferenceLine y={0} stroke="#fcfcfc" strokeOpacity={0.5} />
          <Line
            type="monotone"
            dataKey="rt_energy_price_act"
            name="RT Energy"
            stroke={ProductColorMap["RT Energy"]}
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="da_energy_price_act"
            name="DA Energy"
            stroke={ProductColorMap["DA Energy"]}
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="da_regup_price_act"
            name="DA Reg Up"
            stroke={ProductColorMap["Reg Up"]}
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="da_regdown_price_act"
            name="DA Reg Down"
            stroke={ProductColorMap["Reg Down"]}
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="da_rrs_price_act"
            name="DA RRS"
            stroke={ProductColorMap["RRS"]}
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="da_nonspin_price_act"
            name="DA Non-Spin"
            stroke={ProductColorMap["NonSpin"]}
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="da_ecrs_price_act"
            name="DA ECRS"
            stroke={ProductColorMap["ECRS"]}
            dot={false}
            strokeWidth={1.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}