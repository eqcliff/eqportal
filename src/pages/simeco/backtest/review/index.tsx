import React, { useState, useCallback } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import InputsSection from "./components/InputsSection"
import ResultsSummary from "./components/ResultsSummary"
import ComparisonSection from "./components/ComparisonSection"
import DetailsSection from "./components/DetailsSection"
import { GitCompare } from "lucide-react"
import AppLayout from "../../../../components/layout/AppLayout"
import { simEcoMenuConfig } from "../../../../config/menuConfig"

export default function BacktestReview() {
  const [openAccordions, setOpenAccordions] = useState<string[]>(["select-simulation"])
  const [selectedSimulation, setSelectedSimulation] = useState<string | undefined>()

  const handleSimulationSelect = useCallback((value: string) => {
    setSelectedSimulation(value)
    setOpenAccordions(["select-simulation", "comparison", "results-summary"])
  }, [])

  return (
    <AppLayout title="Simulation Ecosystem" menuConfig={simEcoMenuConfig}>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold text-[#fcfcfc]">Backtest Simulation Review</h1>
        <Accordion
          type="multiple"
          value={openAccordions}
          onValueChange={setOpenAccordions}
          className="w-full space-y-4"
        >
          <AccordionItem
            value="select-simulation"
            className="bg-[#21212a] rounded-xl border-b-0 [&>button>svg]:text-[#fcfcfc]"
          >
            <AccordionTrigger className="px-6 text-lg hover:no-underline accordion-trigger group">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <defs>
                    <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5ee5d4" />
                      <stop offset="100%" stopColor="#f4f5ac" />
                    </linearGradient>
                  </defs>
                  <g stroke="url(#icon-gradient)">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </g>
                </svg>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-[#5ee5d4] to-[#f4f5ac] text-transparent bg-clip-text">
                  Select Simulation
                </h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4">
              <Select onValueChange={handleSimulationSelect}>
                <SelectTrigger className="w-full bg-[#2a2b36] text-[#fcfcfc] border-[#3f3f4d]">
                  <SelectValue placeholder="Select a backtest simulation run..." className="italic" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2b36] text-[#fcfcfc] border-[#3f3f4d]">
                  <SelectItem
                    value="decordova-2024-v1"
                    className="hover:bg-[#3f3f4d] hover:text-[#ecde65] hover:border-b hover:border-[#ecde65] data-[highlighted]:bg-[#3f3f4d] data-[highlighted]:text-[#ecde65]"
                  >
                    Decordova Backtest 2024 v1
                  </SelectItem>
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="inputs" className="bg-[#21212a] rounded-xl border-b-0 [&>button>svg]:text-[#fcfcfc]">
            <AccordionTrigger className="px-6 text-lg hover:no-underline accordion-trigger group">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <defs>
                    <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5ee5d4" />
                      <stop offset="100%" stopColor="#f4f5ac" />
                    </linearGradient>
                  </defs>
                  <g stroke="url(#icon-gradient)">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </g>
                </svg>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-[#5ee5d4] to-[#f4f5ac] text-transparent bg-clip-text">
                  Simulation Inputs
                </h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6">
              <InputsSection />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="comparison"
            className="bg-[#21212a] rounded-xl border-b-0 [&>button>svg]:text-[#fcfcfc]"
          >
            <AccordionTrigger className="px-6 text-lg hover:no-underline accordion-trigger group">
              <div className="flex items-center">
                <GitCompare className="mr-2 stroke-[url(#icon-gradient)]" />
                <h2 className="text-xl font-semibold bg-gradient-to-r from-[#5ee5d4] to-[#f4f5ac] text-transparent bg-clip-text">
                  Benchmarks
                </h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6">
              <ComparisonSection cardBg="#393743" />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="results-summary"
            className="bg-[#21212a] rounded-xl border-b-0 [&>button>svg]:text-[#fcfcfc]"
          >
            <AccordionTrigger className="px-6 text-lg hover:no-underline accordion-trigger group">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <defs>
                    <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5ee5d4" />
                      <stop offset="100%" stopColor="#f4f5ac" />
                    </linearGradient>
                  </defs>
                  <g stroke="url(#icon-gradient)">
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </g>
                </svg>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-[#5ee5d4] to-[#f4f5ac] text-transparent bg-clip-text">
                  Summary
                </h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6">
              <ResultsSummary className="grid grid-cols-1 gap-4" cardBg="#393743" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="details" className="bg-[#21212a] rounded-xl border-b-0 [&>button>svg]:text-[#fcfcfc]">
            <AccordionTrigger className="px-6 text-lg hover:no-underline accordion-trigger group">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <defs>
                    <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5ee5d4" />
                      <stop offset="100%" stopColor="#f4f5ac" />
                    </linearGradient>
                  </defs>
                  <g stroke="url(#icon-gradient)">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </g>
                </svg>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-[#5ee5d4] to-[#f4f5ac] text-transparent bg-clip-text">
                  Details
                </h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6">
              <DetailsSection cardBg="#393743" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </AppLayout>
  )
}