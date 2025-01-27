'use client'

import React, { useState, useMemo } from 'react'
import { Card } from "../ui/card"
import { PieChart, Pie, Cell, Sector, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LabelList } from 'recharts'
import { settlementComponentData } from '../../context/total-pnl-by-settlement-code'
import { SettlementCodeColorMap, SettlementCode } from '../../utils/SettlementCodeColorMap'

interface TotalPnLBySettlementCodePieChartProps {
  cardBg: string;
}

const formatValue = (value: number) => {
  const absValue = Math.abs(value);
  const formattedValue = `$${(absValue / 1000000).toFixed(1)}M`;
  return value < 0 ? `-${formattedValue}` : formattedValue;
};

const calculatePercentage = (value: number, total: number) => {
  return (Math.abs(value) / total * 100).toFixed(2);
};

export default function TotalPnLBySettlementCodePieChart({ cardBg }: TotalPnLBySettlementCodePieChartProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  // Calculate total absolute value for percentage calculations
  const totalAbsoluteValue = useMemo(() => {
    return settlementComponentData.reduce((sum, item) => sum + Math.abs(item.value), 0);
  }, []);

  // Sort data by absolute value in descending order and prepare for visualization
  const sortedData = useMemo(() => {
    return [...settlementComponentData]
      .sort((a, b) => (b.value) - (a.value))
      .map(item => ({
        ...item,
        absoluteValue: Math.abs(item.value),
        originalValue: item.value,
        percentage: calculatePercentage(item.value, totalAbsoluteValue)
      }));
  }, [totalAbsoluteValue]);

  // Transform data for the bar chart
  const barChartData = useMemo(() => {
    return sortedData.map(item => ({
      component: item.component,
      value: item.originalValue,
      formattedValue: formatValue(item.originalValue),
      color: item.color
    }));
  }, [sortedData]);

  return (
    <Card className={`p-6 border-0 mb-4`} style={{ backgroundColor: cardBg }}>
      <div className="flex flex-col lg:flex-row">
        {/* Bar Chart */}
        <div className="w-full lg:w-1/2 pr-0 lg:pr-4 mb-4 lg:mb-0 min-h-[400px]">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={barChartData}
              layout="vertical"
              margin={{ top: 20, right: 80, bottom: 20, left: 180 }}
            >
              <XAxis 
                type="number"
                stroke="#fcfcfc"
                tick={{ fill: '#fcfcfc' }}
                tickFormatter={formatValue}
                hide={true}
              />
              <YAxis
                type="category"
                dataKey="component"
                stroke="#fcfcfc"
                tick={false}
                width={0}
              />
              <Bar 
                dataKey="value"
                radius={[0, 4, 4, 0]}
                onMouseEnter={(data, index) => {
                  setHoveredComponent(data.component);
                  setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  setHoveredComponent(null);
                  setActiveIndex(-1);
                }}
              >
                {barChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={hoveredComponent && entry.component !== hoveredComponent ? 0.3 : 1}
                  />
                ))}
                <LabelList
                  dataKey="component"
                  position="left"
                  fill="#fcfcfc"
                  fontSize={12}
                  offset={5}
                />
                <LabelList
                  dataKey="formattedValue"
                  position="right"
                  fill="#fcfcfc"
                  fontSize={12}
                  offset={5}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={sortedData}
                dataKey="absoluteValue"
                nameKey="component"
                cx="50%"
                cy="50%"
                outerRadius={160}
                innerRadius={120}
                fill="#8884d8"
                activeIndex={activeIndex}
                onMouseEnter={(data, index) => {
                  setHoveredComponent(data.component);
                  setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  setHoveredComponent(null);
                  setActiveIndex(-1);
                }}
                onClick={(data) => {
                  const index = sortedData.findIndex(item => item.component === data.component);
                  setActiveIndex(index === activeIndex ? -1 : index);
                }}
                activeShape={(props) => {
                  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
                  return (
                    <g>
                      <text x={cx} y={cy} dy={-20} textAnchor="middle" fill={fill} fontSize="16px" fontWeight="bold">
                        {payload.component}
                      </text>
                      <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#fcfcfc" fontSize="14px">
                        {formatValue(payload.originalValue)}
                      </text>
                      <text x={cx} y={cy} dy={30} textAnchor="middle" fill="#fcfcfc" fontSize="14px">
                        {`(${payload.percentage}%)`}
                      </text>
                      <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                      />
                      <Sector
                        cx={cx}
                        cy={cy}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        innerRadius={outerRadius + 6}
                        outerRadius={outerRadius + 10}
                        fill={fill}
                      />
                    </g>
                  );
                }}
              >
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    opacity={hoveredComponent && entry.component !== hoveredComponent ? 0.3 : 1}
                    stroke={cardBg}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}