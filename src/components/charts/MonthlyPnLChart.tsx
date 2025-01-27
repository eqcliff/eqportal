'use client'

import React, { useState, useMemo } from 'react'
import { Card } from "../ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList, ReferenceLine } from 'recharts'
import { SettlementCodeColorMap, SettlementCode } from '../../utils/SettlementCodeColorMap'
import { monthlyPnLData } from '../../context/monthly-pnl-data'

interface MonthlyPnLChartProps {
  cardBg: string;
}

const components = Object.entries(SettlementCodeColorMap).map(([key, color]) => ({
  key,
  color,
  label: key
}));

export default function MonthlyPnLChart({ cardBg }: MonthlyPnLChartProps) {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const processedData = useMemo(() => {
    return monthlyPnLData.map(month => {
      const result: { [key: string]: number } = { date: month.date };
      let positiveTotal = 0;
      let negativeTotal = 0;
      
      components.forEach(({ key }) => {
        if (key === 'RT Energy Imbalance') {
          result[key] = month[key] || 0;
          negativeTotal += result[key];
        } else {
          result[key] = month[key] || 0;
          positiveTotal += result[key];
        }
      });
      
      result.positiveTotal = positiveTotal;
      result.negativeTotal = negativeTotal;
      result.total = positiveTotal + negativeTotal;
      return result;
    });
  }, []);

  return (
    <Card className={`p-6 border-0 mb-4`} style={{ backgroundColor: cardBg }}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#fcfcfc]">Monthly PnL</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart 
            data={processedData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }} 
            stackOffset="sign"
            onMouseMove={(state) => {
              if (state.isTooltipActive) {
                setHoveredMonth(state.activeLabel);
              }
            }}
            onMouseLeave={() => {
              setHoveredMonth(null);
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
              tick={{ fill: '#fcfcfc' }}
              tickFormatter={(dateString) => {
                const [year, month] = dateString.split('-');
                const monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][parseInt(month) - 1];
                return `${monthAbbr}-${year.slice(2)}`;
              }}
            />
            <YAxis 
              hide={true}
              domain={[
                (dataMin) => Math.floor(dataMin * 1.1),
                (dataMax) => Math.ceil(dataMax * 1.05)
              ]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const [year, month] = label.split('-');
                  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                  const formattedDate = `${monthNames[parseInt(month) - 1]} ${year}`;
                  
                  const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);
                  
                  return (
                    <div className="custom-tooltip" style={{ 
                      backgroundColor: cardBg, 
                      padding: '12px', 
                      borderRadius: '4px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      maxWidth: '400px',
                      width: '100%'
                    }}>
                      <p className="label" style={{ color: '#fcfcfc', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
                        {formattedDate}
                      </p>
                      <p style={{ color: '#fcfcfc', fontWeight: 'bold', borderBottom: '1px solid #666', paddingBottom: '4px', marginBottom: '8px' }}>
                        Total PnL: ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {payload.map((entry, index) => (
                          <div 
                            key={`item-${index}`} 
                            style={{ 
                              color: entry.color,
                              display: 'flex',
                              justifyContent: 'space-between',
                              padding: '4px 0',
                              fontSize: '13px',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <span style={{ marginRight: '24px' }}>{entry.name}:</span>
                            <span>${(entry.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
              cursor={false}
              offset={80}
            />
            <Bar dataKey="RT Energy Imbalance" fill={SettlementCodeColorMap['RT Energy Imbalance']} stackId="stack">
              {processedData.map((entry) => (
                <Cell 
                  key={`cell-${entry.date}`}
                  fill={SettlementCodeColorMap['RT Energy Imbalance']}
                  opacity={hoveredMonth === null || hoveredMonth === entry.date ? 1 : 0.3}
                />
              ))}
            </Bar>
            {components.filter(component => component.key !== 'RT Energy Imbalance').map((component) => (
              <Bar 
                key={component.key} 
                dataKey={component.key} 
                stackId="stack"
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
            ))}
            <LabelList
              dataKey="total"
              position="top"
              fill="#fcfcfc"
              formatter={(value) => `$${(value / 1000000).toFixed(2)}M`}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}