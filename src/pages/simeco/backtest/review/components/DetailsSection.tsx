import type React from "react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs"
import { Card, CardContent } from "../../../../../components/ui/card"
import CumulativePnLChart from "../../../../../components/charts/CumulativePnLChart"
import ChargeDischargeCyclesChart from "../../../../../components/charts/ChargeDischargeCyclesChart"
import StateOfEnergyChart from "../../../../../components/charts/StateOfEnergyChart"
import FiveMinPriceActualsChart from "../../../../../components/charts/FiveMinPriceActualsChart"
import SixtyMinPriceActualsChart from "../../../../../components/charts/SixtyMinPriceActualsChart"
import TimeController from "../../../../../components/controls/TimeController"
import DAStageChart from "../../../../../components/charts/DAStageChart"
import DALimitsChart from "../../../../../components/charts/DALimitsChart"
import DABidsOffersChart from "../../../../../components/charts/DABidsOffersChart"
import DASoCProjectionChart from "../../../../../components/charts/DASoCProjectionChart"
import DAASBlocks from "../../../../../components/charts/DAASBlocks"
import DAEconomicCurves from "../../../../../components/charts/DAEconomicCurves"
import DAPriceActualsChart from "../../../../../components/charts/DAPriceActualsChart"
import StubbedDAMAwardsChart from "../../../../../components/charts/StubbedDAMAwardsChart"
import ASDeploymentsChart from "../../../../../components/charts/ASDeploymentsChart"
import SimulatedSocChart from "../../../../../components/charts/SimulatedSocChart"
import HourlyPnLChart from "../../../../../components/charts/HourlyPnLChart"
import BasepointsChart from "../../../../../components/charts/BasepointsChart"
import CumulativePnlFifteenMinChart from "../../../../../components/charts/CumulativePnlFifteenMinChart"
import PnlFifteenMinuteChart from "../../../../../components/charts/PnlFifteenMinuteChart"
import DAStageTimeController from "../../../../../components/controls/DAStageTimeController"
import { TimeIntervalProvider } from "../../../../../context/TimeIntervalContext"

interface DetailsSectionProps {
  cardBg: string
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ cardBg }) => {
  return (
    <TimeIntervalProvider>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="date-select" className="text-[#fcfcfc] font-medium">
            Operating Date:
          </label>
          <span className="text-[#fcfcfc]">2024-01-15</span>
        </div>
        <Tabs defaultValue="da-stage" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-[#1c1e24]">
            <TabsTrigger
              value="da-stage"
              className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
            >
              DA Stage
            </TabsTrigger>
            <TabsTrigger
              value="simulated-da-results"
              className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
            >
              Simulated DA Results
            </TabsTrigger>
            <TabsTrigger
              value="rt-stage"
              className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
            >
              RT Stage
            </TabsTrigger>
            <TabsTrigger
              value="simulated-rt-results"
              className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
            >
              Simulated RT Results
            </TabsTrigger>
            <TabsTrigger
              value="simulated-settlements"
              className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
            >
              Simulated Settlements
            </TabsTrigger>
          </TabsList>
          <TabsContent value="da-stage">
            <div className="grid grid-cols-1 gap-4">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-0" style={{ backgroundColor: cardBg }}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">DA-Stage Price Forecasts</h3>
                    <DAStageChart />
                  </CardContent>
                </Card>
                <Card className="border-0" style={{ backgroundColor: cardBg }}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">DA Limits</h3>
                    <DALimitsChart />
                  </CardContent>
                </Card>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-0" style={{ backgroundColor: cardBg }}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">DA Bid and Offer Quantities</h3>
                    <DABidsOffersChart />
                  </CardContent>
                </Card>
                <Card className="border-0" style={{ backgroundColor: cardBg }}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">DA SOC Projection</h3>
                    <DASoCProjectionChart />
                  </CardContent>
                </Card>
              </div>

              {/* Third Row - Time Controller */}
              <div className="w-full">
                <DAStageTimeController />
              </div>

              {/* Fourth Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-0" style={{ backgroundColor: cardBg }}>
                  <CardContent className="p-6">
                    <DAASBlocks />
                  </CardContent>
                </Card>
                <Card className="border-0" style={{ backgroundColor: cardBg }}>
                  <CardContent className="p-6">
                    <DAEconomicCurves />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="simulated-da-results">
            <div className="grid grid-cols-1 gap-4">
              <Card className="border-0" style={{ backgroundColor: cardBg }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">DA Price Actuals</h3>
                  <DAPriceActualsChart />
                </CardContent>
              </Card>
              <Card className="border-0" style={{ backgroundColor: cardBg }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">Stubbed DAM Awards</h3>
                  <StubbedDAMAwardsChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="rt-stage">
            <div className="grid grid-cols-1 gap-4">
              {/* First Row - Time Controls */}
              <Card className="border-0" style={{ backgroundColor: cardBg }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">5-Minute Interval Time Controls</h3>
                  <TimeController interval="5min" />
                </CardContent>
              </Card>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-0" style={{ backgroundColor: cardBg }}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">DAM Awards</h3>
                    <StubbedDAMAwardsChart />
                  </CardContent>
                </Card>
                <Card className="border-0" style={{ backgroundColor: cardBg }}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">RT Price Forecasts</h3>
                    <FiveMinPriceActualsChart />
                  </CardContent>
                </Card>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-0" style={{ backgroundColor: cardBg }}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">RT Limits</h3>
                    <DALimitsChart />
                  </CardContent>
                </Card>
                <Card className="border-0" style={{ backgroundColor: cardBg }}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">RT Bid and Offer Quantities</h3>
                    <DABidsOffersChart />
                  </CardContent>
                </Card>
              </div>

              {/* Fourth Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-0" style={{ backgroundColor: cardBg }}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">RT SOC Projection</h3>
                    <DASoCProjectionChart />
                  </CardContent>
                </Card>
                <Card className="border-0" style={{ backgroundColor: cardBg }}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">RT Economic Curves</h3>
                    <DAEconomicCurves />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="simulated-rt-results">
            <div className="grid grid-cols-1 gap-4">
              <Card className="border-0" style={{ backgroundColor: cardBg }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">5 Minute Price Actuals</h3>
                  <FiveMinPriceActualsChart />
                </CardContent>
              </Card>
              <Card className="border-0" style={{ backgroundColor: cardBg }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">A/S Deployments</h3>
                  <ASDeploymentsChart />
                </CardContent>
              </Card>
              <Card className="border-0" style={{ backgroundColor: cardBg }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">Simulated SOC</h3>
                  <SimulatedSocChart />
                </CardContent>
              </Card>
              <Card className="border-0" style={{ backgroundColor: cardBg }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">Basepoints</h3>
                  <BasepointsChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="simulated-settlements">
            <div className="grid grid-cols-1 gap-4">
              <Card className="border-0" style={{ backgroundColor: cardBg }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">PnL</h3>
                  <PnlFifteenMinuteChart />
                </CardContent>
              </Card>
              <Card className="border-0" style={{ backgroundColor: cardBg }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-[#fcfcfc]">Cumulative PnL</h3>
                  <CumulativePnlFifteenMinChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TimeIntervalProvider>
  )
}

export default DetailsSection