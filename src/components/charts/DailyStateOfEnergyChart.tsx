import React from "react"
import { Card } from "../ui/card"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Brush, ReferenceLine
} from "recharts"
import { dailyEnergyData } from "../../context/daily-energy-data"

interface DailyStateOfEnergyChartProps {
  cardBg?: string
}

const formatDetailedDate = (date: string) => {
  const [month, day, year] = date.split("/")
  return `${month}/${day}/${year}`
}

const safeNumberFormat = (value: any, decimals: number = 2) => {
  const num = Number(value)
  return isNaN(num) ? "0" : num.toFixed(decimals)
}

export default function DailyStateOfEnergyChart({ cardBg = "#393743" }: DailyStateOfEnergyChartProps) {
  const formattedData = dailyEnergyData.map(item => ({
    ...item,
    daily_soc_min: Number(item.daily_soc_min),
    daily_soc_max: Number(item.daily_soc_max),
    soc_range: Number(item.daily_soc_max) - Number(item.daily_soc_min)
  }))

  return (
    <Card className="p-6 bg-[#393743] border-0">
      <div className="space-y-4">
        <h3 className="text-base font-medium text-white">Daily State of Energy Min and Max</h3>
        <div className="p-4 rounded-lg">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={formattedData}
              margin={{ top: 0, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0/10" />
              <XAxis 
                dataKey="date" 
                stroke="#ffffff"
                tick={{ fill: "#ffffff" }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getMonth() + 1}/${date.getDate()}`
                }}
              />
              <YAxis 
                hide={true}
                domain={[0, 260]}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1c1e24", border: "none" }}
                labelStyle={{ color: "#ffffff" }}
                itemStyle={{ color: "#ffffff" }}
                labelFormatter={formatDetailedDate}
                formatter={(value, name, props) => {
                  const { daily_soc_min, daily_soc_max, soc_range } = props.payload
                  if (name === "daily_soc_min") return [`Min: ${safeNumberFormat(daily_soc_min)} MWh`, "Daily SoC Min"]
                  if (name === "soc_range") return [`Max: ${safeNumberFormat(daily_soc_max)} MWh`, "Daily SoC Max"]
                  return [`${safeNumberFormat(value)} MWh`, name]
                }}
              />
              <ReferenceLine y={0} stroke="#ffffff" />
              <Bar 
                dataKey="daily_soc_min" 
                fill="#393744" 
                stackId="a"
                maxBarSize={20}
              />
              <Bar 
                dataKey="soc_range" 
                fill="#2c9978" 
                stackId="a"
                maxBarSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}