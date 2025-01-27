'use client'

import React, { useState, useMemo } from "react"
import { Card } from "../ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  ReferenceLine,
} from "recharts"
import { SettlementCodeColorMap, SettlementCode } from "../../utils/SettlementCodeColorMap"
import { monthlyPnLComparisonData } from "../../context/monthly-pnl-comparison-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface MonthlyPnLComparisonChartProps {
  cardBg?: string
}

const components = Object.entries(SettlementCodeColorMap).map(([key, color]) => ({
  key,
  color,
  label: key,
}))

export default function MonthlyPnLComparisonChart({ cardBg = "#393743" }: MonthlyPnLComparisonChartProps) {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string>("all")
  const [selectedMonthData, setSelectedMonthData] = useState<any>(null)

  const processedData = useMemo(() => {
    const dataByMonth = monthlyPnLComparisonData.reduce(
      (acc, curr) => {
        if (!acc[curr.date]) {
          acc[curr.date] = { date: curr.date }
        }
        components.forEach((component) => {
          acc[curr.date][`${curr.Type}_${component.key}`] = curr[component.key]
        })
        acc[curr.date][`${curr.Type}_Total`] = Object.entries(curr).reduce((sum, [key, value]) => {
          if (key !== "date" && key !== "Type") {
            sum += Number.parseFloat(value as string)
          }
          return sum
        }, 0)
        return acc
      },
      {} as Record<string, any>,
    )

    return Object.values(dataByMonth)
  }, [monthlyPnLComparisonData])

  const filteredData = useMemo(() => {
    if (selectedMonth === "all") return processedData
    return processedData.filter((item) => item.date === selectedMonth)
  }, [processedData, selectedMonth])

  const handleMonthSelect = (value: string) => {
    setSelectedMonth(value)
    if (value !== "all") {
      const monthData = processedData.find((item) => item.date === value)
      setSelectedMonthData(monthData)
    } else {
      setSelectedMonthData(null)
    }
  }

  const formatValue = (value: number) => {
    return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
  }

  return (
    <Card className={`p-6 border-0 mb-4`} style={{ backgroundColor: cardBg }}>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-[#fcfcfc]">Monthly PnL Comparison</h3>
          <Select defaultValue="all" onValueChange={handleMonthSelect}>
            <SelectTrigger className="w-[180px] bg-[#2a2b36] text-[#fcfcfc] border-[#3f3f4d] [&_[data-state=placeholder]]:text-[#fcfcfc]">
              <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2b36] text-[#fcfcfc] border-[#3f3f4d] [&_[data-state=active]]:bg-[#3f3f4d]">
              <SelectItem
                value="all"
                className="hover:bg-[#3f3f4d] hover:text-[#ecde65] hover:border-b hover:border-[#ecde65] data-[highlighted]:bg-[#3f3f4d] data-[highlighted]:text-[#ecde65]"
              >
                All Months
              </SelectItem>
              {processedData.map((item) => {
                const [year, month] = item.date.split("-")
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                const formattedDate = `${monthNames[Number.parseInt(month) - 1]}-${year}`
                return (
                  <SelectItem key={item.date} value={item.date} className="hover:bg-[#3f3f4d] hover:text-[#ecde65]">
                    {formattedDate}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
        <div className={`space-y-4 ${selectedMonth !== "all" ? "flex" : ""}`}>
          <div className={selectedMonth !== "all" ? "w-1/2" : "w-full"}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                stackOffset="sign"
                onMouseMove={(state) => {
                  if (state.isTooltipActive) {
                    setHoveredMonth(state.activeLabel)
                  }
                }}
                onMouseLeave={() => {
                  setHoveredMonth(null)
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  horizontal={true}
                  stroke="#e2e8f0/10"
                  horizontalPoints={[0]}
                />
                <ReferenceLine y={0} stroke="#fcfcfc" strokeOpacity={0.5} />
                <XAxis
                  dataKey="date"
                  stroke="#fcfcfc"
                  axisLine={{ stroke: cardBg }}
                  tickLine={{ stroke: cardBg }}
                  height={30}
                  tick={{ fill: "#fcfcfc" }}
                  tickFormatter={(dateString) => {
                    if (!dateString) return ""
                    const [year, month] = dateString.split("-")
                    const monthNames = [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ]
                    return `${monthNames[Number.parseInt(month) - 1]}-${year.slice(2)}`
                  }}
                />
                <YAxis
                  hide={true}
                  domain={[(dataMin) => Math.floor(dataMin * 1.1), (dataMax) => Math.ceil(dataMax * 1.05)]}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (selectedMonth !== "all") return null
                    if (active && payload && payload.length) {
                      const [year, month] = label.split("-")
                      const monthNames = [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ]
                      const formattedDate = `${monthNames[Number.parseInt(month) - 1]}-${year}`

                      const groupedData = components.map((component) => ({
                        name: component.key,
                        color: component.color,
                        actuals: payload.find((p) => p.dataKey === `Historical Actuals_${component.key}`)?.value || 0,
                        backtest: payload.find((p) => p.dataKey === `EQ Backtest_${component.key}`)?.value || 0,
                        perfectForesight:
                          payload.find((p) => p.dataKey === `Perfect Foresight_${component.key}`)?.value || 0,
                      }))

                      const totals = {
                        actuals: groupedData.reduce((sum, item) => sum + item.actuals, 0),
                        backtest: groupedData.reduce((sum, item) => sum + item.backtest, 0),
                        perfectForesight: groupedData.reduce((sum, item) => sum + item.perfectForesight, 0),
                      }

                      return (
                        <div
                          className="custom-tooltip"
                          style={{
                            backgroundColor: cardBg,
                            padding: "12px",
                            borderRadius: "4px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                            maxWidth: "600px",
                            width: "100%",
                          }}
                        >
                          <p
                            className="label"
                            style={{ color: "#fcfcfc", fontWeight: "bold", marginBottom: "8px", fontSize: "14px" }}
                          >
                            {formattedDate}
                          </p>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "2fr 1fr 1fr 1fr",
                              gap: "8px",
                              marginBottom: "8px",
                            }}
                          >
                            <div style={{ color: "#fcfcfc", fontWeight: "bold" }}>Settlement Code</div>
                            <div style={{ color: "#fcfcfc", fontWeight: "bold", textAlign: "right" }}>Actuals</div>
                            <div style={{ color: "#fcfcfc", fontWeight: "bold", textAlign: "right" }}>Backtest</div>
                            <div style={{ color: "#fcfcfc", fontWeight: "bold", textAlign: "right" }}>
                              Perfect Foresight
                            </div>
                          </div>
                          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                            {groupedData.map((item, index) => (
                              <div
                                key={index}
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "2fr 1fr 1fr 1fr",
                                  gap: "8px",
                                  color: item.color,
                                  padding: "4px 0",
                                  fontSize: "12px",
                                  borderBottom:
                                    index < groupedData.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                                }}
                              >
                                <div>{item.name}</div>
                                <div style={{ textAlign: "right" }}>{formatValue(item.actuals)}</div>
                                <div style={{ textAlign: "right" }}>{formatValue(item.backtest)}</div>
                                <div style={{ textAlign: "right" }}>{formatValue(item.perfectForesight)}</div>
                              </div>
                            ))}
                          </div>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "2fr 1fr 1fr 1fr",
                              gap: "8px",
                              color: "#fcfcfc",
                              fontWeight: "bold",
                              borderTop: "2px solid rgba(255,255,255,0.3)",
                              marginTop: "8px",
                              paddingTop: "8px",
                            }}
                          >
                            <div>Total</div>
                            <div style={{ textAlign: "right" }}>{formatValue(totals.actuals)}</div>
                            <div style={{ textAlign: "right" }}>{formatValue(totals.backtest)}</div>
                            <div style={{ textAlign: "right" }}>{formatValue(totals.perfectForesight)}</div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                  cursor={false}
                  offset={80}
                />
                {["Historical Actuals", "EQ Backtest", "Perfect Foresight"].map((type) =>
                  components.map((component) => (
                    <Bar
                      key={`${type}_${component.key}`}
                      dataKey={`${type}_${component.key}`}
                      stackId={type}
                      fill={component.color}
                    >
                      {processedData.map((entry) => (
                        <Cell
                          key={`cell-${entry.date}`}
                          fill={component.color}
                          opacity={hoveredMonth === null || hoveredMonth === entry.date ? 1 : 0.3}
                        />
                      ))}
                    </Bar>
                  )),
                )}
                <LabelList
                  dataKey="EQ Backtest_Total"
                  position="top"
                  fill="#fcfcfc"
                  formatter={(value) => `$${(value / 1000000).toFixed(2)}M`}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {selectedMonth !== "all" && selectedMonthData && (
            <div className="w-1/2 pl-4">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="text-sm font-medium text-[#fcfcfc] pb-2">Settlement Code</th>
                    <th className="text-sm font-medium text-[#fcfcfc] pb-2 text-right">Actuals</th>
                    <th className="text-sm font-medium text-[#fcfcfc] pb-2 text-right pl-4">Backtest</th>
                    <th className="text-sm font-medium text-[#fcfcfc] pb-2 text-right">Perfect Foresight</th>
                  </tr>
                </thead>
                <tbody>
                  {components.map((component) => (
                    <tr key={component.key}>
                      <td className="py-1 text-sm" style={{ color: component.color }}>
                        {component.key}
                      </td>
                      <td className="py-1 text-sm text-right" style={{ color: component.color }}>
                        {formatValue(selectedMonthData[`Historical Actuals_${component.key}`])}
                      </td>
                      <td className="py-1 text-sm text-right" style={{ color: component.color }}>
                        {formatValue(selectedMonthData[`EQ Backtest_${component.key}`])}
                      </td>
                      <td className="py-1 text-sm text-right" style={{ color: component.color }}>
                        {formatValue(selectedMonthData[`Perfect Foresight_${component.key}`])}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-600">
                    <td className="py-2 text-sm font-medium text-[#fcfcfc]">Total</td>
                    <td className="py-2 text-sm font-medium text-[#fcfcfc] text-right">
                      {formatValue(
                        components.reduce(
                          (sum, component) => sum + selectedMonthData[`Historical Actuals_${component.key}`],
                          0,
                        ),
                      )}
                    </td>
                    <td className="py-2 text-sm font-medium text-[#fcfcfc] text-right">
                      {formatValue(
                        components.reduce(
                          (sum, component) => sum + selectedMonthData[`EQ Backtest_${component.key}`],
                          0,
                        ),
                      )}
                    </td>
                    <td className="py-2 text-sm font-medium text-[#fcfcfc] text-right">
                      {formatValue(
                        components.reduce(
                          (sum, component) => sum + selectedMonthData[`Perfect Foresight_${component.key}`],
                          0,
                        ),
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}