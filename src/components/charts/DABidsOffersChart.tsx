import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { ProductColorMap } from "../../utils/ProductColorMap"
import { hourlyBidOfferData } from "../../data/daBidOfferQuantitiesData"

const formatXAxis = (hour: number) => {
  const paddedHour = hour.toString().padStart(2, "0")
  return hour % 3 === 0 ? `${paddedHour}:00` : ""
}

interface DABidsOffersChartProps {
  className?: string
}

export default function DABidsOffersChart({ className }: DABidsOffersChartProps) {
  return (
    <div className={`${className} h-[320px] w-full`}>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={hourlyBidOfferData}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
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
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }}
            labelStyle={{ color: "#fcfcfc" }}
            labelFormatter={(value) => `Hour-Ending: ${value.toString().padStart(2, "0")}:00`}
            formatter={(value: number, name: string, props: any) => [
              <span style={{ color: props.color }}>
                {name}: {value.toFixed(1)} MW
              </span>,
              null
            ]}
          />
          <ReferenceLine y={0} stroke="#fcfcfc" strokeOpacity={0.5} />
          <Line
            type="stepBefore"
            dataKey="rt_energy_bid_quantity"
            stroke={ProductColorMap["RT Energy"]}
            name="RT Energy Bid Quantity"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_energy_bid_quantity"
            stroke={ProductColorMap["DA Energy"]}
            name="DA Energy Bid Quantity"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_regup_bid_quantity"
            stroke={ProductColorMap["Reg Up"]}
            name="DA Reg Up Bid Quantity"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_regdown_bid_quantity"
            stroke={ProductColorMap["Reg Down"]}
            name="DA Reg Down Bid Quantity"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_rrs_bid_quantity"
            stroke={ProductColorMap["RRS"]}
            name="DA RRS Bid Quantity"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_nonspin_bid_quantity"
            stroke={ProductColorMap["NonSpin"]}
            name="DA Non-Spin Bid Quantity"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepBefore"
            dataKey="da_ecrs_bid_quantity"
            stroke={ProductColorMap["ECRS"]}
            name="DA ECRS Bid Quantity"
            dot={false}
            strokeWidth={1.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}