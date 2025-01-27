import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { daEconomicCurvesData } from "../../data/DAEconomicCurvesData"
import { useTimeInterval } from "../../context/TimeIntervalContext"

type DAEconomicCurvesProps = {}

export default function DAEconomicCurves({}: DAEconomicCurvesProps) {
  const { currentInterval } = useTimeInterval()
  const data = daEconomicCurvesData.find((item) => item.operating_hr === currentInterval)?.energy_bid_offer_curve
  if (!data) return <div>No data for this hour.</div>

  const formatInterval = (interval: number): string => {
    const start = `${(interval-1).toString().padStart(2, "0")}:00`
    const end = interval === 24 ? "24:00" : `${(interval % 24).toString().padStart(2, "0")}:00`;
    return `HE${interval.toString().padStart(2, "0")} [${start} - ${end}]`
  }

  const chartData = data.map(([power, price]) => ({ power: power / 1000000, price }))

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-[#fcfcfc]">DA Economic Curves</h3>
        <p className="text-sm text-[#fcfcfc]">Day-Ahead Economic Curve for: {formatInterval(currentInterval)}</p>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0/10" vertical={false} />
            <XAxis
              dataKey="power"
              type="number"
              stroke="#fcfcfc"
              tick={{ fill: "#fcfcfc" }}
              label={{
                value: "Power (MW)",
                position: "bottom",
                offset: 0,
                fill: "#fcfcfc",
              }}
            />
            <YAxis
              type="number"
              stroke="#fcfcfc"
              tick={{ fill: "#fcfcfc" }}
              label={{
                value: "Price ($/MWh)",
                angle: -90,
                position: "insideLeft",
                fill: "#fcfcfc",
              }}
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
              formatter={(value: number) => [`$${value}/MWh`, ""]}
            />
            <Line type="stepAfter" dataKey="price" stroke="#10b981" name="Price" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}