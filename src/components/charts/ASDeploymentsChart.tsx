import React from "react"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { hourlyAsDeploymentsData } from "../../data/asDeploymentsData"
import { SettlementCodeColorMap } from "../../utils/SettlementCodeColorMap"

const deploymentData = hourlyAsDeploymentsData

interface ASDeploymentsChartProps {
  className?: string
}

export default function ASDeploymentsChart({ className }: ASDeploymentsChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={deploymentData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0/10" vertical={false} />
          <XAxis
            dataKey="operating_dt"
            stroke="#ffffff"
            tick={{ fill: "#fcfcfc", fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value)
              return `${date.getHours().toString().padStart(2, "0")}:00`
            }}
            ticks={deploymentData
              .filter((_, index) => index % (12 * 3) === 0)
              .map((item) => item.operating_dt)}
            interval={0}
            tickSize={8}
            tickMargin={8}
            axisLine={{ stroke: "#fcfcfc", strokeOpacity: 0.2 }}
            domain={["auto", "auto"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1c1e24",
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
            labelStyle={{ color: "#fcfcfc" }}
            formatter={(value: number, name: string, props: any) => [
              <span style={{ color: props.color }}>{`${name}: ${value.toFixed(2)} MW`}</span>,
              null,
            ]}
            labelFormatter={(label: string) => {
              const date = new Date(label)
              return `Interval-Ending: ${date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`
            }}
          />
          <Line
            type="stepAfter"
            dataKey="da_regup_deployed_gen"
            name="Reg Up Deployed Gen"
            stroke={SettlementCodeColorMap["Reg Up"]}
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_regup_deployed_load"
            name="Reg Up Deployed Load"
            stroke={SettlementCodeColorMap["Reg Up"]}
            strokeDasharray="5 5"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_regdown_deployed_gen"
            name="Reg Down Deployed Gen"
            stroke={SettlementCodeColorMap["Reg Down"]}
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_regdown_deployed_load"
            name="Reg Down Deployed Load"
            stroke={SettlementCodeColorMap["Reg Down"]}
            strokeDasharray="5 5"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_rrs_deployed_gen"
            name="RRS Deployed Gen"
            stroke={SettlementCodeColorMap["RRS"]}
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_rrs_deployed_load"
            name="RRS Deployed Load"
            stroke={SettlementCodeColorMap["RRS"]}
            strokeDasharray="5 5"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_nonspin_deployed_gen"
            name="Non-Spin Deployed Gen"
            stroke={SettlementCodeColorMap["Non Spin"]}
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_nonspin_deployed_load"
            name="Non-Spin Deployed Load"
            stroke={SettlementCodeColorMap["Non Spin"]}
            strokeDasharray="5 5"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_ecrs_deployed_gen"
            name="ECRS Deployed Gen"
            stroke={SettlementCodeColorMap["ECRS"]}
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="da_ecrs_deployed_load"
            name="ECRS Deployed Load"
            stroke={SettlementCodeColorMap["ECRS"]}
            strokeDasharray="5 5"
            dot={false}
            strokeWidth={1.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}