import React, { useState, useMemo } from "react"
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList, ReferenceLine } from "recharts"
import { SettlementCodeColorMap } from "../../utils/SettlementCodeColorMap"
import { hourlySimulatedSettlementsPnLData } from "../../data/simulatedSettlementsPnLData"

const components = [
  { key: "da_ecrs", color: SettlementCodeColorMap["ECRS"], label: "DA ECRS" },
  { key: "da_regup", color: SettlementCodeColorMap["Reg Up"], label: "DA Reg Up" },
  { key: "da_regdown", color: SettlementCodeColorMap["Reg Down"], label: "DA Reg Down" },
  { key: "da_energy", color: SettlementCodeColorMap["DA Energy"], label: "DA Energy" },
  { key: "da_nonspin", color: SettlementCodeColorMap["Non Spin"], label: "DA Non-Spin" },
  { key: "da_rrs", color: SettlementCodeColorMap["RRS"], label: "DA RRS" },
  { key: "rt_energy_imbalance", color: SettlementCodeColorMap["RT Energy Imbalance"], label: "RT Energy Imbalance" },
  { key: "rt_reliablity_deployment_as_imbalance", color: SettlementCodeColorMap["RT Reliability Deployment AS Imbalance"], label: "RT Reliability Deployment AS Imbalance" },
  { key: "rt_as_imbalance", color: SettlementCodeColorMap["RT AS Imbalance"], label: "RT AS Imbalance" },
]

interface HourlyPnLChartProps {
  className?: string
}

export default function HourlyPnLChart({ className }: HourlyPnLChartProps) {
  const [hoveredHour, setHoveredHour] = useState<string | null>(null)

  const processedData = useMemo(() => {
    return hourlySimulatedSettlementsPnLData.map(hour => {
      const total = components.reduce((sum, component) => sum + hour[component.key], 0)
      return { ...hour, total }
    })
  }, [])

  const formatXAxis = (time: string) => {
    const hour = parseInt(time.split(" ")[1].split(":")[0])
    return hour % 3 === 0 ? `${hour}:00` : ""
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          stackOffset="sign"
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              setHoveredHour(state.activeLabel)
            }
          }}
          onMouseLeave={() => {
            setHoveredHour(null)
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            horizontal={true}
            stroke="#e2e8f0/10"
          />
          <XAxis
            dataKey="operating_dt"
            stroke="#fcfcfc"
            tick={{ fill: "#fcfcfc", fontSize: 12 }}
            tickFormatter={formatXAxis}
            interval={0}
          />
          <YAxis
            stroke="#fcfcfc"
            tick={{ fill: "#fcfcfc", fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0)
                
                return (
                  <div className="custom-tooltip" style={{ 
                    backgroundColor: "#1c1e24", 
                    padding: "12px", 
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    maxWidth: "300px",
                    width: "100%"
                  }}>
                    <p className="label" style={{ color: "#fcfcfc", fontWeight: "bold", marginBottom: "8px", fontSize: "14px" }}>
                      {formatXAxis(label)}
                    </p>
                    <p style={{ color: "#fcfcfc", fontWeight: "bold", borderBottom: "1px solid #666", paddingBottom: "4px", marginBottom: "8px" }}>
                      Total PnL: ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {payload.map((entry, index) => (
                        <div 
                          key={`item-${index}`} 
                          style={{ 
                            color: entry.color,
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "4px 0",
                            fontSize: "12px"
                          }}
                        >
                          <span style={{ marginRight: "24px" }}>{entry.name}:</span>
                          <span>${(entry.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
              return null
            }}
            cursor={false}
          />
          <ReferenceLine y={0} stroke="#fcfcfc" strokeOpacity={0.5} />
          {components.map((component) => (
            <Bar
              key={component.key}
              dataKey={component.key}
              stackId="a"
              fill={component.color}
              name={component.label}
            >
              {processedData.map((entry) => (
                <Cell
                  key={`cell-${entry.operating_dt}`}
                  fill={component.color}
                  opacity={hoveredHour === null || hoveredHour === entry.operating_dt ? 1 : 0.3}
                />
              ))}
            </Bar>
          ))}
          <Line
            type="monotone"
            dataKey="total"
            name="Total PnL"
            stroke="#f472b6"
            strokeWidth={2}
            dot={false}
          />
          <LabelList
            dataKey="total"
            position="top"
            fill="#fcfcfc"
            formatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}