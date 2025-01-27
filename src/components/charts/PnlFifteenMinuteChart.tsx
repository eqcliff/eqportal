import React, { useState, useMemo } from "react"
import { Card, CardContent } from "../ui/card"
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  ReferenceLine,
  ComposedChart,
} from "recharts"
import { SettlementCodeColorMap } from "../../utils/SettlementCodeColorMap"
import { hourlySimulatedSettlementsPnLData } from "../../data/simulatedSettlementsPnLData"
import { cumulativePnlFifteenMinData } from "../../data/cumulativePnlFifteenMinData"

const components = [
  { key: "da_ecrs", color: SettlementCodeColorMap["ECRS"], label: "DA ECRS" },
  { key: "da_regup", color: SettlementCodeColorMap["Reg Up"], label: "DA Reg Up" },
  { key: "da_regdown", color: SettlementCodeColorMap["Reg Down"], label: "DA Reg Down" },
  { key: "da_energy", color: SettlementCodeColorMap["DA Energy"], label: "DA Energy" },
  { key: "da_nonspin", color: SettlementCodeColorMap["Non Spin"], label: "DA Non-Spin" },
  { key: "da_rrs", color: SettlementCodeColorMap["RRS"], label: "DA RRS" },
  { key: "rt_energy_imbalance", color: SettlementCodeColorMap["RT Energy Imbalance"], label: "RT Energy Imbalance" },
  {
    key: "rt_reliablity_deployment_as_imbalance",
    color: SettlementCodeColorMap["RT Reliability Deployment AS Imbalance"],
    label: "RT Reliability Deployment AS Imbalance",
  },
  { key: "rt_as_imbalance", color: SettlementCodeColorMap["RT AS Imbalance"], label: "RT AS Imbalance" },
]

interface PnlFifteenMinuteChartProps {
  className?: string
}

export default function PnlFifteenMinuteChart({ className }: PnlFifteenMinuteChartProps) {
  const [hoveredInterval, setHoveredInterval] = useState<string | null>(null)

  const processedData = useMemo(() => {
    return hourlySimulatedSettlementsPnLData.map((hour) => {
      const time = new Date(hour.operating_dt)
      return {
        ...hour,
        operating_dt: time.toISOString(),
        ...components.reduce(
          (acc, component) => ({
            ...acc,
            [component.key]: hour[component.key],
          }),
          {},
        ),
        total: components.reduce((sum, component) => sum + hour[component.key], 0),
      }
    })
  }, [])

  const formatXAxis = (time: string) => {
    const date = new Date(time)
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
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
              setHoveredInterval(state.activeLabel)
            }
          }}
          onMouseLeave={() => {
            setHoveredInterval(null)
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} stroke="#e2e8f0/10" />
          <XAxis
            dataKey="operating_dt"
            stroke="#fcfcfc"
            tick={{ fill: "#fcfcfc", fontSize: 12 }}
            tickFormatter={formatXAxis}
            interval={0}
            ticks={[
              new Date("2024-01-15T03:00:00").toISOString(),
              new Date("2024-01-15T06:00:00").toISOString(),
              new Date("2024-01-15T09:00:00").toISOString(),
              new Date("2024-01-15T12:00:00").toISOString(),
              new Date("2024-01-15T15:00:00").toISOString(),
              new Date("2024-01-15T18:00:00").toISOString(),
              new Date("2024-01-15T21:00:00").toISOString(),
              new Date("2024-01-16T00:00:00").toISOString(),
            ]}
          />
          <YAxis
            hide
            stroke="#fcfcfc"
            tick={{ fill: "#fcfcfc", fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0)

                return (
                  <div
                    className="custom-tooltip"
                    style={{
                      backgroundColor: "#1c1e24",
                      padding: "12px",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      width: "300px",
                    }}
                  >
                    <p
                      className="label"
                      style={{ color: "#fcfcfc", fontWeight: "bold", marginBottom: "8px", fontSize: "14px" }}
                    >
                      {`Interval-Ending: ${formatXAxis(label)}`}
                    </p>
                    <p
                      style={{
                        color: "#fcfcfc",
                        fontWeight: "bold",
                        borderBottom: "1px solid #666",
                        paddingBottom: "4px",
                        marginBottom: "8px",
                      }}
                    >
                      Total PnL: $
                      {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto auto",
                        gap: "4px 16px",
                        fontSize: "12px",
                      }}
                    >
                      {payload.map((entry, index) => (
                        <React.Fragment key={`item-${index}`}>
                          <div style={{ color: entry.color }}>{entry.name}:</div>
                          <div
                            style={{
                              color: entry.color,
                              textAlign: "right",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            $
                            {(entry.value || 0).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                        </React.Fragment>
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
            <Bar key={component.key} dataKey={component.key} stackId="a" fill={component.color} name={component.label}>
              {processedData.map((entry) => (
                <Cell
                  key={`cell-${entry.operating_dt}`}
                  fill={component.color}
                  opacity={hoveredInterval === null || hoveredInterval === entry.operating_dt ? 1 : 0.3}
                />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}