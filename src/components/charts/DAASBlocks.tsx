import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { daAsBlockData } from "../../data/DAASBlockData"
import { useTimeInterval } from "../../context/TimeIntervalContext"

interface ASBlock {
  resource: string
  direction: string
  blockPower: string
  product: string
  offerPrice: string
}

const formatInterval = (interval: number): string => {
  if (isNaN(interval)) {
    console.error("Invalid interval:", interval)
    return "Invalid interval"
  }
  const start = `${(interval - 1).toString().padStart(2, "0")}:00`
  const end = interval === 24 ? "24:00" : `${(interval % 24).toString().padStart(2, "0")}:00`
  return `HE${interval.toString().padStart(2, "0")} [${start} - ${end}]`
}

export default function DAASBlocks() {
  const { currentInterval } = useTimeInterval()

  const asBlocks = daAsBlockData
    .filter(item => item.operating_hr === currentInterval)
    .flatMap((block) => {
      if (!block || !block.order_block) {
        console.warn(`Data issue detected for interval ${currentInterval}. Skipping this interval.`)
        return []
      }
      return block.order_block.flatMap(([power, products]) => {
        return products.map(([price, product]) => ({
          resource: block.resource,
          direction: block.direction,
          blockPower: `${power / 1000000} MW`,
          product,
          offerPrice: `$${price.toFixed(2)}/MW`,
        }))
      })
    }).sort((a, b) => {
      if (a.resource < b.resource) return -1
      if (a.resource > b.resource) return 1
      const aBlockPower = parseFloat(a.blockPower)
      const bBlockPower = parseFloat(b.blockPower)
      if (aBlockPower < bBlockPower) return -1
      if (aBlockPower > bBlockPower) return 1
      if (a.offerPrice < b.offerPrice) return -1
      if (a.offerPrice > b.offerPrice) return 1
      return 0
    })

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-[#fcfcfc]">DA AS Blocks</h3>
        <p className="text-sm text-[#fcfcfc]">AS Blocks for: {formatInterval(currentInterval)}</p>
      </div>
      {asBlocks.length > 0 ? (
        <div className="border rounded-lg border-none overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-800/50">
                <TableHead className="text-[#fcfcfc] whitespace-nowrap text-xs p-2">Resource</TableHead>
                <TableHead className="text-[#fcfcfc] whitespace-nowrap text-xs p-2">Direction</TableHead>
                <TableHead className="text-[#fcfcfc] whitespace-nowrap text-xs p-2">Block/Power</TableHead>
                <TableHead className="text-[#fcfcfc] whitespace-nowrap text-xs p-2">Product</TableHead>
                <TableHead className="text-[#fcfcfc] whitespace-nowrap text-xs p-2">Offer Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {asBlocks.map((block, index) => (
                <TableRow key={index} className="hover:bg-gray-800/50 even:bg-gray-800/20 border-none">
                  <TableCell className="text-[#fcfcfc] whitespace-nowrap text-xs p-2">{block.resource}</TableCell>
                  <TableCell className="text-[#fcfcfc] whitespace-nowrap text-xs p-2">{block.direction}</TableCell>
                  <TableCell className="text-[#fcfcfc] whitespace-nowrap text-xs p-2">{block.blockPower}</TableCell>
                  <TableCell className="text-[#fcfcfc] whitespace-nowrap text-xs p-2">{block.product}</TableCell>
                  <TableCell className="text-[#fcfcfc] whitespace-nowrap text-xs p-2">{block.offerPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-sm text-[#fcfcfc]">No AS blocks found for this interval.</p>
      )}
    </div>
  )
}