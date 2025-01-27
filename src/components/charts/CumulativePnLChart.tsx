import React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from "recharts"
import { cumulativePnLComparisonData } from "../../context/cumulative-pnl-comparison-data"

interface CumulativePnLChartProps {
  cardBg?: string
}

export default function CumulativePnLChart({ cardBg = "#393743" }: CumulativePnLChartProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[#fcfcfc]">Daily PnL - Cumulative</h3>
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart 
            data={cumulativePnLComparisonData} 
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0/10" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#fcfcfc"
              tick={{ fill: "#fcfcfc" }}
              axisLine={{ stroke: "#e2e8f0", strokeOpacity: 0.1 }}
              tickLine={{ stroke: "#e2e8f0", strokeOpacity: 0.1 }}
              tickFormatter={(dateString) => {
                const date = new Date(dateString)
                return date.toLocaleString("default", {
                  month: "short",
                  year: "numeric",
                })
              }}
            />
            <YAxis
              stroke="#fcfcfc"
              tick={{ fill: "#fcfcfc" }}
              axisLine={{ stroke: "#e2e8f0", strokeOpacity: 0.1 }}
              tickLine={{ stroke: "#e2e8f0", strokeOpacity: 0.1 }}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              label={{
                value: "Cumulative PnL ($)",
                angle: -90,
                position: "insideLeft",
                fill: "#fcfcfc",
                offset: 0
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: cardBg,
                border: "none",
                borderRadius: "4px",
                padding: "8px",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Cumulative PnL"]}
              labelFormatter={(label: string) => {
                const date = new Date(label)
                return date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              }}
              labelStyle={{ color: "#fcfcfc" }}
              itemStyle={{ color: "#fcfcfc" }}
            />
            <Area
              type="monotone"
              dataKey="EQ Backtest"
              stroke="#5ee5d4"
              fill="url(#colorPnL)"
              strokeWidth={2}
              dot={false}
            />
            <defs>
              <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5ee5d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#5ee5d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Brush
              dataKey="date"
              height={30}
              stroke="#4f46e5"
              fill="#1c1e24"
              tickFormatter={(dateString) => {
                const date = new Date(dateString)
                return date.toLocaleString("default", {
                  month: "short",
                  year: "numeric",
                })
              }}
              startIndex={0}
              endIndex={cumulativePnLComparisonData.length - 1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}