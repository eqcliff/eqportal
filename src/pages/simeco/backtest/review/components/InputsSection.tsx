{/* Copy contents of src/components/sections/InputsSection.tsx */}
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs"
import { Card, CardContent } from "../../../../../components/ui/card"

export default function InputsSection() {
  return (
    <Tabs defaultValue="timeframe" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-[#1c1e24]">
        <TabsTrigger
          value="timeframe"
          className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
        >
          Timeframe
        </TabsTrigger>
        <TabsTrigger
          value="run-parameters"
          className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
        >
          Run Configuration
        </TabsTrigger>
        <TabsTrigger
          value="policy"
          className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
        >
          Policy Configuration
        </TabsTrigger>
        <TabsTrigger
          value="battery-config"
          className="text-[#fcfcfc] hover:text-[#ecd365] hover:border-b-2 hover:border-[#ecd365] transition-all duration-300 data-[state=active]:border-b-2 data-[state=active]:border-[#14c8b1] data-[state=active]:bg-[#14c8b1]/20 data-[state=active]:text-[#14c8b1]"
        >
          Battery Configuration
        </TabsTrigger>
      </TabsList>

      <TabsContent value="timeframe">
        <Card className="bg-[#393743] border-0">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <p className="text-sm text-[#fcfcfc]">
                <span className="font-medium">Start Date:</span> 2024-01-02 00:00:00
              </p>
              <p className="text-sm text-[#fcfcfc]">
                <span className="font-medium">End Date:</span> 2024-12-29 23:59:59
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="run-parameters">
        <Card className="bg-[#393743] border-0">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">Run Name:</span> Decordova_2024_Backtest_EQ_Frecast
              </p>
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">Log Level:</span> INFO
              </p>
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">Price Node:</span> DC2SES_ALL
              </p>
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">Real-time Trade Interval:</span> 5 minutes
              </p>
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">Real-time Problem Lead Time:</span> 300 seconds
              </p>
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">Initial SOC:</span> 50.0 MWh
              </p>
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">Forecast Source:</span> EQ
              </p>
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">Served Fraction Source:</span> HARD_CODED
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="policy">
        <Card className="bg-[#393743] border-0">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">Policy Type:</span> SelfScheduleSoCEnvelope
              </p>
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">Operating Days Per Partition:</span> 4
              </p>
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">Price Actuals Source:</span> YE_LEGACY
              </p>
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">Include Energy Provision for SOC Envelope:</span> false
              </p>
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">NPTAO Asset Ramp Duration:</span> 300 seconds
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-[#fcfcfc] mb-2">Optimization Policy Config</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">Charge Efficiency Bias:</span> 1.0
                </p>
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">Discharge Efficiency Bias:</span> 1.0
                </p>
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">Charge Idle Window Hours:</span> 1
                </p>
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">Cycle Budget Hard Limit:</span> 893 MWh
                </p>
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">Cycling Cost per MWh:</span> $30.0
                </p>
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">Daily Discount Rate:</span> 0.8
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-[#fcfcfc] mb-2">Participation Fractions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">DA Energy Gen:</span> 1.0
                </p>
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">DA Energy Load:</span> 0.0
                </p>
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">RT Energy Gen:</span> 0.85
                </p>
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">RT Energy Load:</span> 0.75
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-[#fcfcfc] mb-2">Envelope Served Fractions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">ECRS DA:</span> 0.1
                </p>
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">ECRS RT:</span> 0.1
                </p>
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">RegUp DA:</span> 0.36
                </p>
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">RegUp RT:</span> 0.68
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-[#fcfcfc] mb-2">Other Settings</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">Multi-product Block Heuristic:</span> Espresso
                </p>
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">RT Energy Economic Curves:</span> true
                </p>
                <p className="text-xs text-[#fcfcfc]">
                  <span className="font-medium">Python Day Ahead Decision Engine:</span> false
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">SOC Envelope DA Lookahead:</span> 1 trade interval
              </p>
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">SOC Envelope HA Lookahead:</span> 1 trade interval
              </p>
              <p className="text-xs text-[#fcfcfc]">
                <span className="font-medium">SOC Envelope RT Lookahead:</span> 3 trade intervals
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="battery-config">
        <Card className="bg-[#393743] border-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2 text-[#fcfcfc]">Basic Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Name:</span> decordova_I_esr
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 text-[#fcfcfc]">Operational Spec</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Charge Efficiency:</span> 95%
                  </p>
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Discharge Efficiency:</span> 90%
                  </p>
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Leakage per Hour:</span> 0.1%
                  </p>
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Max Discharge:</span> 260 MW
                  </p>
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Max Charge:</span> 260 MW
                  </p>
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Max Storage Level:</span> 266.953 MWh
                  </p>
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">HSL Derate Range:</span> 4 MW - 264.5 MW
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 text-[#fcfcfc]">SOC Discharge Efficiency Curve</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    { start: 0, efficiency: 46 },
                    { start: 10, efficiency: 25 },
                    { start: 15, efficiency: 39 },
                    { start: 20, efficiency: 58 },
                    { start: 25, efficiency: 75 },
                    { start: 30, efficiency: 90 },
                  ].map((point, index) => (
                    <p key={index} className="text-xs text-[#fcfcfc]">
                      <span className="font-medium">{point.start}% SOC:</span> {point.efficiency}% Efficiency
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 text-[#fcfcfc]">Ancillary Service Qualifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Reg Up Limit:</span> 260 MW
                  </p>
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Reg Down Limit:</span> 260 MW
                  </p>
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">RRS Limit:</span> 260 MW
                  </p>
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Non-Spin Gen Limit:</span> 65 MW
                  </p>
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">ECRS Load Limit:</span> 130 MW
                  </p>
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">ECRS Gen Limit:</span> 130 MW
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 text-[#fcfcfc]">Registration Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Price Node:</span> DC2SES_ALL
                  </p>
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Gen Resource Name:</span> DECORDOVA_BES1
                  </p>
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Load Resource Name:</span> DECORDOVA_LD1
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 text-[#fcfcfc]">Contractual Spec</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <p className="text-xs text-[#fcfcfc]">
                    <span className="font-medium">Max Cycles per Year:</span> 365
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}