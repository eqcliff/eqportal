import React from 'react'
import AppLayout from '../../../../components/layout/AppLayout'
import { vppaMgmtMenuConfig } from '../../../../config/menuConfig'

export default function VppaMgmtLiveOpsTelemetryPage() {
  return (
    <AppLayout title="VPPA Mgmt Cockpit" menuConfig={vppaMgmtMenuConfig}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#fcfcfc] mb-6">Live Operations Telemetry</h1>
        <div className="bg-[#21212a] rounded-xl p-6">
          <p className="text-[#fcfcfc]">Live Operations Telemetry content coming soon...</p>
        </div>
      </div>
    </AppLayout>
  )
}