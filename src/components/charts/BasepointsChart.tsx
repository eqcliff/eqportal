import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceArea } from "recharts"

// Generate basepoint data
const generateBasepointData = () => {
  const data = []
  const intervals = 288 // 24 hours * 12 (5-minute intervals per hour)
  
  let basepoint = 0
  let lastChange = 0
  
  for (let i = 0; i < intervals; i++) {
    const hour = Math.floor(i / 12)
    const minute = (i % 12) * 5
    const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
    
    // Change basepoint values periodically
    if (i - lastChange > 24) { // Change roughly every 2 hours
      basepoint = Math.floor(Math.random() * 140 - 70) // Random value between -70 and 70
      lastChange = i
    }
    
    // Add some deviations
    const hasDeviation = Math.random() < 0.02 // 2% chance of deviation
    const deviation = hasDeviation ? basepoint + (Math.random() * 20 - 10) : null
    
    // Generate other series with slight variations
    const clearedBasepoint = Math.random() < 0.1 ? basepoint + (Math.random() * 10 - 5) : null
    const updatedDesiredBasepoint = basepoint + (Math.random() * 6 - 3)
    const orderGeneratorPredicted = Math.random() < 0.1 ? basepoint + (Math.random() * 8 - 4) : null
    
    // Highlight period (4:00-5:00)
    const isHighlightPeriod = hour === 4
    
    data.push({
      time,
      basepoint,
      clearedBasepoint,
      updatedDesiredBasepoint,
      orderGeneratorPredicted,
      deviation,
      isHighlightPeriod
    })
  }
  
  return data
}

const basepointData = generateBasepointData()

interface BasepointsChartProps {
  className?: string
}

export default function BasepointsChart({ className }: BasepointsChartProps) {
  // Find highlight period boundaries
  const highlightStart = basepointData.findIndex(d => d.isHighlightPeriod)
  const highlightEnd = basepointData.findIndex((d, i) => i > highlightStart && !d.isHighlightPeriod)

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={basepointData}
          margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0/10" vertical={false} />
          <XAxis 
            dataKey="time"
            stroke="#fcfcfc"
            tick={{ fill: "#fcfcfc", fontSize: 12 }}
            interval={23}  // Show every 2 hours
            tickSize={8}
            tickMargin={8}
            axisLine={{ stroke: "#fcfcfc", strokeOpacity: 0.2 }}
            label={{ 
              value: "Datetime Central",
              position: "bottom",
              offset: 20,
              fill: "#fcfcfc"
            }}
          />
          <YAxis
            stroke="#fcfcfc"
            tick={{ fill: "#fcfcfc", fontSize: 12 }}
            tickSize={8}
            tickMargin={8}
            axisLine={{ stroke: "#fcfcfc", strokeOpacity: 0.2 }}
            domain={[-100, 100]}
            label={{ 
              value: "MW",
              angle: -90,
              position: "insideLeft",
              offset: 0,
              fill: "#fcfcfc"
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1c1e24",
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }}
            labelStyle={{ color: "#fcfcfc" }}
            itemStyle={{ color: "#fcfcfc" }}
            formatter={(value: number | null) => value !== null ? [`${value.toFixed(2)} MW`, ""] : ["N/A", ""]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{
              paddingTop: "20px",
              paddingBottom: "10px"
            }}
          />
          {/* Highlight Period */}
          <ReferenceArea
            x1={basepointData[highlightStart]?.time}
            x2={basepointData[highlightEnd - 1]?.time}
            fill="#22c55e"
            fillOpacity={0.1}
          />
          <Line
            type="stepAfter"
            dataKey="basepoint"
            name="BASEPOINT"
            stroke="#60a5fa"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="stepAfter"
            dataKey="clearedBasepoint"
            name="CLEARED_BASEPOINT"
            stroke="#f97316"
            dot={{ fill: "#f97316", r: 4 }}
            strokeWidth={0}
          />
          <Line
            type="stepAfter"
            dataKey="updatedDesiredBasepoint"
            name="UPDATED_DESIRED_BASEPOINT"
            stroke="#22c55e"
            strokeDasharray="3 3"
            dot={false}
            strokeWidth={1}
          />
          <Line
            type="stepAfter"
            dataKey="orderGeneratorPredicted"
            name="ORDER_GENERATOR_PREDICTED_BASEPOINT"
            stroke="#a855f7"
            dot={{ fill: "#a855f7", r: 4 }}
            strokeWidth={0}
          />
          <Line
            type="stepAfter"
            dataKey="deviation"
            name="DEVIATIONS"
            stroke="#ef4444"
            dot={{ fill: "#ef4444", r: 4, symbol: "cross" }}
            strokeWidth={0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}