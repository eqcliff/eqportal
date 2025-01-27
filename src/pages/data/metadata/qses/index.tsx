import React from 'react'
import AppLayout from '../../../../components/layout/AppLayout'
import { dataMenuConfig } from '../../../../config/menuConfig'

export default function QSEsPage() {
  return (
    <AppLayout title="Data" menuConfig={dataMenuConfig}>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold text-[#fcfcfc]">QSEs</h1>
        <div className="bg-[#21212a] rounded-xl p-6">
          {/* QSE management content will go here */}
          <p className="text-[#fcfcfc]">QSE management interface coming soon...</p>
        </div>
      </div>
    </AppLayout>
  )
}