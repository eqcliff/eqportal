import React from 'react'
import { Card } from '../ui/card'

interface SixtyMinPriceActualsChartProps {
  cardBg?: string;
}

const SixtyMinPriceActualsChart: React.FC<SixtyMinPriceActualsChartProps> = ({ cardBg }) => {
  return (
    <Card className={`p-6 border-0`} style={{ backgroundColor: cardBg }}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#fcfcfc]">60-Minute Price Actuals</h3>
        <div className="h-[400px] flex items-center justify-center text-[#fcfcfc]">
          Chart will be implemented here...
        </div>
      </div>
    </Card>
  )
}

export default SixtyMinPriceActualsChart