import React from "react"
import { 
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Brush, Legend
} from "recharts"
import { dailyEnergyData } from "../../context/daily-energy-data"

interface ChargeDischargeCyclesChartProps {
  cardBg?: string;
}

const formatDetailedDate = (date: string) => {
  const [month, day, year] = date.split("/")
  return `${month}/${day}/${year}`
}

const safeNumberFormat = (value: any, decimals: number = 2) => {
  const num = Number(value)
  return isNaN(num) ? "0" : num.toFixed(decimals)
}

export default function ChargeDischargeCyclesChart({ cardBg = "#393743" }: ChargeDischargeCyclesChartProps) {
  const formattedData = dailyEnergyData.map(item => ({
    ...item,
    cumulative_charge_mwh: Number(item.cumulative_charge_mwh),
    cumulative_discharge_mwh: Number(item.cumulative_discharge_mwh),
    daily_charge_mwh: Number(item.daily_charge_mwh),
    daily_discharge_mwh: Number(item.daily_discharge_mwh)
  }))

  return (
    <div className="p-6 bg-[#393743] border-0 rounded-lg">
      <div className="space-y-4">
        <h3 className="text-base font-medium text-[#fcfcfc]">Charge/Discharge Cycles</h3>
        <div className="p-4 rounded-lg">
          <ResponsiveContainer width="100%" height={500}>
            <ComposedChart 
              data={formattedData}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0/10" />
              <XAxis 
                dataKey="date" 
                stroke="#fcfcfc"
                tick={{ fill: "#fcfcfc" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#fcfcfc"
                tick={{ fill: "#fcfcfc" }}
                label={{ 
                  value: "Daily Energy (MWh)", 
                  angle: 90, 
                  position: "insideRight",
                  fill: "#fcfcfc"
                }}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#fcfcfc"
                tick={{ fill: "#fcfcfc" }}
                label={{ 
                  value: "Cumulative Energy (MWh)", 
                  angle: -90, 
                  position: "insideLeft",
                  fill: "#fcfcfc"
                }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1c1e24", border: "none" }}
                labelStyle={{ color: "#fcfcfc" }}
                itemStyle={{ color: "#fcfcfc" }}
                labelFormatter={formatDetailedDate}
                formatter={(value, name) => [`${safeNumberFormat(value)} MWh`, name]}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                wrapperStyle={{
                  paddingBottom: "20px",
                  color: "#fcfcfc"
                }}
              />
              <Bar 
                yAxisId="right"
                dataKey="daily_charge_mwh"
                name="Daily Charge"
                fill="#4f46e5"
                opacity={0.8}
              />
              <Bar 
                yAxisId="right"
                dataKey="daily_discharge_mwh"
                name="Daily Discharge"
                fill="#dc2626"
                opacity={0.8}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="cumulative_charge_mwh"
                name="Cumulative Charge"
                stroke="#4f46e5"
                dot={false}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="cumulative_discharge_mwh"
                name="Cumulative Discharge"
                stroke="#dc2626"
                dot={false}
              />
              <Brush 
                dataKey="date"
                height={30}
                stroke="#4f46e5"
                fill="#1c1e24"
                startIndex={0}
                endIndex={formattedData.length - 1}
                travellerWidth={10}
                strokeWidth={1}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}