'use client'

import React, { useState } from 'react'
import { Card } from "../ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from 'recharts'
import { totalPnlBySettlementCodeComparisonData } from '../../context/total-pnl-by-settlement-code-comparison-data'
import { SettlementCodeColorMap, SettlementCode } from '../../utils/SettlementCodeColorMap'

interface TotalPnlBySettlementCodeComparisonChartProps {
  cardBg?: string;
  layout?: 'vertical' | 'horizontal';
}

const formatCurrency = (value: number) => {
  if (value === 0) return '$0';
  const absValue = Math.abs(value);
  if (absValue >= 1000000) {
    return `${value < 0 ? '-' : ''}$${(absValue / 1000000).toFixed(2)}M`;
  }
  return `${value < 0 ? '-' : ''}$${(absValue / 1000).toFixed(2)}K`;
};

export default function TotalPnlBySettlementCodeComparisonChart({ cardBg = "#393743", layout = 'vertical' }: TotalPnlBySettlementCodeComparisonChartProps) {
  const [hoveredSettlement, setHoveredSettlement] = useState<string | null>(null);
  const data = totalPnlBySettlementCodeComparisonData.map(item => ({
    Component: item.Component,
    Actuals: item.Actuals,
    Backtest: item.Backtest,
    PerfectForesight: item.PerfectForesight,
    Color: item.Color
  }));

  const totalActuals = data.reduce((sum, item) => sum + item.Actuals, 0);
  const totalBacktest = data.reduce((sum, item) => sum + item.Backtest, 0);
  const totalPerfectForesight = data.reduce((sum, item) => sum + item.PerfectForesight, 0);

  return (
    <div className={`space-y-4 ${layout === 'horizontal' ? 'flex flex-col lg:flex-row gap-4' : ''}`}>
      <div className={layout === 'horizontal' ? 'w-full lg:w-2/3' : 'w-full'}>
        <h3 className="text-lg font-medium text-[#fcfcfc] mb-4">Total PnL by Settlement Code Comparison</h3>
        <div className="h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 40, bottom: 20, left: 0 }}
              barGap={40}
              barCategoryGap={40}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0/10" />
              <XAxis 
                type="number"
                stroke="#fcfcfc"
                tick={{ fill: '#fcfcfc' }}
                tickFormatter={formatCurrency}
                tickCount={5}
                domain={[0, 'dataMax']}
                padding={{ left: 0, right: 10 }}
                hide={true}
              />
              <YAxis 
                dataKey="Component" 
                type="category" 
                width={120}
                axisLine={false}
                tickLine={false}
                tick={(props) => {
                  const { x, y, payload } = props;
                  const item = data.find(d => d.Component === payload.value);
                  const words = payload.value.split(' ');
                  return (
                    <g transform={`translate(${x},${y})`}>
                      {words.map((word, index) => (
                        <text
                          key={index}
                          x={-5}
                          y={index * 12}
                          dy={4}
                          textAnchor="end"
                          fill={item?.Color}
                          fontSize={12}
                        >
                          {word}
                        </text>
                      ))}
                    </g>
                  );
                }}
              />
              {['Actuals', 'Backtest', 'PerfectForesight'].map((dataKey) => (
                <Bar 
                  key={dataKey}
                  dataKey={dataKey} 
                  name={dataKey} 
                  fill={dataKey === 'Actuals' ? "#cfcfaa" : dataKey === 'Backtest' ? "#5ee5d4" : "#f4f5ac"}
                  barSize={20}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={dataKey === 'Actuals' ? "#cfcfaa" : dataKey === 'Backtest' ? "#5ee5d4" : "#f4f5ac"}
                      opacity={hoveredSettlement === null || hoveredSettlement === entry.Component ? 1 : 0.2}
                      onMouseEnter={() => setHoveredSettlement(entry.Component)}
                      onMouseLeave={() => setHoveredSettlement(null)}
                    />
                  ))}
                  <LabelList
                    dataKey={dataKey}
                    position="right"
                    content={(props) => {
                      const { x, y, width, height, value, index } = props;
                      const shouldShow = hoveredSettlement === data[index]?.Component;
                      if (!shouldShow) return null;
                      return (
                        <text
                          x={x + width + 5}
                          y={y + height / 2}
                          fill={data[index]?.Color}
                          textAnchor="start"
                          dominantBaseline="middle"
                          fontSize={10}
                        >
                          {formatCurrency(value as number)}
                        </text>
                      );
                    }}
                  />
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={layout === 'horizontal' ? 'w-full lg:w-1/3' : 'w-full'}>
        <div className="bg-[#2a2b36] rounded-lg p-4 overflow-x-auto h-full">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-sm font-medium text-[#fcfcfc] py-2">Settlement Code</th>
                <th className="text-right text-sm font-medium text-[#fcfcfc] py-2">Actuals</th>
                <th className="text-right text-sm font-medium text-[#fcfcfc] py-2">Backtest</th>
                <th className="text-right text-sm font-medium text-[#fcfcfc] py-2">Perfect Foresight</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr 
                  key={index}
                  style={{
                    opacity: hoveredSettlement === null || hoveredSettlement === item.Component ? 1 : 0.2,
                    transition: 'opacity 0.3s'
                  }}
                >
                  <td className="py-2">
                    <span className="text-sm" style={{ color: item.Color }}>{item.Component}</span>
                  </td>
                  <td className="text-right text-sm" style={{ color: item.Color }}>{formatCurrency(item.Actuals)}</td>
                  <td className="text-right text-sm" style={{ color: item.Color }}>{formatCurrency(item.Backtest)}</td>
                  <td className="text-right text-sm" style={{ color: item.Color }}>{formatCurrency(item.PerfectForesight)}</td>
                </tr>
              ))}
              <tr className="border-t border-gray-600">
                <td className="py-2 text-sm font-medium text-[#fcfcfc]">Total</td>
                <td className="text-right text-sm font-medium text-[#fcfcfc]">{formatCurrency(totalActuals)}</td>
                <td className="text-right text-sm font-medium text-[#fcfcfc]">{formatCurrency(totalBacktest)}</td>
                <td className="text-right text-sm font-medium text-[#fcfcfc]">{formatCurrency(totalPerfectForesight)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}