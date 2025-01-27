import React from "react"
import { Card } from "../ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from "recharts"
import { cumulativePnLComparisonData } from "../../context/cumulative-pnl-comparison-data"

interface CumulativePnLComparisonChartProps {
  cardBg?: string
}

const formatXAxis = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}/${date.getDate()}`
}

export default function CumulativePnLComparisonChart({ cardBg = "#393743" }: CumulativePnLComparisonChartProps) {
  return (
    <Card className="p-6 bg-[#393743] border-0">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#fcfcfc]">Cumulative PnL Comparison</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={cumulativePnLComparisonData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0/10" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxis} 
                stroke="#fcfcfc"
              />
              <YAxis 
                width={0}
                stroke="#fcfcfc"
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                tick={{ fill: "#fcfcfc" }}
              />
              <Tooltip
                formatter={(value, name) => {
                  return [
                    <span style={{ color: name === "perfectForesight" ? "#f4f5ac" : name === "eqBacktest" ? "#5ee5d4" : "#cfcfaa" }}>
                      {name}: ${(value as number).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>,
                    null
                  ]
                }}
                labelFormatter={(label) => new Date(label).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                cursor={{ stroke: "#fcfcfc", strokeWidth: 1 }}
                contentStyle={{ backgroundColor: "#2a2b36", border: "1px solid #4a4a5e" }}
                labelStyle={{ color: "#fcfcfc" }}
                sortActiveDataKey="perfectForesight"
              />
              <Line 
                type="monotone" 
                dataKey="perfectForesight" 
                name="Perfect Foresight"
                stroke="#f4f5ac"
                strokeWidth={2} 
                dot={false} 
                zIndex={3}
              />
              <Line 
                type="monotone" 
                dataKey="eqBacktest" 
                name="EQ Backtest"
                stroke="#5ee5d4"
                strokeWidth={2} 
                dot={false} 
                zIndex={2}
              />
              <Line 
                type="monotone" 
                dataKey="historicalActuals" 
                name="Historical Actuals"
                stroke="#cfcfaa"
                strokeWidth={2} 
                dot={false} 
                zIndex={1}
              />
              <Brush 
                dataKey="date"
                height={30}
                stroke="#4f46e5"
                fill="#000000"
                tickFormatter={formatXAxis}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}