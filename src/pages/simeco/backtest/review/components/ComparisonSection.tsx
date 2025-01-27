{/* Copy contents of src/components/sections/ComparisonSection.tsx */}
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs"
import { Card } from "../../../../../components/ui/card"
import CumulativePnLComparisonChart from '../../../../../components/charts/CumulativePnLComparisonChart'
import BenchmarkTotalPnLCard from '../../../../../components/charts/BenchmarkTotalPnLCard'
import TotalPnlBySettlementCodeComparisonChart from '../../../../../components/charts/TotalPnlBySettlementCodeComparisonChart'
import MonthlyPnLComparisonChart from '../../../../../components/charts/MonthlyPnLComparisonChart'

interface ComparisonSectionProps {
  cardBg?: string;
}

export default function ComparisonSection({ cardBg = "#393743" }: ComparisonSectionProps) {
  return (
    <Tabs defaultValue="revenue" className="w-full">
      <div className="mb-4 text-[#fcfcfc] font-medium">
        For Operating Days 2024-01-02 to 2024-11-07
      </div>
      <TabsList className="grid w-full grid-cols-3 bg-[#1c1e24]">
        <TabsTrigger 
          value="revenue" 
          className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
        >
          Total PnL
        </TabsTrigger>
        <TabsTrigger 
          value="monthly" 
          className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
        >
          Monthly PnL
        </TabsTrigger>
        <TabsTrigger 
          value="cumulative" 
          className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
        >
          Daily PnL
        </TabsTrigger>
      </TabsList>
      <TabsContent value="revenue">
        <div className="space-y-4">
          <Card className={`p-6 border-0`} style={{ backgroundColor: cardBg }}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#fcfcfc]">Total PnL Comparison</h3>
              <BenchmarkTotalPnLCard />
            </div>
          </Card>
          
          <Card className={`p-6 border-0`} style={{ backgroundColor: cardBg }}>
            <div className="flex flex-col lg:flex-row gap-4">
              <TotalPnlBySettlementCodeComparisonChart cardBg={cardBg} layout="horizontal" />
            </div>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="monthly">
        <MonthlyPnLComparisonChart cardBg={cardBg} />
      </TabsContent>
      <TabsContent value="cumulative">
        <CumulativePnLComparisonChart cardBg={cardBg} />
      </TabsContent>
    </Tabs>
  );
}