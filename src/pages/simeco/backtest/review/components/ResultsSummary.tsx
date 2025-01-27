{/* Copy contents of src/components/sections/ResultsSummary.tsx */}
import React from "react"
import { Card } from "../../../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs"
import { ErrorBoundary } from "react-error-boundary"
import CumulativePnLChart from '../../../../../components/charts/CumulativePnLChart'
import ChargeDischargeCyclesChart from '../../../../../components/charts/ChargeDischargeCyclesChart'
import FiveMinPriceActualsChart from '../../../../../components/charts/FiveMinPriceActualsChart'
import SixtyMinPriceActualsChart from '../../../../../components/charts/SixtyMinPriceActualsChart'
import { SettlementCodeColorMap } from "../../../../../utils/SettlementCodeColorMap"
import MonthlyPnLChart from '../../../../../components/charts/MonthlyPnLChart'
import TotalPnLBySettlementCodePieChart from '../../../../../components/charts/TotalPnLBySettlementCodePieChart'
import DailyStateOfEnergyChart from '../../../../../components/charts/DailyStateOfEnergyChart'
import PnlFifteenMinuteChart from '../../../../../components/charts/PnlFifteenMinuteChart'

interface ResultsSummaryProps {
  className?: string
  cardBg?: string
}

const quarterlyData = [
  { quarter: "Q1", pnl: 8.779, dischargeCycles: 369.1 },
  { quarter: "Q2", pnl: 10.41, dischargeCycles: 280.9 },
  { quarter: "Q3", pnl: 4.775, dischargeCycles: 276.8 },
  { quarter: "Q4", pnl: 4.118, dischargeCycles: 280.2 },
]

const colors = Object.values(SettlementCodeColorMap)

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  )
}

export default function ResultsSummary({ className = "", cardBg = "#393743" }: ResultsSummaryProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Tabs defaultValue="financial" className="w-full">
        <div className="mb-4 text-[#fcfcfc] font-medium">For Operating Days 2024-01-02 to 2024-12-29</div>
        <TabsList className="grid w-full grid-cols-3 bg-[#1c1e24]">
          <TabsTrigger
            value="financial"
            className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
          >
            Financial
          </TabsTrigger>
          <TabsTrigger
            value="energy"
            className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
          >
            Energy
          </TabsTrigger>
          <TabsTrigger
            value="market"
            className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
          >
            Market
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className={`p-6 border-0`} style={{ backgroundColor: cardBg }}>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-[#fcfcfc]">Total PnL</h3>
                <p className="text-2xl font-medium text-[#fcfcfc]">$17,542,355.08</p>
              </div>
            </Card>
            <Card className={`p-6 border-0`} style={{ backgroundColor: cardBg }}>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-[#fcfcfc]">Avg Daily PnL</h3>
                <p className="text-2xl font-medium text-[#fcfcfc]">$48,326.05</p>
              </div>
            </Card>
          </div>

          <Card className={`p-6 border-0 mb-4`} style={{ backgroundColor: cardBg }}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#fcfcfc]">Total PnL by Settlement Code</h3>
              <TotalPnLBySettlementCodePieChart cardBg={cardBg} />
            </div>
          </Card>

          <MonthlyPnLChart cardBg={cardBg} />

          <Card className={`p-6 border-0 mb-4`} style={{ backgroundColor: cardBg }}>
            <CumulativePnLChart cardBg={cardBg} />
          </Card>
        </TabsContent>

        <TabsContent value="energy" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className={`p-6 border-0`} style={{ backgroundColor: cardBg }}>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-[#fcfcfc]">Total Energy Discharged</h3>
                <p className="text-2xl font-medium text-[#fcfcfc]">62,425.11 MWh</p>
              </div>
            </Card>
            <Card className={`p-6 border-0`} style={{ backgroundColor: cardBg }}>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-[#fcfcfc]">Avg Daily Discharge Cycles Used</h3>
                <p className="text-2xl font-medium text-[#fcfcfc]">171.97 MWh</p>
              </div>
            </Card>
          </div>
          <ChargeDischargeCyclesChart cardBg={cardBg} />
          <DailyStateOfEnergyChart cardBg={cardBg} />
        </TabsContent>

        <TabsContent value="market">
          <PnlFifteenMinuteChart />
        </TabsContent>

        <TabsContent value="market">
          <SixtyMinPriceActualsChart cardBg="#393743" />
        </TabsContent>
      </Tabs>
    </ErrorBoundary>
  )
}