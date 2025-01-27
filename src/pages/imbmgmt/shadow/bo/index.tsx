import React from 'react'
import AppLayout from '../../../../components/layout/AppLayout'
import { imbMgmtMenuConfig } from '../../../../config/menuConfig'

export default function ImbMgmtShadowModeBOPage() {
  return (
    <AppLayout title="Imbalance Mgmt Cockpit" menuConfig={imbMgmtMenuConfig}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#fcfcfc] mb-6">Shadow Mode Bid/Offer Review</h1>
        <div className="bg-[#21212a] rounded-xl p-6">
          <p className="text-[#fcfcfc]">Shadow Mode Bid/Offer Review content coming soon...</p>
        </div>
      </div>
    </AppLayout>
  )
}