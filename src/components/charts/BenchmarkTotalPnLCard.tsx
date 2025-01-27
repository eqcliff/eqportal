import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList, Cell } from "recharts"

const revenueComparisonData = [
  {
    name: "Historical Actuals",
    value: 11084806.51,
    color: "#cfcfaa" // Muted yellow
  },
  {
    name: "EQ Backcast",
    value: 16909874.99,
    color: "#5ee5d4" // Teal
  },
  {
    name: "Perfect Foresight",
    value: 19510569.21,
    color: "#f4f5ac" // Light yellow
  }
]

const formatYAxis = (value: number) => {
  return `$${(value / 1000000).toFixed(0)}M`
}

const calculatePercentUplift = (historical: number, backcast: number) => {
  return ((backcast - historical) / historical) * 100
}

const calculatePercentOfPerfectForesight = (backcast: number, perfectForesight: number) => {
  return (backcast / perfectForesight) * 100
}

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`
}

export default function BenchmarkTotalPnLCard() {
  const historicalValue = revenueComparisonData[0].value
  const backcastValue = revenueComparisonData[1].value
  const perfectForesightValue = revenueComparisonData[2].value

  const percentUplift = formatPercentage(calculatePercentUplift(historicalValue, backcastValue))
  const percentOfPerfectForesight = formatPercentage(calculatePercentOfPerfectForesight(backcastValue, perfectForesightValue))

  return (
    <div className="w-full flex">
      <div className="w-4/5">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart 
            layout="vertical"
            data={revenueComparisonData}
            margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid 
              horizontal={false} 
              vertical={true} 
              stroke="#e2e8f0/10" 
            />
            <YAxis 
              dataKey="name" 
              type="category"
              hide={true}
            />
            <XAxis 
              type="number"
              stroke="#fcfcfc"
              tickFormatter={formatYAxis}
              tick={false}
              axisLine={false}
              tickLine={false}
            />
            <Bar 
              dataKey="value" 
              radius={[0, 4, 4, 0]}
              barSize={40}
            >
              {revenueComparisonData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList
                content={(props) => {
                  const { x, y, width, value, index } = props
                  const name = revenueComparisonData[index].name
                  const formattedValue = `$${(revenueComparisonData[index].value / 1000000).toFixed(1)}M`
                  return (
                    <g>
                      <text x={x + 5} y={y + 20} fill="#121212" textAnchor="start" fontSize="12">
                        {name}
                      </text>
                      <text x={x + width - 5} y={y + 20} fill="#121212" textAnchor="end" fontSize="12">
                        {formattedValue}
                      </text>
                    </g>
                  )
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="w-1/5 flex flex-col justify-center items-end pr-4">
        <div className="mb-4">
          <p className="text-sm font-medium text-[#fcfcfc] text-right">EQ vs Actuals Percent Uplift</p>
          <p className="text-lg font-bold text-[#fcfcfc] text-right">{percentUplift}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-[#fcfcfc] text-right">Percent of Perfect Foresight</p>
          <p className="text-lg font-bold text-[#fcfcfc] text-right">{percentOfPerfectForesight}</p>
        </div>
      </div>
    </div>
  )
}